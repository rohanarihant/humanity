import React from 'react';
import NavBar from './NavBarBack';

const IssueDetail = () => {
    return(
        <div>
            <NavBar />
            <div className="issue-detail-container">
                <p className="create-by">Created By:- Gurdeep Sigh</p>
                <p>Haryana</p>
                <p>9988776655</p>
                <p>To Management Member</p>
            </div>
            <style jsx>
            {`
            .issue-detail-container{
                margin-top: 70px;
            }
            .create-by{
                color: #673ab7;
                font-size: 18px;
                text-align: center;
            }
            `}
            </style>
        </div>
    )
}

export default IssueDetail;