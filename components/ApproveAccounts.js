import React, {useContext, useEffect, useState} from 'react';
import NavBarBack from './NavBarBack';
import AccountContext from '../contexts/accountContext';
import { accountApproval } from '../utils/apis';

const ApproveAccounts = () => {
    
    const {account: { setRoute, updateMemberid }} = useContext(AccountContext);
    const [pendingAccounts, setPendingAccounts] = useState([]);
    const openMemberDetail = (usrId) => {
        updateMemberid(usrId);
        setRoute('memberDetail');
    }
    useEffect(() => {
        async function getAllAccounts(){
        const userid = localStorage.getItem('userId')
        const authpassword = localStorage.getItem('authpassword')
        const power = localStorage.getItem('power')
        const MemberDetaildet = JSON.parse(localStorage.getItem('MemberDetaildet'));
        const countryid = MemberDetaildet && MemberDetaildet[0].usrcouid;
        const stateid = MemberDetaildet && MemberDetaildet[0].usrstaid;
        const gender = MemberDetaildet && MemberDetaildet[0].usrgen;
        const res = await accountApproval.fetchPendingAccounts(userid, authpassword, power, countryid, stateid, gender);
        setPendingAccounts(res.pendingaccounts);
        }
        getAllAccounts();
    },[]);
    
    return(
        <div style={{marginTop: 70}}>
            <NavBarBack />
            <div>
                {pendingAccounts.map((acc) => (
                <div className="user-account" key={acc.enroll_id} onClick={() => openMemberDetail(acc.usrid)}>
                    <img src="./static/img/head.png" style={{width: 80}} />
                    <div className="user-detail">
                        <p>{acc.usrname}</p>
                        <p>{acc.usrcrtdat}</p>
                    </div>
                </div>))}
            </div>
        </div>
    )
};
export default ApproveAccounts;