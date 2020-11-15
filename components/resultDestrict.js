import React, { useEffect, useState, useContext } from 'react';
import NavBar from './NavBarBack';
import { results } from '../utils/apis';
import AccountContext from '../contexts/accountContext';


const SewaResultsDestrict = () => {
    const [stateResult, setStateResult] = useState([]);
    const [categoryListResult, setCategoryListResult] = useState([]);
    const [resultDate, setResultDate] = useState('');
    const {account: { toggleShowLoader, selectedState, setSelectedDestrict, setRoute, selectedStateName, setSelectedDestrictName }} = useContext(AccountContext);
    const cateArray = [];

    useEffect(() => {
        async function getResultPoints() {
            toggleShowLoader(true);
            const userid = localStorage.getItem('userId');
            const authpassword = localStorage.getItem('authpassword');
            const power = JSON.parse(localStorage.getItem('power'));
            const MemberDetaildet = JSON.parse(localStorage.getItem('MemberDetaildet'));
            const countryId = MemberDetaildet && MemberDetaildet[0].usrcouid;
            const stateId = MemberDetaildet && MemberDetaildet[0].usrstaid;
            const distId = MemberDetaildet && MemberDetaildet[0].usrdstid;
            const blockId = MemberDetaildet && MemberDetaildet[0].usrblkid;
            const gender = MemberDetaildet && MemberDetaildet[0].usrgen;
            const res = await results.getDistrictPointResults(userid, authpassword, power, countryId, stateId, distId, blockId, gender, selectedState);
            if (res.success) {
                setStateResult(res.state_result);
                setCategoryListResult(res.catedata);
                setResultDate(res.result_date);
            }
            toggleShowLoader(false);
        }
        getResultPoints();
    }, []);

    const openDestrictResult = (state) => {
        setSelectedDestrictName(state.state_name);
        setSelectedDestrict(state.result_state_id);
        setRoute('sewaResultsBlock');
    } 
    return (
        <div className="result-container">
            <NavBar prevRoute="sewaResults" />
            <h2 className="result-date">{resultDate}</h2>
            <table>
                <tr>
                    <th colspan="3" className="states-heading">{selectedStateName} State</th>
                </tr>
                <tr>
                    <th>State</th>
                    <th>Total Points</th>
                    <th>Members</th>
                </tr>
                {stateResult && stateResult.map(state => (<tr onClick={() => openDestrictResult(state)}>
                    <td>{state.state_name}</td>
                    <td>{state.result_total}</td>
                    <td>{state.total_member}</td>
                </tr>))}
            </table>
            <div>
                <p className="social-media">Social Media</p>
                {
                    categoryListResult.map(cat => {
                        if (cateArray.indexOf(cat.media) === -1) {
                            cateArray.push(cat.media);
                        } else {
                            delete cat.media;
                        }
                        return (
                            <div>
                                {cat.media
                                    && <div className="social-media-title" style={{ backgroundColor: cat.media_color }}>{cat.media}</div>}
                                <div className="social-media-state">
                                    <span>{cat.statename}</span>
                                    <span>{cat.points}</span>
                                </div>
                            </div>)
                    })
                }
            </div>
            <hr />
            <style jsx>
                {`
        .result-date{
            background-color: #f2f2f2;
            text-align: center;
            font-size: 25px;
        }
        .result-container{
            margin-top: 70px;
            padding: 10px;
        }
        .states-heading{
            text-align: center;
            font-size: 18px;
            font-weight: 700;
        }
        table {
            border-collapse: collapse;
            width: 100%;
          }
          
          th, td {
            text-align: left;
            padding: 8px;
          }
          
          tr:nth-child(even){background-color: #f2f2f2}
          
          th {
            background-color: #4CAF50;
            color: white;
          }
        .social-media{
            margin-top: 20px;
            text-align: center;
            margin-bottom: 1rem;
            color: #673ab7;
            font-size: 20px;
        }
        .social-media-title{
            padding: 10px;
            font-size: 17px;
            color: #fff;        
        }
        .social-media-state{
            display: flex;
            justify-content: space-between;
            padding: 10px;
        }
        `}
            </style>
        </div>
    )
}

export default SewaResultsDestrict;