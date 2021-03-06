import React, { useContext } from 'react';
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
        const {account : {educationList, professionList, toggleShowLoader}} = this.props;
        const selectedEdu = educationList && educationList.find(e => e.qualificationid === MemberDetaildet.usreduid);
        const selectedPro = professionList && professionList.find(e => e.professionid === MemberDetaildet.usrprofessionid);
        this.state = {
            mobileNumber: MemberDetaildet.usrmob || '',
            skills: skillsLists.filter(d => memberSkills.includes(d.name)),
            device: devices.filter(d => memberDevices.includes(d.name)),
            skillsList: '',
            devicesList:'',
            telegramNumber: MemberDetaildet.wmobno || '',
            otherEmail:'',
            facebookLink: MemberDetaildet.facebook || '',
            instagramLink: MemberDetaildet.instagram || '',
            twitterHandle: MemberDetaildet.twhandle,
            education: (selectedEdu && selectedEdu.qualificationid) || 0,
            profession: (selectedPro && selectedPro.professionid) || 0,
            othertwitter: MemberDetaildet.othertwitterhandle,
        }
    }
    onSelectSkill(selectedList) {
        this.setState({skillsList : selectedList});
    }
    
    onRemoveSkill(selectedList) {
        this.setState({skillsList : selectedList});
    }
    onSelectDevice(selectedList) {
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
        mobileNumberError, telegramNumberError, twitterHandleError, educationError, professionError, skills,
        devicesList, facebookLink, instagramLink, othertwitter} = this.state;
        const {account : {toggleShowLoader}} = this.props;

        const {account : {setRoute}} = this.props;
        const fileds = ['mobileNumber', 'telegramNumber', 'twitterHandle', 'education', 'profession', 'skillsLists', 'devices', 'othertwitter'];
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
            && !mobileNumberError && !telegramNumberError && !twitterHandleError
            && !educationError && !professionError && othertwitter !== ''){
                toggleShowLoader(true);
                const userid = localStorage.getItem('userId');
                const authpassword = localStorage.getItem('authpassword');
                const res = await auth.updateUser(userid, authpassword, mobileNumber, telegramNumber,
                    otherEmail, twitterHandle, education, profession, skills && skills.map(({name}) => name).join(','), devices && devices.map(({name}) => name).join(','), othertwitter);
                // res.success && toast.success('User Profile updated successfully!');
                res.success && setRoute('home');
                toggleShowLoader(false);
        }
        if(facebookLink !== '' && instagramLink !== ''){
            toggleShowLoader(true);
            const userid = localStorage.getItem('userId');
            const authpassword = localStorage.getItem('authpassword');
            const res = await auth.uploadSocialMedia(userid, authpassword, facebookLink, instagramLink, twitterHandle);
            res.success && toast.success('User Profile updated successfully!');
            res.success && setRoute('home');
            toggleShowLoader(false);
        }
        }
    render(){
        const {mobileNumber, telegramNumber, otherEmail, twitterHandle, education, profession, skills, device,
            mobileNumberError, telegramNumberError, otherEmailError, twitterHandleError, educationError,
            professionError, facebookLink, instagramLink, othertwitter, othertwitterError} = this.state;
        const {account : { educationList, professionList}} = this.props;
    return (
        <div>
            <NavBar prevRoute="profile" />
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
                            <div class="form-group">
                                <label for="text">Facebook Link</label>
                                <input type="text" id="text" name="facebookLink" placeholder="Facebook Link" value={facebookLink} onChange={(e) => this.updateField(e)} class="form-control" />
                            </div>
                            <div class="form-group">
                                <label for="text">Instagram Link</label>
                                <input type="text" id="text" name="instagramLink" placeholder="Twitter Handle" value={instagramLink} onChange={(e) => this.updateField(e)} class="form-control" />
                            </div>
                            <div class="form-group">
                                <label for="text">Other Twitter Handles</label>
                                <input type="text" id="text" name="othertwitter" placeholder="Other Twitter Handles" value={othertwitter} onChange={(e) => this.updateField(e)} class="form-control" />
                                <p class="error">{othertwitterError}</p>
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