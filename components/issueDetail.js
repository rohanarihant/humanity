import React, { useState, useContext } from 'react';
import NavBar from './NavBarBack';
import { issues } from '../utils/apis';
import { toast } from 'react-toastify';
import AccountContext from '../contexts/accountContext';

const IssueDetail = () => {
    const [comment, setComment] = useState('');
    const { account: { selectedIssue, setRoute } } = useContext(AccountContext);
    const userid = localStorage.getItem('userId');

    const closeIssue = async (issueid) => {
        const userid = localStorage.getItem('userId');
        const authpassword = localStorage.getItem('authpassword');
        const power = JSON.parse(localStorage.getItem('power'));
        const res = await issues.closeIssue(userid, authpassword, power, issueid, 'yes');
        res.success && toast.success('Issue closed successfully');
        res.success && setRoute('issues');
    }
    const sendComment = async (issueto, issueid, issueby, issuetype) => {
        const userid = localStorage.getItem('userId');
        const authpassword = localStorage.getItem('authpassword');
        const power = JSON.parse(localStorage.getItem('power'));
        const res = await issues.addCommentIssue(userid, authpassword, power, "comment", issueto, issueby, issuetype, issueid, new Date().toLocaleDateString());
    }
    let mainIssue = '';
    return (
        <div>
            <NavBar prevRoute="issues" />
            {selectedIssue && selectedIssue.map((issue, index) => {
                if (issue.issuetype === "issue") {
                    mainIssue = issue;
                    return (
                        <div className="issue-detail-container">
                            <p className="create-by">Created By:- {issue.usrname}</p>
                            <p className="create-by-state">{issue.statename}</p>
                            <div className="create-by-contact">
                                <span>To {issue.categoryname}</span>
                                <span>{issue.usrmob}</span>
                            </div>
                            <div className="issue-detail">
                                <p>{issue.issuedes}</p>
                            </div>
                            <div className="issue-close">
                                <p>{issue.issuedate}</p>
                                {issue.issueby === userid && <a onClick={() => closeIssue(issue.issueid)}>Close</a>}
                            </div>
                            {/* <div className="issue-footer">
                            <input type="text" className="comment-text" value={comment} onChange={(e) => setComment(e.target.value)} />
                            <img src="/static/img/send_message.png" onClick={() => sendComment(issue.replyissueid, issue.issueid, issue.issueby, issue.issuetype)} className="send-comment" />
                        </div> */}
    
                        </div>)
                } else {
                    return (
                        <div className="issue-comment" style={{ marginTop: index === 1 ? 70 : 10 }}>
                            <p>{issue.usrname}</p>
                            <p>{issue.issuedes}</p>
                            <p>{issue.issuedate}</p>
                        </div>
                    )
                }
            })}
            <div className="msger-inputarea issue-footer">
                <input type="text" className="msger-input" placeholder="Enter your comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                <button className="msger-send-btn" onClick={() => sendComment(mainIssue.replyissueid, mainIssue.issueid, mainIssue.issueby, mainIssue.issuetype)}>Send</button>
            </div>
            <style jsx>
                {`
            .issue-detail-container{
                margin-top: 70px;
                font-size: 15px;
            }
            .create-by{
                color: #3D8EE1;
                font-size: 18px;
                text-align: center;
            }
            .create-by-state { 
                text-align: center;
                margin-bottom: 0px;
            }
            .create-by-contact{
                display: flex;
                justify-content: space-around;
            }
            .issue-detail{
                font-size: 15px;
                margin-top: 20px;
                padding: 5px;
            }
            .issue-close{
                float: right;
                margin-right: 10px;
                font-size: 15px;
            }
            .issue-footer{
                position: sticky;
                bottom: 0px;
                width: 100%;
                display: flex;
                padding: 10px;
                border-top: 2px solid #ddd;;
                background: #eee;
            }
            .comment-text{
                font-size: 15px;
                width: 80vw;
                margin: 5px;
                padding: 10px;
            }
            .send-comment{
                width: 15vw;
            }
            }
            .issue-comment {
                max-width: 450px;
                padding: 15px;
                border-radius: 15px;
                background: #ececec;
                border-bottom-left-radius: 0;
                margin: 10px 10px 0px;
                font-size: 14px;
                height: auto;
            }
            .msger-inputarea {

              }
              .msger-inputarea * {
                padding: 10px;
                border: none;
                border-radius: 3px;
                font-size: 1em;
              }
              .msger-input {
                flex: 1;
                background: #ddd;
              }
              .msger-send-btn {
                margin-left: 10px;
                background: rgb(0, 196, 65);
                color: #fff;
                font-weight: bold;
                cursor: pointer;
                transition: background 0.23s;
              }
              .msger-send-btn:hover {
                background: rgb(0, 180, 50);
              }
            `}
            </style>
        </div>
    )
}

export default IssueDetail;