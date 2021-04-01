import React from 'react';
import Router, { withRouter } from 'next/router'
import { withAccount } from '../contexts/accountContext';
import { unstable_createMuiStrictModeTheme } from '@material-ui/core';
import dynamic from 'next/dynamic';
import {auth, user} from '../utils/apis';
import { toast } from 'react-toastify';


const Multiselect = dynamic(
    () => import('multiselect-react-dropdown').then(module => module.Multiselect),
    {
        ssr: false
    }
)
const skillsList = [
    {name: 'Acting', id: 1},{name: 'Basic Computer Knowledge', id: 2},{name: 'Content Writing in English', id: 3},{name: 'Content Writing in Hindi', id: 4},{name: 'Dancing', id: 5},
    {name: 'Good Communication skills in English', id: 6},{name: 'Mobile App Developer', id: 7},{name: 'Networking', id: 8},{name: 'Content Writing in Hindi', id: 9},{name: 'Public Speaking', id: 10},
    {name: 'Quality Analyst', id: 11},{name: 'SEO', id: 12},{name: 'Social Media Expert', id: 13},{name: 'Web Designing', id: 14},{name: 'Web Development', id: 15},{name: 'Other', id: 15}
];
// const professionList = ['A.C Repairing', 'Accountant', 'Advocate', 'Agent', 'Agriculture/farmer', 'Anganwadi Worker',
// 'ANM', 'Army Servent', 'Artist', 'Barber Hair Dresser', 'Beautician', 'Beldaar', 'Black Smith', 'Bool Seller', 'Broker',
// 'Businessman', 'Care Taker', 'Carpenter', 'Chartered Accountant', 'Chemist', 'Civil Engineer', 'Cloth Die (kapade di chappai)',
// 'Cobbler', 'Combine Operator', 'Computer-Operator', 'Conductor', 'Construction', 'Contractor', 'Cook', 'D.J Sound', 'Dairy Farm',
// 'Dentor', 'Driver', 'Electrician', 'Engineer', 'Ex-man'];
const devices = [{name: 'Laptop-Windows', id: 1},{name: 'Laptop-Mac Book', id: 2},{name: 'Mobile-Android', id: 3},{name: 'Mobile-iOS', id: 4},{name: 'Tablet-Android', id: 5},{name: 'Tablet-iOS', id: 6} ]
// const educationList = ['Class 1st','Class 2nd','Class 3rd','Class 4th','Class 5th','Class 6th','Class 7th','Class 8th','Class 9th','Class 10th','Class 11th','Class 12th',
// 'B.Arch - Bechelor of Architecure', 'B.A - Bechelore of Arts', 'BAMS - Bechelore of Ayurvedic Medicine & Surgery', 'B.B.A - Bechelore of Business Administration', 'B.Com - Bechelore of Commerce',
// 'B.C.A - Bechelore of Computer Application', 'B.D.S - Bechelore of Dental Surgery', 'B.Des/B.D', 'B.Ed', 'B.E/B.Tech', 'BFA/BVA', 'B.F.Sc/B.Sc','B.H.M.S','L.L.B',
// 'B.Lib/B.Lib.Sc','B.M.C/B.M.M','M.B.B.S','Bechelore of Nursing','B.Pharm/B.Pharma','B.P.Ed','B.P.T','B.Sc','BSW/B.A(SW)','B.V.Sc & A.H / B.V.Sc','M.D','M.D (Homeophathy)',
// 'Pharm D','Ph. D','D.M','M.Arch','M.A','M.B.A','M.CH','M.Com','M.C.A','M.D.S','M.Des/M.Design','M.Ed','M.E/M.Tech','MFA/MVA','L.L.M','MLib / MLib.Sc','M.M.C / M.M.M','M.Pharm',
// 'M.Phil','MPEd / M.P.E','M.P.T','M.Sc','M.S.W/M.A (SW)','M.Sc (Agriculture)','M.S (Master in Surgury)','M.V.Sc','3 Years of Diploma','2 Years of ITI Cource']
const bloodGroupList = ['A+','A-','B+','B-','AB+','AB-','O+','O-']
class Register extends React.Component{
  constructor(props){
    super(props);
    const {account: { educationList, professionList, toggleShowLoader }} = props;
        this.state = {
            pageNo: 0,
            email: '',
            emailError: '',
            password: '',
            errorPassword: '',
            confirmPassword: '',
            confirmErrorPassword: '',
            name: '',
            nameError: '',
            fatherName: '',
            fatherNameError: '',
            address: '',
            addressError: '',
            insanNo: '',
            insanNoError: '',
            dateofBirth: '',
            dateofBirthError: '',
            gender: 'Male',
            genderError: '',
            email: '',
            emailError: '',
            alternateEmail: '',
            password: '',
            passwordError: '',
            confirmPassword: '',
            confirmPasswordError: '',
            mobileNo: '',
            mobileNoError: '',
            telegramMobileNo: '',
            telegramMobileNoError: '',
            twitterHandle: '',
            twitterHandleError: '',
            itWingPrashad: 'yes',
            itWingPrashadError: '',
            education:'',
            skills:'',
            bloodGroup:'',
            device:'',
            sewaSamiti:'SMG Sewa',
            sewaSamitiError:'',
            profession:'',
            professionError:'',
            educationError:'',
            alternateEmailError:'',
            block:'',
            blockId:'',
            blockError:'',
            skillsList:[],
            deviceList:[],
            blocksList:[],
            educationList: educationList,
            professionList: professionList,
            instagramProfile: '',
            instagramProfileError: '',
            facebookProfile: '',
            facebookProfileError: '',
        }
        // const {account: {getLogin}} = useContext(AccountContext);
        this.checkForm = this.checkForm.bind(this);
        this.onSelectDevice = this.onSelectDevice.bind(this);
        this.onRemoveDevice = this.onRemoveDevice.bind(this);
        this.onRemoveSkill = this.onRemoveSkill.bind(this);
        this.onSelectSkill = this.onSelectSkill.bind(this);
        this.searchBlock = this.searchBlock.bind(this);
        this.moveBack = this.moveBack.bind(this);
        this.updateMobile = this.updateMobile.bind(this);

    }

