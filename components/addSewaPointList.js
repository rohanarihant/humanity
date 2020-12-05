import React, { useContext } from 'react';
import AccountContext from '../contexts/accountContext';
import NavBar from './NavBarBack';


const PointList = () => {
    const { account: { sewaPointList } } = useContext(AccountContext);
    const getGradientColor = (sewaCat) => {
        if(sewaCat === 'youtube'){
            return 'linear-gradient(315deg, #3f0d12 0%, #a71d31 74%)';
        }else if(sewaCat === 'facebook'){
            return 'linear-gradient(315deg, #63a4ff 0%, #83eaf1 74%)';
        }else if(sewaCat === 'browser'){
            return 'linear-gradient(315deg, #90d5ec 0%, #fc575e 74%)';
        }else if(sewaCat === 'Instagram'){
            return 'linear-gradient(315deg, #7f53ac 0%, #647dee 74%)';
        }else if(sewaCat === 'whatsapp'){
            return 'linear-gradient(315deg, #63d471 0%, #233329 74%)';
        }else if(sewaCat === 'twitter'){
            return 'linear-gradient(315deg, #00b712 0%, #5aff15 74%)';
        }else{
            return 'linear-gradient(315deg, #bdd4e7 0%, #8693ab 74%)';
        }
        
    }
    return (
        <div>
            <NavBar prevRoute="sewa" />
            <div style={{ marginTop: 60 }}>
                {
                    sewaPointList && sewaPointList.map((detail, index) => {
                        return (
                            <div style={{ marginTop: 20, backgroundColor: detail.sewacategory_color }} id={`profile${index}`} class="profile">
                                <div >
                                    <div class="profile-info-wrapper">
                                        <p class="profile-name-label" style={{ marginBottom: 0 }}>{detail.sewacategory_platform}</p>
                                        <div class='social-links'>
                                            {detail.sewacategory_detail}
                                        </div>
                                        <div className="sewa-category">
                                            <p>Points:- {detail.sewacategory_point}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default PointList;