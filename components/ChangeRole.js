import React, {useEffect, useContext, useState} from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import NavBar from './NavBarBack';
import AccountContext from '../contexts/accountContext';
import { searchUsers } from '../utils/apis';
import { toast } from 'react-toastify';
const roleList = ['National Member', 'State Member', 'District Member', 'Team Member', 'Block Member', 'Legal Member'];
const Profile = () => {
    const {account: { changeRoleUser, setRoute, screen, title, toggleShowLoader, selectedUser}} = useContext(AccountContext);
    const [role, setRole] = useState('');
    const [myrole, setMyrole] = useState([]);
    const [approveMember, updateApproveMember] = useState(false);
    const [downOwnState, updateDownOwnState] = useState(false);
    const [downAllState, updateDownAllState] = useState(false);
    const [downSewaPoint, updateDownSewaPoint] = useState(false);
    const [broadcast, updateBroadcast] = useState(false);

    const updateRole = async(user) => {
        toggleShowLoader(true);
        const userid = localStorage.getItem('userId');
        const authpassword = localStorage.getItem('authpassword');
        const power = localStorage.getItem('power');
        const res = await searchUsers.updateUserRole(userid, authpassword, user.usrid, role, userid);
        res.success && toast.success('Role updated Successfully');
        toggleShowLoader(false);
        setRoute('searchMember');
    }
    const updateUserPermission = async(user) => {
        const userid = localStorage.getItem('userId');
        const authpassword = localStorage.getItem('authpassword');
        const power = localStorage.getItem('power');
        const res = await searchUsers.updateUserPermission(userid, authpassword, power, user.usrid, 0,  approveMember, downOwnState, downAllState, downSewaPoint, broadcast);
        if(res.success){
            toast.success('Permissions added successfully');
            setRoute('humanity');
        }
    }
    useEffect(() => {
        async function getUserRoles(){
        const res = await searchUsers.getUserRoles();
        setMyrole(res.myrole);
        }
        async function getPermissionDetail(){
        const userid = localStorage.getItem('userId');
        const authpassword = localStorage.getItem('authpassword');
        const memId = selectedUser && selectedUser[0].usrid;
        const power = selectedUser && selectedUser[0].categoryname;
        const ress = await searchUsers.getPermissionDetail(userid, authpassword, memId, power);
        if(ress && ress.success){
            updateApproveMember(ress.approvemem);
            updateDownOwnState(ress.singlestate);
            updateDownAllState(ress.downallstate);
            updateDownSewaPoint(ress.download_pointlist);
            updateBroadcast(ress.sendbroad);
        }
        }
        getUserRoles();
        getPermissionDetail();
    },[]);
    const addDefaultSrc = (ev) => {
        ev.target.src = './static/img/head.png';
    }
    return (
        <>
        <NavBar prevRoute="searchMember" />
        {changeRoleUser && changeRoleUser.map(user => (
        <div class="container" >
            <div class="profile-card">
                <div class="card-header">
                    <img class="profile-image" src={`http://humanity.rubrutech.com/profileimage/${user.usrid}.jpg`} onError={(e) => addDefaultSrc(e)}    alt="profile image" />
                    <div class="profile-name">{user.usrname}</div>
                    <div class="profile-role">{user.categoryname}</div>
                    <div class="profile-role">{user.usrpriemail}</div>
                </div>
                {screen === 'Change Role' ? 
                <MDBContainer style={{marginTop: 30, paddingTop: 0}}>
                    <MDBRow>
                        <MDBCol md="6">
                            <form>
                                <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
                                State
        </label>
                                <input type="email" id="defaultFormRegisterConfirmEx" value={`${user.statename} ${user.countryname}`} className="form-control" />
                                <br />
                                <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                                District
        </label>
                                <input type="text" id="defaultFormRegisterPasswordEx" value={user.districtname} className="form-control" />
                                <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                                Block
        </label>
                                <input type="text" id="defaultFormRegisterPasswordEx" value={user.blockname} className="form-control" />
                                <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                                Address
        </label>
                                <input type="text" id="defaultFormRegisterPasswordEx" value={user.usradd} className="form-control" />
                                <select style={{marginTop: 20}} class="form-control" value={role} name="role" onChange={(e) => setRole(e.target.value)}>
                                    <option>Select Role</option>
                                    {myrole.map(rol => (<option value={rol.categoryid}>{rol.categoryname}</option>))}
                                </select>
                                <p class="iconSwitch" style={{marginTop: 12}} onClick={() => updateRole(user)}>Update Role</p>
                            </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                :
                <>
                <div class="checkbox-layout" v-show="signup">
                  <input type="checkbox" id="" value="Approve Member" checked={approveMember} onChange={() => updateApproveMember(!approveMember)} />Approve Member
                </div>
                <div class="checkbox-layout" v-show="signup">
                  <input type="checkbox" id="" value="Download Own State ITSewadar" checked={downOwnState} onChange={() => updateDownOwnState(!downOwnState)} />Download Own State ITSewadar
                </div>
                <div class="checkbox-layout" v-show="signup">
                  <input type="checkbox" id="" value="Download All State ITSewadar" checked={downAllState} onChange={() => updateDownAllState(!downAllState)} />Download All State ITSewadar
                </div>
                <div class="checkbox-layout" v-show="signup">
                  <input type="checkbox" id="" value="Download Sewa Points" checked={downSewaPoint} onChange={() => updateDownSewaPoint(!downSewaPoint)}/>Download Sewa Points
                </div>
                <div class="checkbox-layout" v-show="signup">
                  <input type="checkbox" id="" value="Broadcast" checked={broadcast} onChange={() => updateBroadcast(!broadcast)}/>Broadcast
                </div>
                <p class="iconSwitch" onClick={() => updateUserPermission(user)}>Update Permissions</p>
                </>}
            </div>
        </div>))}
    </>
    )
};

export default Profile;