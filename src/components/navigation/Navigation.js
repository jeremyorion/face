import React from 'react'
import './Navigation.css'

const Navigation = ( { onRouteChange, isSignedIn } ) => {
    
    if (isSignedIn) {
    return (
        <nav className="navigation">
            <p 
            className="f3 link dim black underline pa3 pointer"
            onClick = {() => onRouteChange ('signin') }
            >Sign Out</p>
        </nav>
    );} 
    else {
        return (
            <nav className="navigation">
                <p 
                className="f3 link dim black underline pa3 pointer"
                onClick = {() => onRouteChange ('register') }
                >Register</p>
                <p 
                className="f3 link dim black underline pa3 pointer"
                onClick = {() => onRouteChange ('signin') }
                >Sign In</p>
            </nav>
        );
    }
}

export default Navigation;