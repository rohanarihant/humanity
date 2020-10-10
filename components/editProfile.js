import React, { useState } from 'react';
import NavBar from './NavBarBack';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import { auth } from '../utils/apis';
import {withAccount} from '../contexts/accountContext';

const Multiselect = dynamic(
    () => import('multiselect-react-dropdown').then(module => module.Multiselect),
    {
        ssr: false
    }
)
// const educationList = ['Class 1st', 'Class 2nd', 'Class 3rd', 'Class 4th', 'Class 5th', 'Class 6th', 'Class 7th', 'Class 8th', 'Class 9th', 'Class 10th', 'Class 11th', 'Class 12th',
//     'B.Arch - Bechelor of Architecure', 'B.A - Bechelore of Arts', 'BAMS - Bechelore of Ayurvedic Medicine & Surgery', 'B.B.A - Bechelore of Business Administration', 'B.Com - Bechelore of Commerce',
//     'B.C.A - Bechelore of Computer Application', 'B.D.S - Bechelore of Dental Surgery', 'B.Des/B.D', 'B.Ed', 'B.E/B.Tech', 'BFA/BVA', 'B.F.Sc/B.Sc', 'B.H.M.S', 'L.L.B',
//     'B.Lib/B.Lib.Sc', 'B.M.C/B.M.M', 'M.B.B.S', 'Bechelore of Nursing', 'B.Pharm/B.Pharma', 'B.P.Ed', 'B.P.T', 'B.Sc', 'BSW/B.A(SW)', 'B.V.Sc & A.H / B.V.Sc', 'M.D', 'M.D (Homeophathy)',
//     'Pharm D', 'Ph. D', 'D.M', 'M.Arch', 'M.A', 'M.B.A', 'M.CH', 'M.Com', 'M.C.A', 'M.D.S', 'M.Des/M.Design', 'M.Ed', 'M.E/M.Tech', 'MFA/MVA', 'L.L.M', 'MLib / MLib.Sc', 'M.M.C / M.M.M', 'M.Pharm',
//     'M.Phil', 'MPEd / M.P.E', 'M.P.T', 'M.Sc', 'M.S.W/M.A (SW)', 'M.Sc (Agriculture)', 'M.S (Master in Surgury)', 'M.V.Sc', '3 Years of Diploma', '2 Years of ITI Cource'];
// const professionList = ['A.C Repairing', 'Accountant', 'Advocate', 'Agent', 'Agriculture/farmer', 'Anganwadi Worker',
//     'ANM', 'Army Servent', 'Artist', 'Barber Hair Dresser', 'Beautician', 'Beldaar', 'Black Smith', 'Bool Seller', 'Broker',
//     'Businessman', 'Care Taker', 'Carpenter', 'Chartered Accountant', 'Chemist', 'Civil Engineer', 'Cloth Die (kapade di chappai)',
//     'Cobbler', 'Combine Operator', 'Computer-Operator', 'Conductor', 'Construction', 'Contractor', 'Cook', 'D.J Sound', 'Dairy Farm',
//     'Dentor', 'Driver', 'Electrician', 'Engineer', 'Ex-man'];
const skillsLists = [
    { name: 'Acting', id: 1 }, { name: 'Basic Computer Knowledge', id: 2 }, { name: 'Content Writing in English', id: 3 }, { name: 'Content Writing in Hindi', id: 4 }, { name: 'Dancing', id: 5 },
    { name: 'Good Communication skills in English', id: 6 }, { name: 'Mobile App Developer', id: 7 }, { name: 'Networking', id: 8 }, { name: 'Content Writing in Hindi', id: 9 }, { name: 'Public Speaking', id: 10 },
    { name: 'Quality Analyst', id: 11 }, { name: 'SEO', id: 12 }, { name: 'Social Media Expert', id: 13 }, { name: 'Web Designing', id: 14 }, { name: 'Web Development', id: 15 }, { name: 'Other', id: 15 }
];
const devices = [{name: 'Desktop', id: 1},{name: 'Laptop', id: 2},{name: 'Smart Phone', id: 3}]

