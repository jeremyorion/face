import React from 'react'
import Tilt from 'react-tilt';
import './Logo.css'

const Logo = () => {
    return (
     <div className = 'ma4 mt0'>
         <Tilt className="Tilt" options={{ max : 50 }} style={{ height: 150, width: 150 }} >
            <div className="Tilt-inner pa3">
                <img 
                src="https://img.icons8.com/carbon-copy/100/000000/face-id.png" 
                alt="face logo"
                className="logo"
                />
            </div>
        </Tilt>
     </div>
    );
}

export default Logo;