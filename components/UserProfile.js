import React, {useEffect, useContext, useState} from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import NavBar from '../components/NavBarBack';
import AccountContext from '../contexts/accountContext';
import { accountApproval } from '../utils/apis';
import { toast } from 'react-toastify';

const UserProfile = () => {
    const {account: { getProfileDetails, screen, toggleShowLoader, setRoute, selectedUser, educationList, professionList, setItwingRank, getEduProList, searchMemberBackState}} = useContext(AccountContext);
    const [userProfileData, setUserProfileData] = useState([{}]);
    const selectedUserData =  selectedUser;
    const educationObj = educationList && educationList.find(edu => edu.qualificationid === userProfileData[0].usreduid);
    console.log(educationList,'educationList educationList')
    console.log(userProfileData[0].usreduid,'userProfileData[0].usreduid')
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
        async function getEduProfessionList(){
            await getEduProList();
        }
        getEduProfessionList();
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
    const addDefaultSrc = (ev) => {
        ev.target.src = './static/img/head.png';
    }
    return (
        <>
        <NavBar prevRoute={searchMemberBackState} />
        {selectedUserData && selectedUserData.map(user => (
        <div class="container" >
            <div class="profile-card">
                <div class="card-header">
                    <img class="profile-image" src={`http://humanity.rubrutech.com/profileimage/${user.usrid}.jpg`}  onError={(e) => addDefaultSrc(e)}  alt="profile image" />
                    <img className="profile-image-upload" src={`./static/img/upload-image.png`} alt="profile image" onClick={() => updateShowImageUpload(!showImageUpload)} />
                    <div class="profile-name">{user.usrname}</div>
                    <div class="profile-role">{user.categoryname} ({user.stateshortname+'-'+user.usrid})</div>
                    <div class="profile-location">
                        Email : {user.usrpriemail}
                    </div>
                    <div class="profile-location">
                        Mobile No. : {user.usrmob}
                    </div>
                    {/* <div class="profile-location">
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
                    </div> */}
                </div>
                <MDBContainer style={{marginTop: 110, paddingTop: 0}}>
                    <MDBRow>
                        <MDBCol md="6">
                        <form>
                                <p className="h4 text-center">Personal Information</p>
                                <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                                ITW-ID
        </label>
                                <input type="text" id="defaultFormRegisterNameEx" value={user.stateshortname+'-'+user.usrid} className="form-control" />
                                <br />
                                <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                                Father Name
        </label>
                                <input type="email" id="defaultFormRegisterEmailEx" value={user.usrfatnam} className="form-control" />
                                <br />
                                <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
                                Gender
        </label>
                                <input type="email" id="defaultFormRegisterConfirmEx" value={user.usrgen} className="form-control" />
                                <br />
                                <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                                Country
        </label>
                                <input type="text" id="defaultFormRegisterPasswordEx" value={user.countryname} className="form-control" />
                                <br />
                                <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                                State
        </label>
                                <input type="text" id="defaultFormRegisterPasswordEx" value={user.statename} className="form-control" />
                                <br />
                                <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                                District
        </label>
                                <input type="text" id="defaultFormRegisterPasswordEx" value={user.districtname} className="form-control" />
                                <br />
                                <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                                Block
        </label>
                                <input type="text" id="defaultFormRegisterPasswordEx" value={user.blockname} className="form-control" />
                                <br />
                                <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                                Address
        </label>
                                <input type="text" id="defaultFormRegisterPasswordEx" value={user.usradd} className="form-control" />
                                <br />
                                <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                                Insan No
        </label>
                                <input type="text" id="defaultFormRegisterPasswordEx" value={user.usrinsnum} className="form-control" />
                                <br />
                                <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                                D. O. B
        </label>
                                <input type="text" id="defaultFormRegisterPasswordEx" value={new Date(user.usrdob).toLocaleDateString()} className="form-control" />
                                <br />
                                <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                                Blessed with ITw Parashad
        </label>
                                <input type="text" id="defaultFormRegisterPasswordEx" value={user.parshadtaken === '0' ? 'Yes' : 'No'} className="form-control" />
                                <br />
                                <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                                Blood Group
        </label>
                                <input type="text" id="defaultFormRegisterPasswordEx" value={user.bloodgrp} className="form-control" />
                                <br />
                                <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                                Devices
        </label>
                                <input type="text" id="defaultFormRegisterPasswordEx" value={user.usrown} className="form-control" />
                            </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <MDBContainer style={{marginTop: 200, paddingTop: 0}}>
                    <MDBRow>
                        <MDBCol md="6">
                            <form>
                                <p className="h4 text-center">Contact Information</p>
                                <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                                Mobile No.
        </label>
                                <input type="email" id="defaultFormRegisterEmailEx" value={user.usrmob} className="form-control" />
                                <br />
                                <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                                Telegram No.
        </label>
                                <input type="email" id="defaultFormRegisterEmailEx" value={user.wmobno} className="form-control" />
                                <br />
                                <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
                                Primary Email Id
        </label>
                                <input type="email" id="defaultFormRegisterConfirmEx" value={user.usrpriemail} className="form-control" />
                                <br />
                                <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                                Other Email Id
        </label>
                                <input type="text" id="defaultFormRegisterPasswordEx" value={user.usremailother} className="form-control" />
                            </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                
                <MDBContainer style={{marginTop: 150, paddingTop: 0}}>
                    <MDBRow>
                        <MDBCol md="6">
                        <form>
                                <p className="h4 text-center">Social Media</p>
                                <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                                Facebook
        </label>
                                <input type="email" id="defaultFormRegisterEmailEx" value={user.facebook} className="form-control" />
                                <br />
                                <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
                                Instagram
        </label>
                                <input type="email" id="defaultFormRegisterConfirmEx" value={user.instagram} className="form-control" />
                                <br />
                                <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                                Twitter Handle
        </label>
                                <input type="text" id="defaultFormRegisterPasswordEx" value={user.twhandle} className="form-control" />
                                <br />
                                <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                                Other Twitter Handle
        </label>
                                <input type="text" id="defaultFormRegisterPasswordEx" value={user.othertwitterhandle} className="form-control" />
                            </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <MDBContainer style={{marginTop: 70, paddingTop: 0, marginBottom: 0}}>
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
                                <input type="text" id="defaultFormRegisterEmailEx" value={professionName} className="form-control" />
                                <br />
                                <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
                                    Skills
        </label>
                                <input type="text" id="defaultFormRegisterConfirmEx" value={user.skillother} className="form-control" />
                                <br />
                                <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
                                    Role in Humanity
        </label>
                                <input type="text" id="defaultFormRegisterConfirmEx" value={user.categoryname} className="form-control" />
                                <br />
                                <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
                                    Samiti
        </label>
                                <input type="text" id="defaultFormRegisterConfirmEx" value={localStorage.getItem('samiti')} className="form-control" />
                                <br />
                            </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        </div>))}
        {screen === 'Delete Profile' && <p class="iconSwitch" style={{marginTop:"100px 10px 20px 10px"}} onClick={() => deleteMember()}>Delete Profile</p>}
    </>
    )
};

export default UserProfile;