import React from 'react';
import {API_URLS} from '../constants/url';
import NavBarBack from './NavBarBack';

const Howtowork = () => {
    const power = localStorage.getItem('power');
    return(
    <div style={{marginTop: 0}}>
        <NavBarBack />
        <iframe src={`${API_URLS}/howtowork/${power}.html`} className="iframe-class" />
    </div>
)}
export default Howtowork;