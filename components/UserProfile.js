import React, {useEffect, useContext, useState} from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import NavBar from '../components/NavBarBack';
import AccountContext from '../contexts/accountContext';
import { accountApproval } from '../utils/apis';
import { toast } from 'react-toastify';

const UserProfile = () => {
    const {account: { getProfileDetails, screen, toggleShowLoader, setRoute, selectedUser, educationList, professionList, setItwingRank}} = useContext(AccountContext);
    const [userProfileData, setUserProfileData] = useState([{}]);
    const selectedUserData =  selectedUser;
    const educationObj = educationList && educationList.find(edu => edu.qualificationid === userProfileData[0].usreduid);
    const educationName = educationObj && educationObj.qualificationname;
    //  || (selectedUserData && selectedUserData[0].usreduid); .qualificationname;
    const professionObj = professionList && professionList.find(pro => pro.professionid === userProfileData[0].usrprofessionid);
    const professionName = professionObj && professionObj.professionname;
    //  || (selectedUserData && selectedUserData[0].usrprofessionid);;
    useEffect(() => {
        setUserProfileData(JSON.parse(localStorage.getItem('MemberDetaildet')));
        async function getProfile() {
            toggleShowLoader(true);
            const response = await getProfileDetails();
            if (response.success) {
                setUserProfileData(response.MemberDetaildet);
                setItwingRank(response.categoryname);
                localStorage.setItem('MemberDetaildet', JSON.stringify(response.MemberDetaildet));
                localStorage.setItem('ItwingRank', JSON.stringify(response.categoryname));
                localStorage.setItem('samiti', JSON.stringify(response.samiti));
            }
            toggleShowLoader(false);
        }
        getProfile();
    }, []);

    const deleteMember = async() => {
        const userid = localStorage.getItem('userId');
        const authpassword = localStorage.getItem('authpassword');
        const power = JSON.parse(localStorage.getItem('power'));
        const countryId = selectedUserData && selectedUserData[0].usrcouid;
        const usrid = selectedUserData && selectedUserData[0].usrid;
        const res = await accountApproval.rejectAccount(userid, authpassword, power, countryId, "", usrid);
        res.success && toast.success('Member Deleted successfully!');
        res.success && setRoute('home');
    }
    return (
        <>
        <NavBar />
        {selectedUserData && selectedUserData.map(user => (
        <div class="container" >
            <div class="profile-card">
                <div class="card-header">
                    <img class="profile-image" src={`http://humanity.rubrutech.com/profileimage/${user.usrids}.jpg`} alt="profile image" />
                    <div class="profile-name">{user.usrname}<p class="dob">({user.usrdob && user.usrdob.split(' ')[0]})</p></div>
                    <div class="profile-role">Team Member ({user.usrid})</div>
                    <div class="profile-location">
                       Gender :- {user.usrgen} <span class="dob">({user.bloodgrp})</span>
                    </div>
                    <div class="profile-location">
                       Insan No :- {user.usrinsnum}
                    </div>
                    <div class="profile-location">
                       Devices :- {user.usrown}
                    </div>
                    <div class="profile-location">
                        <svg class="icon white" viewBox="0 0 20 20">
                            <path
                                d="M10,1.375c-3.17,0-5.75,2.548-5.75,5.682c0,6.685,5.259,11.276,5.483,11.469c0.152,0.132,0.382,0.132,0.534,0c0.224-0.193,5.481-4.784,5.483-11.469C15.75,3.923,13.171,1.375,10,1.375 M10,17.653c-1.064-1.024-4.929-5.127-4.929-10.596c0-2.68,2.212-4.861,4.929-4.861s4.929,2.181,4.929,4.861C14.927,12.518,11.063,16.627,10,17.653 M10,3.839c-1.815,0-3.286,1.47-3.286,3.286s1.47,3.286,3.286,3.286s3.286-1.47,3.286-3.286S11.815,3.839,10,3.839 M10,9.589c-1.359,0-2.464-1.105-2.464-2.464S8.641,4.661,10,4.661s2.464,1.105,2.464,2.464S11.359,9.589,10,9.589">
                            </path>
                        </svg>
                        {user.usradd}<br />
                    </div>
                    <div class="profile-location">
                        {user.blockname}, {user.districtname}, {user.countryname}
                    </div>
                    <div class="divider">
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                        </svg>
                    </div>
                </div>
                <MDBContainer style={{marginTop: 30, paddingTop: 0}}>
                    <MDBRow>
                        <MDBCol md="6">
                            <form>
                                <p className="h4 text-center">Contact Information</p>
                                <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                                Mobile No.
        </label>
                                <input type="text" id="defaultFormRegisterNameEx" value={user.usrmob} className="form-control" />
                                <br />
                                <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                                Telegram No.
        </label>
                                <input type="email" id="defaultFormRegisterEmailEx" value={user.wmobno} className="form-control" />
                                <br />
                                <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
                                Primary Email Address
        </label>
                                <input type="email" id="defaultFormRegisterConfirmEx" value={user.usrpriemail} className="form-control" />
                                <br />
                                <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                                Twitter Handle
        </label>
                                <input type="text" id="defaultFormRegisterPasswordEx" value={user.twhandle} className="form-control" />
                            </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <hr />
                <MDBContainer style={{marginTop: 30, paddingTop: 0}}>
                    <MDBRow>
                        <MDBCol md="6">
                            <form>
                                <p className="h4 text-center">Qualification Information</p>
                                <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                                    Education
        </label>
                                <input type="text" id="defaultFormRegisterNameEx" value={educationName} className="form-control" />
                                <br />
                                <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                                    Professional
        </label>
                                <input type="email" id="defaultFormRegisterEmailEx" value={professionName} className="form-control" />
                                <br />
                                <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
                                    Skills
        </label>
                                <input type="email" id="defaultFormRegisterConfirmEx" value={user.skillother} className="form-control" />
                                <br />
                                <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                                    Role in IT Wing
        </label>
                                <input type="text" id="defaultFormRegisterPasswordEx" value="Team Member" className="form-control" />
                            </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        </div>))}
        {screen === 'Delete Member' && <p class="iconSwitch" style={{marginTop:100}} onClick={() => deleteMember()}>Delete Profile</p>}
    </>
    )
};

export default UserProfile;