    async componentDidMount(){
      // const {account: { toggleShowLoader }} = this.props;

      // toggleShowLoader(true);
      // const eduList = await user.getEducationList();
      // const proList = await user.getProfessionList();
      // this.setState({educationList : eduList.educations,professionList: proList.profession });
      // toggleShowLoader(false);
      }

    validateField(selectedPage, pageNo){
        let validate = [];
        const selectedCheck = (page) => pageNo === 0 ? (page !== 'gender' || page !== 'insanNo') : pageNo === 1 ?
        page !== 'alternateEmail' : pageNo === 2 ? (page !== 'device' || page !== 'skills' || page !== 'bloodGroup') : null;
        {selectedPage.map( field => {
            if(selectedCheck(field)){
                if(this.state[field] !== '' && this.state[field+'Error'] === ''){
                    validate.push(true);
                }else{
                    validate.push(false);
                }
            }
        });
        }
        return validate.length > 0 && !validate.includes(false);
    }
    checkForm = async() => {
        const {pageNo} = this.state;
        const pageNo0 = ['name', 'fatherName', 'gender', 'address', 'insanNo', 'dateofBirth', 'email' , 'password', 'confirmPassword', 'mobileNo', 'telegramMobileNo', 'twitterHandle', 'itWingPrashad', 'education', 'profession', 'sewaSamiti']
        // const selectedPage = pageNo === 0 ? pageNo1 : pageNo === 1 ? pageNo0 : pageNo === 2 ? pageNo2 : null;
        const selectedCheck = (page) => pageNo === 0 ? (page !== 'gender' && page !== 'insanNo') : pageNo === 1 ?
        (page !== 'alternateEmail' && page !== 'bloodGroup') : pageNo === 2 ? (page !== 'device' && page !== 'skills') : null;
        if(pageNo <= 2 && pageNo0){
            {pageNo0.map( page => {
                if(selectedCheck(page)){
                    if(this.state[page+'Error'] === ''){
                        if(!this.state[page] || (page !== "education" && page !== "profession" && this.state[page].length < 3)){
                            this.setState({[page+'Error']: `Enter ${page}`});
                        }else{
                            this.setState({[page+'Error']: ''});
                        }
                        if(this.state['blockId'] === ''){
                            this.setState({['blockError']: `Select Block`});
                        }else{
                            this.setState({['blockError']: ''});
                        }
                    }
                }
            });
            }
        // if(pageNo === 0 && name === "insanNo" && this.state[name].length < 7){
        //     this.setState({[name+'Error']: `Invalid Insan Number`});
        // }else{
        //     this.setState({[name+'Error']: ''});
        // }
        if(this.validateField(pageNo0, pageNo)){
            const { email, password, fatherName, name, statecountryid, stateid, districtid, blockId, address,
                insanNo, mobileNo, telegramMobileNo, dateofBirth, alternateEmail, twitterHandle, education, profession,
                skillsList, deviceList, gender, bloodGroup } = this.state;
            // if(pageNo === 2){

                try{
                    let payload = {
                        registeremail: email,
                        password: password,
                        fname: fatherName,
                        name: name,
                        countryid: statecountryid,
                        stateid: stateid,
                        distid: districtid,
                        blockid: blockId,
                        address: address,
                        insanno: insanNo,
                        wmobno: mobileNo,
                        mobno: telegramMobileNo,
                        dob: dateofBirth,
                        othermail: alternateEmail,
                        twitter: twitterHandle,
                        education: education,
                        profession: profession,
                        skills: skillsList.map(({name}) => name).join(','),
                        device: deviceList.map(({name}) => name).join(','),
                        gender: gender,
                        bloodg: bloodGroup,
                    }
                    const response = await auth.register(payload);
                    if(response.success){
                      // await auth.uploadSocialMedia(userid, authpassword, facebookLink, instagramLink, twitterHandle);
                    toast.success('Account Created Successfully');
                    Router.push({
                        pathname: '/login',
                    });
                     }else{
                         toast.error(response && response.message);
                     }
                }catch(error){
                    toast.error(error && error.message);
                }
            // }else{
            //     this.setState({pageNo: pageNo <= 2 && pageNo+1});
            // }
        }
        }
    }

