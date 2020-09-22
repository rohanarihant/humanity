import React, { useState, useContext } from 'react';
import NavBar from './NavBarBack';
import { issues } from '../utils/apis';
import { toast } from 'react-toastify';
import AccountContext from '../contexts/accountContext';

const IssueDetail = () => {
    const [comment, setComment] = useState('');
    const {account: { selectedIssue, setRoute }} = useContext(AccountContext);


    const closeIssue = async(issueid) => {
        const userid = localStorage.getItem('userId');
        const authpassword = localStorage.getItem('authpassword');
        const power = JSON.parse(localStorage.getItem('power'));
        const res = await issues.closeIssue(userid, authpassword, power, issueid, 'yes');
        res.success && toast.success('Issue closed successfully');
        res.success && setRoute('issues');
    }
    const sendComment = async(issueto, issueid, issueby, issuetype) => {
        const userid = localStorage.getItem('userId');
        const authpassword = localStorage.getItem('authpassword');
        const power = JSON.parse(localStorage.getItem('power'));
        const res = await issues.addCommentIssue(userid, authpassword, power, comment, issueto, issueby, issuetype, issueid, new Date().toLocaleDateString());
    }
    return(
        <div>
            <NavBar />
            {selectedIssue && selectedIssue.map((issue) => (<div className="issue-detail-container">
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
                    <a onClick={() => closeIssue(issue.issueid)}>Close</a>
                </div>
                <div className="issue-footer">
                    <input type="text" className="comment-text" value={comment} onChange={(e) => setComment(e.target.value)} />
                    <img src="/static/img/send_message.png" onClick={() => sendComment(issue.replyissueid, issue.issueid, issue.issueby, issue.issuetype)} className="send-comment" />
                </div>
            </div>))}
            <style jsx>
            {`
            .issue-detail-container{
                margin-top: 70px;
                font-size: 15px;
            }
            .create-by{
                color: #673ab7;
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
                position: absolute;
                bottom: 0px;
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
            `}
            </style>
        </div>
    )
}

export default IssueDetail;