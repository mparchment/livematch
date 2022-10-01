import '../stylesheets/Landing.css'
import LogoPNG from '../stylesheets/logo.png'
import { Button } from '@mui/material'

function Landing() {
    return (
        <div className="landing-container">
            <div className="login-container">
                <div className="logo">
                    <h2>Let's Start a Ruckus!</h2>
                </div>
                <div className="buttons">
                    <button>Log In</button>
                    <button>Sign Up</button>
                </div>
            </div>
        </div>
    );
}

export default Landing;