class EditProfile extends React.Component{
    constructor(props){
        super(props);
        const MemberDetaildet = localStorage.getItem('MemberDetaildet') && JSON.parse(localStorage.getItem('MemberDetaildet'))[0];
        const memberDevices = MemberDetaildet && MemberDetaildet.usrown.split(',');
        const memberSkills = MemberDetaildet && MemberDetaildet.skillother.split(',');
        const {account : {educationList, professionList}} = this.props;
        const selectedEdu = educationList && educationList.find(e => e.qualificationid === MemberDetaildet.usreduid);
        const selectedPro = professionList && professionList.find(e => e.professionid === MemberDetaildet.usrprofessionid);
        console.log(selectedPro,'selectedPro')
        console.log(selectedEdu,'selectedEdu')
        this.state = {
            mobileNumber: MemberDetaildet.mobno || '',
            skills: skillsLists.filter(d => memberSkills.includes(d.name)),
            device: devices.filter(d => memberDevices.includes(d.name)),
            skillsList: '',
            devicesList:'',
            telegramNumber: MemberDetaildet.wmobno || '',
            otherEmail:'',
            twitterHandle: MemberDetaildet.twhandle,
            education: (selectedEdu && selectedEdu.qualificationid) || 0,
            profession: (selectedPro && selectedPro.professionid) || 0,
        }
    }
    onSelectSkill(selectedList) {
        this.setState({skillsList : selectedList});
    }
    
    onRemoveSkill(selectedList) {
        this.setState({skillsList : selectedList});
    }
    onSelectDevice(selectedList) {
        console.log(selectedList,'selectedList')
        this.setState({devicesList : selectedList});
    }
    
