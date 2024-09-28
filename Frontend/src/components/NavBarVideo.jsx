
import React from 'react';
import Flame from "../Resources/Flame.mp4";
import './NavbarVideo.css';
function NavbarVideo() {
    return (
        <>
            <div className='carVideo' style={{"margin":"0px","padding":"0px"}}>
                <video loop autoPlay muted>
                    <source src={Flame} type="video/mp4" />
                </video>
            </div>
        </>
    );
}

export default NavbarVideo;
