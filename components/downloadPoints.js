import React, { useEffect, useContext, useState } from 'react';
import NavBarBack from './NavBarBack';
import AccountContext from '../contexts/accountContext';
import { commonMethods, download } from '../utils/apis';
import DownloadPointReportsExcel from './DownloadPointReportsExcel';

export default function DownloadPoints() {
    const { account: { toggleShowLoader } } = useContext(AccountContext);
    const [allStates, updateAllStates] = useState([]);
    const [selectedState, updateSelectedState] = useState('');
    const [selectedStateData, updateSelectedStateData] = useState([]);
    const [errorMsg, updateError] = useState('');
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
            res.success && updateSelectedState(res.state[0].stateid);
        }
        getALLStates();
    },[]);
    function parseDownloadPoints(stateRecord){
        stateRecord && stateRecord.map((rec) => {
            let totalPoints = 0;
            rec.point && rec.point.map(points => {
                if(points.sewacategory_platform){
                    rec[points.sewacategory_platform && points.sewacategory_platform.split(" ").join("")] = points.totpoint || 0;
                    totalPoints += points.totpoint && Number(points.totpoint);
                }
            });
            rec.totalPoints = totalPoints;
        })
        return stateRecord;
    }
    async function exportMember(){
        toggleShowLoader(true);
        const userid = localStorage.getItem('userId')
        const authpassword = localStorage.getItem('authpassword')
        const MemberDetaildet = JSON.parse(localStorage.getItem('MemberDetaildet'));
        const gender = MemberDetaildet && MemberDetaildet[0].usrgen;
        const stateRecord = await download.downloadMembersPoints(userid, authpassword, selectedState, gender);
        stateRecord.length > 0 && parseDownloadPoints(stateRecord);
        stateRecord.length > 0 && await updateSelectedStateData(parseDownloadPoints(stateRecord));
        stateRecord.length === 0 && updateError('No Record Found');
        toggleShowLoader(false);
    }
    const selectState = (value) => {
        updateSelectedState(value);
        updateError('');
        updateSelectedStateData([]);
    }
    return (
        <div style={{ marginTop: 20, padding: 20 }}>
            <NavBarBack />
            <div style={{ marginTop: 80 }}>
                <div class="form-group">
                    <label for="email">Select State</label>
                    <select class="form-control" value={selectedState} name="itWingPrashad" onChange={(e) => selectState(e.target.value)}>
                        {allStates && allStates.map(state => (<option value={state.stateid}>{state.statename}</option>))}
                    </select>
                    <p class="iconSwitch" onClick={() => exportMember()}>Export Members</p>
                </div>
            {selectedStateData.length > 0 && <DownloadPointReportsExcel selectedStateData={selectedStateData} />}
            {errorMsg && <p className="error">{errorMsg}</p>}
            </div>
        </div>
    );
}