    onRemoveDevice(selectedList) {
        this.setState({devicesList : selectedList});
    }
    updateField(e){
        const {value, name} = e.target;
        this.setState({[name]: value});
        this.setState({[name+'Error']:``});
    }
    async updateProfile(){
        const {mobileNumber, telegramNumber, otherEmail, twitterHandle, education, profession, skillsLists, devices,
        mobileNumberError, telegramNumberError, twitterHandleError, educationError, professionError, skills, devicesList} = this.state;
        const {account : {setRoute}} = this.props;
        console.log(devicesList,'devicesList')
        console.log(devices,'devices')
        const fileds = ['mobileNumber', 'telegramNumber', 'twitterHandle', 'education', 'profession', 'skillsLists', 'devices'];
        fileds.map((field) => {
            if(this.state[field] === ''){
                this.setState({field});
                this.setState({[field+'Error']:`${field} is required`});
            }else{
                this.setState({field});
                this.setState({[field+'Error']:``});
            }
        });
        if(mobileNumber.length < 9){
            this.setState({['mobileNumberError']:`incorrect Mobile Number`});
        }else{
            this.setState({['mobileNumberError']:``});
        }
        if(telegramNumber.length < 9){
            this.setState({['telegramNumberError']:`incorrect Telegram Number`});
        }else{
            this.setState({['telegramNumberError']:``});
        }
        if(mobileNumber !== '' && telegramNumber !== '' && twitterHandle !== '' && education !== '' && profession !== ''
            && mobileNumberError  === '' && telegramNumberError === '' && twitterHandleError === ''
            && educationError === '' && professionError === ''){
                const userid = localStorage.getItem('userId');
                const authpassword = localStorage.getItem('authpassword');
                const res = await auth.updateUser(userid, authpassword, mobileNumber, telegramNumber,
                    otherEmail, twitterHandle, education, profession, skills && skills.map(({name}) => name).join(','), devices && devices.map(({name}) => name).join(','), '');
                res.success && toast.success('User Profile updated successfully!');
                res.success && setRoute('home');
        }
        }
    render(){
        const {mobileNumber, telegramNumber, otherEmail, twitterHandle, education, profession, skills, device,
            mobileNumberError, telegramNumberError, otherEmailError, twitterHandleError, educationError, professionError} = this.state;
        const {account : { educationList, professionList}} = this.props;

    console.log(education,'educationList')
    return (
        <div>
            <NavBar />
            <div class="container" id="myApp" >
                <section class="section login" v-class="flip : signup">
                    <h2>Update Profile</h2>
                    <form action="#">
                        <>
                            <div class="form-group">
                                <label for="text">Mobile Number</label><span class="asterisk">*</span>
                                <input type="number" maxLength="13" id="text" name="mobileNumber" placeholder="Mobile Number" value={mobileNumber} onChange={(e) => this.updateField(e)} class="form-control" />
                                <p class="error">{mobileNumberError}</p>
                            </div>
                            <div class="form-group">
                                <label for="text">Telegram Number</label><span class="asterisk">*</span>
                                <input type="number" maxLength="13" id="text" name="telegramNumber" placeholder="Telegram Number" value={telegramNumber} onChange={(e) => this.updateField(e)} class="form-control" />
                                <p class="error">{telegramNumberError}</p>
                            </div>
                            <div class="form-group">
                                <label for="text">Any Other Email</label>
                                <input type="text" id="text" name="otherEmail" placeholder="Other Email" value={otherEmail} onChange={(e) => this.updateField(e)} class="form-control" />
                                <p class="error">{otherEmailError}</p>
                            </div>
                            <div class="form-group">
                                <label for="text">Twitter Handle</label><span class="asterisk">*</span>
                                <input type="text" id="text" name="twitterHandle" placeholder="Twitter Handle" value={twitterHandle} onChange={(e) => this.updateField(e)} class="form-control" />
                                <p class="error">{twitterHandleError}</p>
                            </div>
                            <div class="form-group" >
                                <label for="selection">Education</label>
                                <select class="form-control" name="education" placeholder="Education" value={education} onChange={(e) => this.updateField(e)}>
                                    <option>Select Education</option>
                                    {educationList && educationList.map(edu => (<option value={edu.qualificationid}>{edu.qualificationname}</option>))}
                                </select>
                                <p class="error">{educationError}</p>
                            </div>
                            <div class="form-group" >
                                <label for="selection">Profession</label>
                                <select class="form-control" name="profession" placeholder="profession" value={profession} onChange={(e) => this.updateField(e)}>
                                    <option>Select Profession</option>
                                    {professionList && professionList.map(profession => (<option value={profession.professionid}>{profession.professionname}</option>))}
                                </select>
                                <p class="error">{professionError}</p>
                            </div>
                            <div class="form-group">
                                <label for="email">Skills</label>
                                <Multiselect
                                    options={skillsLists} // Options to display in the dropdown
                                    selectedValues={skills} // Preselected value to persist in dropdown
                                    onSelect={() => this.onSelectSkill()} // Function will trigger on select event
                                    onRemove={() => this.onRemoveSkill()} // Function will trigger on remove event
                                    displayValue="name" // Property name to display in the dropdown options
                                />
                            </div>
                            <div class="form-group">
                                <label for="email">Devices for Sewa</label><span class="asterisk">*</span>
                                <Multiselect
                                    options={devices} // Options to display in the dropdown
                                    selectedValues={device} // Preselected value to persist in dropdown
                                    onSelect={() => this.onSelectDevice()} // Function will trigger on select event
                                    onRemove={() => this.onRemoveDevice()} // Function will trigger on remove event
                                    displayValue="name" // Property name to display in the dropdown options
                                />
                            </div>
                            <p class="iconSwitch" onClick={() => this.updateProfile()}>Update Profile</p>
                        </>
                    </form>
                </section>
            </div>
        </div>
    )
    }
}

export default withAccount(EditProfile);