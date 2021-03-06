import React, { useEffect, useState, useContext } from 'react';
import NavBar from './NavBarBack';
import { results } from '../utils/apis';
import AccountContext from '../contexts/accountContext';
import { simranAPI } from '../utils/apis'; 
import { toast } from 'react-toastify';

const AddSimran = () => {
    const {account: { setRoute, toggleShowLoader}} = useContext(AccountContext);
    const [simranDate,setSimranDate] = useState('');
    const [simranDateError,setSimranDateError] = useState('');
    const [simranHour,setSimranHour] = useState('');
    const [simranHourError,setSimranHourError] = useState('');
    const [simranMinute,setSimranMinute] = useState('');
    const [simranMinuteError,setSimranMinuteError] = useState('');

    const submitSimran = async() => {
        if(simranDate === ''){
            setSimranDateError('Please select a date');
        }
        if((simranHour < 0 && simranHour > 24) || simranHour === ''){
            setSimranHourError('Invalid Hour');
        }
        if((simranMinute < 0 && simranMinute > 59) || simranMinute === ''){
            setSimranMinuteError('Invalid Minute');
        }
        if(Number(simranMinute) === 0 && Number(simranHour) === 0){
            setSimranHourError('Invalid Hour');
            setSimranMinuteError('Invalid Minute');
        }
        if(simranDate && simranHour && (simranHour >= 0 && simranHour <= 24) && (simranMinute >= 0 && simranMinute <= 59) && simranMinute && (Number(simranMinute) > 0 || Number(simranHour) > 0)){
            toggleShowLoader(true);
            const userid = localStorage.getItem('userId');
            const authpassword = localStorage.getItem('authpassword');
            const res = await simranAPI.addSimran(userid, authpassword, simranHour, simranMinute, simranDate );
            if(Number(res.success)){
                toast.success('Simran Report Submitted Successfully');
                setSimranDate('');
                setSimranHour('');
                setSimranMinute('');
                setRoute('simranReport');
            }
            toggleShowLoader(false);
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
                    <input type="date" onChange={(e) => {
                        setSimranDate(e.target.value);
                        setSimranDateError('');
                        }} />
                </div>
                    <p className="simran-error alignRight">{simranDateError}</p>
                <div className="simran-block marginTop">
                    <p className="total-simran">कुल कितना सिमरन किया</p>
                    <div>
                        <input type="number" className="simran-text" placceholder="hh" maxLength={2} onChange={(e) => {
                            setSimranHour(e.target.value);
                            setSimranHourError('');
                            }} />
                        <label className="simran-label">Hours</label>
                        <p className="simran-error">{simranHourError}</p>
                    </div>
                    <div>
                        <input type="number" className="simran-text"  placceholder="mm" maxLength={2} onChange={(e) => {
                            setSimranMinute(e.target.value);
                            setSimranMinuteError('');
                            }} />
                        <label className="simran-label">Minutes</label>
                        <p className="simran-error">{simranMinuteError}</p>
                    </div>
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
        .simran-error{
            font-size: 14px;
            color: red;
        }
        .simran-container{
            padding: 15px;
        }
        .alignRight{
            text-align: right;
        }
        .total-simran{
            margin-right: 20px;
        }
        .simran-block{
            display:flex;
            justify-content: space-between;
            margin-top: 15px;
        }
        .marginTop{
            margin-top: 55px;
        }
        .simran-label{
            position: relative;
            bottom: 28px;
            right: 46px;
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