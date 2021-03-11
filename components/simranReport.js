import React, { useEffect, useState, useContext } from 'react';
import NavBar from './NavBarBack';
import { results } from '../utils/apis';
import AccountContext from '../contexts/accountContext';


const SimranReport = () => {
    return(
        <div>
        <div>
            <NavBar prevRoute="addSimran" />
            <div className="simran-container">
                <div className="simran-block">
                    <p>0.10 hr</p>
                    {/* <div className="simran-date"> */}
                        <p>11 Mar 21 <img src="./static/img/delete.svg" className="simran-delete" /></p>
                        
                    {/* </div> */}
                </div>
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
            margin-top: 60px;
            border: 1px solid #000;
            margin: 65px 10px 5px 10px;
        }
        .simran-block{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 10px 0px 10px;
            font-size: 16px;
        }
        .simran-date{
            margin-top: 1em;
            margin-bottom: 0px;
        }
        .simran-delete{
            height: 25px;
            width: 25px;
        }
        `}
        </style>
        </div>
    );
}
export default SimranReport;