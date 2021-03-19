import React, { useEffect, useState, useContext } from 'react';
import NavBar from './NavBarBack';
import { results } from '../utils/apis';
import AccountContext from '../contexts/accountContext';
import { simranAPI } from '../utils/apis'; 


const SimranReport = () => {
    const [siranData, setSiranData] = useState([]);
    const { account: { setRoute, toggleShowLoader } } = useContext(AccountContext);

    async function getAllSimran(){
        const userid = localStorage.getItem('userId');
        const authpassword = localStorage.getItem('authpassword');
        toggleShowLoader(true);
        const res = await simranAPI.getSimrans(userid, authpassword, 0);
        if(res){
            setSiranData(res);
        }
        toggleShowLoader(false);
    }
    useEffect(() => {
        getAllSimran();
    },[]);
    
    const deleteSimran = async(id) => {
        const userid = localStorage.getItem('userId');
        const authpassword = localStorage.getItem('authpassword');
        toggleShowLoader(true);
        const res = await simranAPI.deleteSimrans(userid, authpassword, id);
        if(res.success){
            getAllSimran();
        }
        toggleShowLoader(false);
    }

    return(
        <div>
        <div>
            <NavBar prevRoute="addSimran" />
            <div className="simran-container">
                {siranData && siranData.map((data) => (
                    <div className="simran-block">
                        <p>{data.simran_time}</p>
                            <p>{data.simrandate}<img src="./static/img/delete.svg" className="simran-delete" onClick={() => deleteSimran(data.report_id)} /></p>
                    </div>
                ))}
            </div>
        </div>
        <img className="plus-icon" src="/static/img/plus.png" onClick={() => setRoute('addSimran')} />
        <style jsx>
        {`
        .simran-heading{
            margin-top: 90px;
            text-align: center;
            color: #3D8EE1;
        }
        .simran-container{
            margin-top: 60px; 
            margin: 65px 10px 5px 10px;
        }
        .simran-block{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 10px 0px 10px;
            font-size: 16px;
            border: 1px solid #000;
            margin-top:10px;
        }
        .simran-date{
            margin-top: 1em;
            margin-bottom: 0px;
        }
        .simran-delete{
            height: 25px;
            width: 25px;
            margin-left: 10px;
        }
        `}
        </style>
        </div>
    );
}
export default SimranReport;