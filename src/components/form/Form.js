import React from 'react'
import './Form.css'

const Form = ( { onInputChange, onSubmit } ) => {
    return (
     <div>
        <p className="f3">This Magic Brain will detect faces in your images. Give it a try.</p>
        <div className="center">
            <div className="pa4 br3 shadow-5 form center">
                
                <input type="text" className="f4 pa2 w-70 center" onChange={onInputChange} />
                <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onSubmit}>Detect</button>
            
            </div>
        </div>
     </div>
    );
}

export default Form;