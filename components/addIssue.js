import React, {useState, useContext} from 'react';
import NavBar from './NavBarBack';
import {issues} from '../utils/apis';
import { toast } from 'react-toastify';
import AccountContext from '../contexts/accountContext';

const AddIssue = () => {
    const [image, selectImage] = useState('');
    const [issueDescription, updateIssueDescription] = useState('');
    const [sendTo, onSendTo] = useState('State Member');
    const {account: { setRoute, toggleShowLoader }} = useContext(AccountContext);

    const addIssue = async() => {
        toggleShowLoader(true);
        const userid = localStorage.getItem('userId');
        const authpassword = localStorage.getItem('authpassword');
        const power = JSON.parse(localStorage.getItem('power'));
        const MemberDetaildet = JSON.parse(localStorage.getItem('MemberDetaildet'));
        const gender = MemberDetaildet && MemberDetaildet[0].usrgen;
        const res = await issues.addIssue(userid, authpassword, power, issueDescription, sendTo, userid, "issue", "", new Date().toLocaleDateString(), gender, image);
        res.success && toast('Issue added successfully');
        res.success && setRoute('issues');
        toggleShowLoader(false);
    
    }
return(
    <div>
        <NavBar />
        <div className="add-issue-container">
            <input type="file" className="form-control" id="img" name="img" accept="image/*" onChange={(e) => selectImage(e)}/>
            <textarea placeholder="Type your query here" className="form-control" onChange={(e) => updateIssueDescription(e.target.value)}></textarea>
            <select className="form-control" onChange={(e) => onSendTo(e.target.value)}>
                <option>State Member</option>
                <option>National Member</option>
                <option>Management Member</option>
            </select>
            <p className="iconSwitch" onClick={() => addIssue()}>Submit</p>
        </div>
        <style jsx>
        {`
        .add-issue-container{
            margin-top: 70px;
            padding: 15px;
        }
        .form-control{
            margin-bottom: 20px;
        }
        `}
        </style>
    </div>
);
}

export default AddIssue;