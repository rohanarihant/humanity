import React, { useContext } from 'react';
import AccountContext from '../contexts/accountContext';
import NavBar from './NavBarBack';


const PointList = () => {
    const { account: { sewaPointList } } = useContext(AccountContext);
    return (
        <div>
            <NavBar />
            <div style={{ marginTop: 60 }}>
                {
                    sewaPointList && sewaPointList.map((detail, index) => {
                        console.log(detail.sewacategory_platform, 'detail.sewacategory_platform')
                        // if (detail.sewacategory_platform === '') {
                        return (
                            <div style={{ marginTop: 20 }} id={`profile${index}`} class="profile">
                                <div >
                                    <div class="profile-info-wrapper">
                                        <p class="profile-name-label" style={{ marginBottom: 0 }}>{detail.sewacategory_platform}</p>
                                        <div class='social-links'>
                                            {detail.sewacategory_title}
                                        </div>
                                        <div className="sewa-category">
                                            <p>Points:- {detail.sewacategory_point}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                        // }
                    })
                }
            </div>
        </div>
    );
}

export default PointList;