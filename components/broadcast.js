import React, { useEffect, useState, useContext } from 'react';
import NavBar from './NavBarBack';
import { broadcast } from '../utils/apis';
import { getTimeInterval } from '../utils/commonMethods';
import AccountContext from '../contexts/accountContext';

const Broadcast = () => {

    const [allBroadcasts, setAllBroadcasts] = useState([]);
    const {account: { toggleShowLoader, setRoute}} = useContext(AccountContext);
    useEffect(() => {
        async function getAllBroadcast() {
            toggleShowLoader(true);
            const userid = localStorage.getItem('userId');
            const authpassword = localStorage.getItem('authpassword');
            const power = localStorage.getItem('power');
            const memberDetaildet = JSON.parse(localStorage.getItem('MemberDetaildet'));
            const usrgen = memberDetaildet && memberDetaildet[0].usrgen;
            const stateid = memberDetaildet && memberDetaildet[0].usrstaid;
            const res = await broadcast.getAllBroadcast(userid, authpassword, userid, power, usrgen.toLowerCase(), stateid);
            res.success && setAllBroadcasts(res.broadmessage);
            toggleShowLoader(false);
        }
        getAllBroadcast();
    }, []);

    const addDefaultSrc = (ev) => {
        ev.target.src = './static/img/head.png';
    }
    return (
        <div>
            <NavBar prevRoute="home" />
            <div style={{marginTop: 70}}>
                {allBroadcasts && allBroadcasts.map(brod => {
                    return (
                        <div className="broadcast-container">
                            <div className="broadcast-top">
                                <img src={`http://humanity.rubrutech.com/profileimage/${brod.msgby}.jpg`} className="broadcast-user-image" onError={(e) => addDefaultSrc(e)} />
                                <strong className="broadcast-text">{brod.msgname}</strong>
                            </div>
                                <div className="broadcast-user-detail">
                                    <p className="broadcast-schedule">{brod.msgdes}</p>
                                    </div>
                            <p className="broadcast-date broadcast-text">{getTimeInterval(new Date(brod.msgdate))}</p>
                        </div>)
                })}
                {allBroadcasts && allBroadcasts.length === 0 && <h4 className="broadcast-error">No Broadcast</h4>}
                <img className="plus-icon" src="/static/img/plus.png" onClick={() => setRoute('addBroadcast')} />
            </div>
            <style jsx>
        {`
      .broadcast-container{
        padding: 20px;
        border: 1px solid;
        padding: 10px;
        box-shadow: 0px 5px #888888;
        margin: 10px;
      }
      .broadcast-top{
        display: flex;
        justify-content: flex-start;
        font-size: 16px;
      }
      .broadcast-user-detail{
        margin-left: 10px;
      }
      .broadcast-schedule{
        font-size: 15px;
        margin-bottom:0px;
        white-space: pre-line;
      }
      .broadcast-user-image{
        height: 50px;
        border-radius: 50%;
      }
      .broadcast-text{
        margin-bottom: 0rem;
        margin: 10px 10px;
        font-size: 16px;
      }
      .broadcast-date{
        text-align: right;
        font-weight: 500;
      }
      .broadcast-error{
        text-align: center;
      }
      `}
      </style>
        </div>
    );
};
export default Broadcast;