import React from 'react'
import './FaceRecognition.css'

const FaceRecognition = ( { imageURL, box } ) => {    
    return (
     <div className="center ma">
        <div className="absolute mt2">

            {/* // Image that was submitted */}
            <img id='inputimage' src={ imageURL } alt="" width="500px" height="auto" />
            
            {/* // Box that overlays image. Styles work in combination with display: absolute set in CSS */}
            <div className="bounding-box" style={{top: box.top, right: box.right, bottom: box.bottom, left: box.left}} ></div>
        
        </div>
     </div>
    );
}

export default FaceRecognition;