import React, { useEffect, useState, useContext } from 'react';
import NavBar from './NavBarBack';
import { results } from '../utils/apis';
import AccountContext from '../contexts/accountContext';
import { simranAPI } from '../utils/apis'; 
import { toast } from 'react-toastify';

const AddSimran = () => {
    const {account: { setRoute}} = useContext(AccountContext);
    const [simranDate,setSimranDate] = useState('');
    const [simranHour,setSimranHour] = useState('');
    const [simranMinute,setSimranMinute] = useState('');

    const submitSimran = async() => {
        if(simranDate && simranHour && simranMinute && (Number(simranMinute) > 0 || Number(simranHour) > 0)){
            const userid = localStorage.getItem('userId');
            const authpassword = localStorage.getItem('authpassword');
            const res = await simranAPI.addSimran(userid, authpassword, simranHour, simranMinute, simranDate );
            if(Number(res.success)){
                toast.success('Simran Report Submitted Successfully');
                setSimranDate('');
                setSimranHour('');
                setSimranMinute('');
            }
        }
    }

    return(
        <div>
        <div>
            <NavBar prevRoute="home" />

            <h5 style={{marginTop: 100}} className="simran-heading" onClick={() => setRoute('simranReport')}>Simran Report</h5>

            <div className="simran-container">
                <p className="">अगर आप ब्लॉक में सिमरन या अखंड सिमरन की रिपोर्ट दे रहे हैं। तो उसे वैसे ही देते रहे.</p>
                <div className="simran-block">
                    <p>सिमरन किस तारीख में किया</p>
                    <input type="date" onChange={(e) => setSimranDate(e.target.value)} />
                </div>
                <div className="simran-block">
                    <p>कुल कितना सिमरन किया</p>
                    <input type="text" className="simran-text" maxLength={2} onChange={(e) => setSimranHour(e.target.value)} />
                    <input type="text" className="simran-text" maxLength={2} onChange={(e) => setSimranMinute(e.target.value)} />
                </div>
                <p className="iconSwitch" onClick={() => submitSimran()}>Save</p>
            </div>
        </div>
        <style jsx>
        {`
        .simran-heading{
            margin-top: 90px;
            text-align: center;
            color: #3D8EE1;
        }
        .simran-container{
            padding: 15px;
        }
        .simran-block{
            display:flex;
            justify-content: space-between;
            margin-top: 15px;
        }
        .simran-text{
            height: 30px;
            width: 50px;
        }
        `}
        </style>
        </div>
    );
}
export default AddSimran;