import React, { useEffect, useContext, useState } from 'react';
import NavBarBack from './NavBarBack';
import AccountContext from '../contexts/accountContext';
import { commonMethods, download } from '../utils/apis';
// import DownloadReportsExcel from './DownloadReportsExcel';

export default function Download() {
    const { account: { getProfileDetails } } = useContext(AccountContext);
    const [allStates, updateAllStates] = useState([]);
    const [selectedState, updateSelectedState] = useState('');
    useEffect(() => {
        async function getALLStates(){
            const userid = localStorage.getItem('userId')
            const authpassword = localStorage.getItem('authpassword')
            const power = localStorage.getItem('power');
            const MemberDetaildet = JSON.parse(localStorage.getItem('MemberDetaildet'));
            const stateid = MemberDetaildet && MemberDetaildet[0].usrstaid;
            const countryid = MemberDetaildet && MemberDetaildet[0].usrcouid;
            const res = await commonMethods.getAllStates(userid, authpassword, power, countryid, stateid);
            res.success && updateAllStates(res.state);
        }
        getALLStates();
    },[]);
    async function exportMember(){
        const userid = localStorage.getItem('userId')
        const authpassword = localStorage.getItem('authpassword')
        const MemberDetaildet = JSON.parse(localStorage.getItem('MemberDetaildet'));
        const countryid = MemberDetaildet && MemberDetaildet[0].usrcouid;
        const gender = MemberDetaildet && MemberDetaildet[0].usrgen;

        await download.downloadMembers(userid, authpassword, countryid, gender);
    }
    return (
        <div style={{ marginTop: 20, padding: 20 }}>
            <NavBarBack />
            <div style={{ marginTop: 80 }}>
            {/* <DownloadReportsExcel /> */}
                {/* <div class="form-group">
                    <label for="email">Select State</label>
                    <select class="form-control" value={selectedState} name="itWingPrashad" onChange={(e) => updateSelectedState(e.target.value)}>
                        {allStates && allStates.map(state => (<option>{state.statename}</option>))}
                    </select>
                    <p class="iconSwitch" onClick={() => exportMember()}>Export Members</p>
                </div> */}
            </div>
        </div>
    );
}