    updateField = (e) => {
        const { name, value } = e.target;
        if(name === "email" || name === "alternateEmail"){
            if (/^[a-zA-Z.0-9]+@[a-zA-Z.0-9]+\.[A-Za-z]+$/.test(value) || value.length === 0) {
                this.setState({[name]: value});
                this.setState({[name+'Error']: ''});
            }else{
                this.setState({[name]: value});
                this.setState({[name+'Error']: 'Invalid Email'});
             }
        }else{
            this.setState({[name]: value});
            this.setState({[name+'Error']: ''});
        }

    }
    updateMobile = (e) => {
      const { name, value } = e.target;
      if(this.state[name].length <= 8 || this.state[name].length > 12){
        this.setState({[name]: value});
          this.setState({[name+'Error']: `Invalid Mobile Number`});
        }else{
          this.setState({[name]: value});
          this.setState({[name+'Error']: ''});
      }
    }
    onSelectSkill(selectedList, selectedItem) {
        this.setState({skillsList: selectedList});
    }
    
    onRemoveSkill(selectedList, removedItem) {
        this.setState({skillsList: selectedList});
    }

    onSelectDevice(selectedList, selectedItem) {
        this.setState({deviceList: selectedList});
    }
    
    onRemoveDevice(selectedList, removedItem) {
        this.setState({deviceList: selectedList});
    }

