import React, { useEffect, useState, useContext } from 'react';
import NavBar from './NavBarBack';
import { results } from '../utils/apis';
import AccountContext from '../contexts/accountContext';


const AddSimran = () => {
    const {account: { setRoute}} = useContext(AccountContext);

    return(
        <div>
        <div>
            <NavBar prevRoute="home" />

            <h5 style={{marginTop: 100}} className="simran-heading" onClick={() => setRoute('simranReport')}>Simran Report</h5>

            <div className="simran-container">
                <p className="">अगर आप ब्लॉक में सिमरन या अखंड सिमरन की रिपोर्ट दे रहे हैं। तो उसे वैसे ही देते रहे.</p>
                <div className="simran-block">
                    <p>सिमरन किस तारीख में किया</p>
                    <input type="date" />
                </div>
                <div className="simran-block">
                    <p>कुल कितना सिमरन किया</p>
                    <input type="date" />
                </div>
                <p className="iconSwitch" onClick={() => checkForm()}>Save</p>
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
        }
        `}
        </style>
        </div>
    );
}
export default AddSimran;