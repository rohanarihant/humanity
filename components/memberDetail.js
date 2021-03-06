import React, {useState, useEffect, useContext} from 'react';
import NavBarBack from './NavBarBack';
import { searchUsers, accountApproval } from '../utils/apis'; 
import AccountContext from '../contexts/accountContext';
import { toast } from 'react-toastify';

function MemberDetails(){
    const {account: { memberid, setRoute }} = useContext(AccountContext);
    const [myrole, setMyrole] = useState([]);
    const [userDetail, setUserDetail] = useState([]);
    const [rejectAccount, toggleRejectAccount] = useState(false);
    const [role, setRole] = useState('Select IT Wing Role');
    const [reason, setReason] = useState('');

    useEffect(() => {
        async function getUserRoles(){
        const res = await searchUsers.getUserRoles();
        setMyrole(res.myrole);
        }
        async function fetchUserDetails(){
        const userid = localStorage.getItem('userId')
        const authpassword = localStorage.getItem('authpassword')
        const res = await accountApproval.fetchUserDetail(userid, authpassword, memberid);
        res.success && setUserDetail(res.MemberDetaildet);
        }
        getUserRoles();
        fetchUserDetails(memberid);
    },[]);
    const approveAccount = async() => {
        const userid = localStorage.getItem('userId')
        const authpassword = localStorage.getItem('authpassword')
        const power = localStorage.getItem('power')
        const res = await accountApproval.approveAccount(userid, authpassword, power, memberid, userDetail[0].usrpriemail, userDetail[0].usrname, '', '', '', role, '', userDetail[0].enroll_id);
        res.success && toast.success('Account Approved');
        setRoute('approveAccounts');
    }
    const rejectUserAccount = async() => {
        const userid = localStorage.getItem('userId')
        const authpassword = localStorage.getItem('authpassword')
        const power = localStorage.getItem('power')
        const res = await accountApproval.rejectAccount(userid, authpassword, power, userDetail[0].usrcouid, reason, memberid);
        res.success && toast.error('Account got rejected');
        setRoute('approveAccounts');
    }
    return(
        <div>
            <NavBarBack />
            {userDetail && userDetail.map(user => (<div className="member-detail-container">
                <div className="member-details">
                    <p>{user.usrname}</p>
                    <p>{user.usrpriemail}</p>
                    <div>
                        <strong>Gender</strong>
                        <p>{user.usrgen}</p>
                    </div>
                    <div>
                        <strong>Insan no</strong>
                        <p>{user.usrinsnum}</p>
                    </div>
                </div>
                <div className="user-section">
                    <div className="user-detail-section">
                        <strong>Phone</strong>
                        <span>{user.usrinsnum}</span>
                    </div>
                    <div className="user-detail-section">
                        <strong>Telegram</strong>
                        <span>{user.usrinsnum}</span>
                    </div>
                    <div className="user-detail-section">
                        <strong>Father Name</strong>
                        <span>{user.usrinsnum}</span>
                    </div>
                    <div className="user-detail-section">
                        <strong>Date of Birth</strong>
                        <span>{new Date(user.usrdob).toLocaleDateString()}</span>
                    </div>
                </div>
                <div className="user-section">
                    <div className="user-detail-section">
                        <strong>Country</strong>
                        <span>{user.countryname}</span>
                    </div>
                    <div className="user-detail-section">
                        <strong>State</strong>
                        <span>{user.statename}</span>
                    </div>
                    <div className="user-detail-section">
                        <strong>District</strong>
                        <span>{user.districtname}</span>
                    </div>
                    <div className="user-detail-section">
                        <strong>Block</strong>
                        <span>{user.blockname}</span>
                    </div>
                    <div className="user-detail-section">
                        <strong>Address</strong>
                        <span>{user.usradd}</span>
                    </div>
                </div>
                <div className="user-section">
                    <div className="user-detail-section">
                        <strong>Prashad Taken</strong>
                        <span>{user.parshadtaken === "0" ? "NO" : "YES"}</span>
                    </div>
                    <div className="user-detail-section">
                        <strong>Education</strong>
                        <span>{user.qualificationname}</span>
                    </div>
                    <div className="user-detail-section">
                        <strong>Blood Group</strong>
                        <span>{user.bloodgrp}</span>
                    </div>
                    <div className="user-detail-section">
                        <strong>Device use</strong>
                        <span>{user.usrown}</span>
                    </div>
                    <div className="user-detail-section">
                        <strong>Other Email</strong>
                        <span>{user.usremailother}</span>
                    </div>
                    <div className="user-detail-section">
                        <strong>Twitter</strong>
                        <span>{user.twhandle}</span>
                    </div>
                    <div className="user-detail-section">
                        <strong>Profession</strong>
                        <span>{user.usrprofessionid}</span>
                    </div>
                    <div className="user-detail-section">
                        <strong>Skill</strong>
                        <span>{user.usrskillid}</span>
                    </div>
                </div>
            </div>))}
            <div style={{padding: 20}}>
                <div className="form-group">
                    <select className="form-control" placeholder="Select IT Wing Role" value={role} name="itWingPrashad" onChange={(e) => setRole(e.target.value)}>
                        <option>Select IT Wing Role</option>
                        {myrole.map(rol => (<option value={rol.categoryid}>{rol.categoryname}</option>))}
                    </select>
                </div>
                {role !== "Select IT Wing Role" && <p className="iconSwitch" onClick={() => approveAccount()}>Approve</p>}
                {role !== "Select IT Wing Role" && <p className="iconSwitch" onClick={() => toggleRejectAccount(!rejectAccount)}>Reject</p>}
                {rejectAccount && <div>
                    <textarea className="reject-reason" placeholder="write reason" value={reason} onChange={(e) => setReason(e.target.value)}></textarea>
                    <p className="iconSwitch" onClick={() => rejectUserAccount()}>Reject User</p>
                </div>}
            </div>

        <style jsx>
            {`
            .member-detail-container{
                background-color: #fff;
                color: #3D8EE1;
            }
            .member-details{
                margin-top: 80px;
                text-align: center;
                font-size: 20px;
            }
            .user-section{
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                padding: 10px;
            }
            .user-detail-section{
                display: flex;
                justify-content: space-between;
            }
            .iconSwitch {
                text-align: center;
                font-size: 20px;
                margin-top: 5px;
                border: 1px solid rgba(0, 0, 0, 0.87);
                border-radius: 8px;
                background-color: #f5f3f3;
                color: #fff;
              }
            .reject-reason{
                width: 100%;
            }
            `}
        </style>
        </div>
    );
}
export default MemberDetails;