    async searchBlock(e){
        this.setState({block: e.target.value}, async() => {
            const blockResponse = await auth.searchBlock(this.state.block);
            this.setState({blocksList: blockResponse && blockResponse.block });
        })
    }
    selectBlock(block, e){
        this.setState({blockId: block.blockid, blockname: block.blockname, districtid: block.districtid,
            districtname: block.districtname, statecountryid: block.statecountryid, stateid: block.stateid,
            statename: block.statename, blocksList:[], block:block.blockname, blockError: ''});
    }
    moveBack(){
        this.setState({pageNo: this.state.pageNo > 0 && this.state.pageNo-1});
    }
    updatePassword(e){
      const { name, value } = e.target;
      if(this.state[name].length < 5){
        this.setState({[name]: value});
        this.setState({[name+'Error']: 'Password should be more then 6 characters'});
      }else{
        this.setState({[name]: value});
        this.setState({[name+'Error']: ''});
      }
    }
    updateConfirmPassword(e){
      const { name, value } = e.target;
      this.setState({[name]: value},() => {
        if(this.state['password'] !== this.state[name]){
          this.setState({[name+'Error']: 'Consfirm Password dosnt match with Password'});
        }else{
          // this.setState({[name]: value});
          this.setState({[name+'Error']: ''});
        }
      });
    }
    render(){
        const {pageNo, name, fatherName, gender, address, insanNo, nameError, fatherNameError, insanNoError,
            addressError, dateofBirth, dateofBirthError, email, emailError, alternateEmail, password, passwordError,
            confirmPassword, confirmPasswordError, mobileNo, mobileNoError, telegramMobileNo, telegramMobileNoError,
            twitterHandle, itWingPrashad, education, skills, bloodGroup, device, sewaSamiti, educationList, professionList, twitterHandleError,
            profession, educationError, block, blockError, blocksList, alternateEmailError, professionError, instagramProfile,
            instagramProfileError, facebookProfile, facebookProfileError } = this.state;
        const {account: { showLoader }} = this.props;
    return(
        <div class="container" id="myApp">
          		{showLoader && <img className="loader" src="./static/img/loader.svg" />}

  <section class="section login" v-class="flip : signup" style={{opacity : showLoader ? 0.2 : 1 }}>
      {pageNo !== 0 && <img src="./static/img/back.png" class="back-button" onClick={this.moveBack} />}
    <h2>SignUp</h2>
    <form action="#">
      {/* {pageNo === 1 &&
      <> */}
      <div class="form-group">
        <label for="email">Email</label><span class="asterisk">*</span>
        <input type="email" id="text" autocomplete="off" name="email" value={email} onChange={(e) => this.updateField(e)} class="form-control" />
        <p class="error">{emailError}</p>
      </div>

      <div class="form-group">
        <label for="password">Password</label><span class="asterisk">*</span>
        <input type="password" id="password" name="password" value={password} onChange={(e) => this.updatePassword(e)} class="form-control" />
        <p class="error">{passwordError}</p>
      </div>
      <div class="form-group" v-show="signup">
        <label for="confirm-password">Confirm Password</label><span class="asterisk">*</span>
        <input type="password" id="confirm-password" name="confirmPassword" value={confirmPassword} onChange={(e) => this.updateConfirmPassword(e)} class="form-control" />
        <p class="error">{confirmPasswordError}</p>
      </div>
      <div class="form-group">
      <label for="text">Name</label><span class="asterisk">*</span>
      <input type="text" id="text" name="name" placeholder="Name" value={name} onChange={(e) => this.updateField(e)} class="form-control" />
      <p class="error">{nameError}</p>
    </div>
    <div class="form-group">
      <label for="text">Father's Name</label>
      <input type="text" id="text" name="fatherName" placeholder="First Name" value={fatherName} onChange={(e) => this.updateField(e)} class="form-control" />
      <p class="error">{fatherNameError}</p>
    </div>
    <div class="form-group" >
      <label for="selection">Gender</label><span class="asterisk">*</span>
      <select class="form-control" name="gender" placeholder="Gender" value={gender} onChange={(e) => this.updateField(e)}>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">other</option>
      </select>
    </div>
    <div class="form-group">
      <label for="text">Block</label><span class="asterisk">*</span>
      <input type="text" name="block" id="text" placeholder="block" value={block} onChange={(e) => this.searchBlock(e)} class="form-control" />
        {/* {blocksList &&  */}
         {/* <select class="form-control" value={itWingPrashad} name="itWingPrashad" id="blockListId" onChange={(e) => this.updateField(e)}> */}
          {blocksList && blocksList.map(block => <div class="block-option" onClick={this.selectBlock.bind(this,block)}>{`${block.blockname} ${block.districtname},
         (${block.statename})`}</div>)}
         {/* </select>} */}
      <p class="error">{blockError}</p>
    </div>
    <div class="form-group">
      <label for="text">Address</label><span class="asterisk">*</span>
      <input type="text" name="address" id="text" placeholder="Address" value={address} onChange={(e) => this.updateField(e)} class="form-control" />
      <p class="error">{addressError}</p>
    </div>

    <div class="form-group">
      <label for="text">Insan No</label>
      <input type="number" maxLength="7" name="insanNo" id="text" placeholder="Insan No"  value={insanNo} onChange={(e) => this.updateField(e)} class="form-control" />
      <p class="error">{insanNoError}</p>
    </div>
    <div class="form-group">
      <label for="text">Date of Birth</label><span class="asterisk">*</span>
      <input type="date" id="text" max="2003-10-11" placeholder="Date Of Birth" name="dateofBirth" value={dateofBirth} onChange={(e) => this.updateField(e)} class="form-control" />
      <p class="error">{dateofBirthError}</p>
    </div>

      <div class="form-group">
        <label for="email">Mobile No.</label><span class="asterisk">*</span>
        <input type="number" id="text" name="mobileNo" maxLength={11} value={mobileNo} onChange={(e) => this.updateMobile(e)} class="form-control" />
        <p class="error">{mobileNoError}</p>
      </div>
      <div class="form-group">
        <label for="email">Telegram Mobile No.</label><span class="asterisk">*</span>
        <input type="number" id="text" name="telegramMobileNo" maxLength={11} value={telegramMobileNo} onChange={(e) => this.updateMobile(e)} class="form-control" />
        <p class="error">{telegramMobileNoError}</p>
      </div>
      <div class="form-group">
        <label for="email">Alternate Email ID</label>
        <input type="email" id="text" name="alternateEmail" value={alternateEmail} onChange={(e) => this.updateField(e)} class="form-control" />
        <p class="error">{alternateEmailError}</p>
      </div>
      <div class="form-group">
        <label for="email">Twitter Handle</label><span class="asterisk">*</span>
        <input type="text" id="text" name="twitterHandle" value={twitterHandle} onChange={(e) => this.updateField(e)} class="form-control" />
        <p class="error">{twitterHandleError}</p>
      </div>
      {/* <div class="form-group">
        <label for="email">Your Facebook Profile Link</label><span class="asterisk">*</span>
        <input type="text" id="text" name="facebookProfile" value={facebookProfile} onChange={(e) => this.updateField(e)} class="form-control" />
        <p class="error">{facebookProfileError}</p>
      </div>
      <div class="form-group">
        <label for="email">Your Instagram Profile Link</label><span class="asterisk">*</span>
        <input type="text" id="text" name="instagramProfile" value={instagramProfile} onChange={(e) => this.updateField(e)} class="form-control" />
        <p class="error">{instagramProfileError}</p>
      </div> */}



    {/* </>} */}
    {/* {pageNo === 0 &&
    <> */}
    {/* </>
    }
    { pageNo === 2
    && 
    <> */}
      <div class="form-group">
        <label for="email">IT Wing Prashad Taken?</label><span class="asterisk">*</span>
        <select class="form-control" value={itWingPrashad} name="itWingPrashad" onChange={(e) => this.updateField(e)}>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div class="form-group">
        <label for="email">Education</label><span class="asterisk">*</span>
        <select class="form-control" value={education} name="education" onChange={(e) => this.updateField(e)}>
            <option>Select Education</option>
            {educationList && educationList.map(edu => (<option value={edu.qualificationid}>{edu.qualificationname}</option>))}
        </select>
        <p class="error">{educationError}</p>
      </div>

      <div class="form-group">
        <label for="email">Profession</label><span class="asterisk">*</span>
        <select class="form-control" value={profession} name="profession" onChange={(e) => this.updateField(e)}>
            <option>Select Profession</option>
            {professionList && professionList.map(profession => (<option value={profession.professionid}>{profession.professionname}</option>))}
        </select>
        <p class="error">{professionError}</p>
      </div>
      <div class="form-group">
        <label for="email">Skills</label>
        <Multiselect
            options={skillsList} // Options to display in the dropdown
            selectedValues={skills} // Preselected value to persist in dropdown
            onSelect={this.onSelectSkill} // Function will trigger on select event
            onRemove={this.onRemoveSkill} // Function will trigger on remove event
            displayValue="name" // Property name to display in the dropdown options
        />
      </div>
      <div class="form-group">
        <label for="email">Blood Group</label>
        <select class="form-control" name="bloodGroup" value={bloodGroup} onChange={(e) => this.updateField(e)}>
          <option>Select Your Blood Group</option>
        {bloodGroupList.map(bg => (<option>{bg}</option>))}
        </select>
      </div>
      <div class="form-group">
        <label for="email">Devices you can use for Sewa?</label>
        {/* <select class="form-control" value={device} onChange={(e) => this.updateField(e)}>
          <option>Yes</option>
          <option>No</option>
        </select> */}
        <Multiselect
            options={devices} // Options to display in the dropdown
            selectedValues={device} // Preselected value to persist in dropdown
            onSelect={this.onSelectDevice} // Function will trigger on select event
            onRemove={this.onRemoveDevice} // Function will trigger on remove event
            displayValue="name" // Property name to display in the dropdown options
        />
      </div>
      <div class="form-group">
        <label for="email">Select Sewa Samiti</label><span class="asterisk">*</span>
        <select class="form-control" value={sewaSamiti} onChange={(e) => this.updateField(e)}>
          <option value="SMG Sewa">SMG Sewa</option>
        </select>
      </div>
      {/* <div class="checkbox-layout" v-show="signup">
        <input type="checkbox" id="confirm-password"/>
        <a href="#" class="eula">I have read, and agree to the terms of uses.</a>
      </div> */}
    {/* </>
    } */}
      <p class="iconSwitch" onClick={() => this.checkForm()}>SignUp</p>
      <p><a href="javascript:;" class="create-account" onClick={() => Router.push({ pathname: '/login' })}>Login</a></p>
    </form>
  </section>
</div>
    )
}
}

export default withAccount(withRouter(Register));

