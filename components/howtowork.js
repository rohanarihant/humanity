import React from 'react';
import {API_URLS} from '../constants/url';
import NavBarBack from './NavBarBack';

const Howtowork = () => {
    const power = localStorage.getItem('power');
    return(
    <div style={{marginTop: 0}}>
        <NavBarBack />
        <iframe src={`${API_URLS}/howtowork/${power}.html`} className="iframe-class" />
    <style jsx>
        {`
            .iframe-class{
                background:url(./static/img/loader.svg);
                background-repeat: no-repeat;
                position: absolute;
                z-index: 60;
                margin-top:100px;
                text-align:center;
            }
        `}
    </style>
    </div>
)}
export default Howtowork;