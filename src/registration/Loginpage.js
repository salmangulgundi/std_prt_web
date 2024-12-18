import React, { useState } from "react";
import './Loginpage.css'
import { FaUserTie } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { RiLockPasswordFill } from "react-icons/ri";
import { GoArrowLeft } from "react-icons/go";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { MdMarkEmailRead } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Loginpage() {

    const [onFocusEmail, setonFocusEmail] = useState(false);
    const [onFocusPassword, setonFocusPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


   
    const handleLogin = async () => {
        try {
            console.log(email, password);
            if(email == '' && password == ''){
                alert("Please fill the details")
            }
            const response = await axios.post('http://localhost:8443/api/adminLogin', {
                email,
                password,
            });
    
            if (response.status === 200) {
                navigate('/dashboard'); 
            } else {
                alert("Invalid credentials"); 
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred. Please try again.");
        }
    };
    

    const validEmail = email.includes('@');
    const validPassword = password.length > 6 &&
        /[A-Z]/.test(password) && // At least one uppercase letter
        /[!@#$%^&*(),.?":{}|<>]/.test(password); // At least one special character


    return (
        <section className="section p-5">
            <div className="formbox w-50">
                <div className="insideform">
                    <div className="heading">
                        <h2 className="head">SIGN  IN</h2>
                        <div className="logos">
                            <p className="logosizing">{<FaInstagram />}</p>
                            <p className="logosizing">{<FaLinkedin />}</p>
                            <p className="logosizing"> {<MdMarkEmailRead />}</p>
                        </div>
                    </div>

                    <div className="emailsection mb-2">
                        <div className="brd d-flex justify-content-center align-items-center">
                            <span className="color">{<FaUserTie />}</span>
                            <input type="email"
                                placeholder="name@example.com"
                                onFocus={() => setonFocusEmail(true)}
                                onBlur={() => setonFocusEmail(false)}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            {onFocusEmail ? (
                                validEmail ? (<span className="ticksuccess">{<SiTicktick />}</span>) : (<span className="tickfailure">{<SiTicktick />}</span>)
                            ) : <span className="color">{<SiTicktick />}</span>}
                        </div>
                    </div>

                    <div className="passwordSection mb-2">
                        <div className="brd d-flex justify-content-center align-items-center">
                            <span className="color">{<RiLockPasswordFill />}</span>
                            <input
                                type="password"
                                placeholder="password"
                                onFocus={() => setonFocusPassword(true)}
                                onBlur={() => setonFocusPassword(false)}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {onFocusPassword ? (
                                validPassword ? (<span className="ticksuccess">{<SiTicktick />}</span>) : (<span className="tickfailure">{<SiTicktick />}</span>)
                            ) : <span className="color">{<SiTicktick />}</span>}
                        </div>
                    </div>
                    <div className="buttonSection">
                        <button className="button" type="submit" onClick={handleLogin}>SIGN IN</button>
                    </div>
                </div>

            </div>

            <div className="w-50 justify-content-center align-items-center">
                <div className="container">
                    <div className="insideContainer">
                        <h1 className="font d-flex justify-content-center align-items-center">
                            <span class="typing-effect">Hello, Admin!</span>
                        </h1>

                        <p className="fontP">Welcome to application <br />Enter your personal details and start journey !</p>
                        <p className="direction d-flex justify-content-center align-items-center">{<GoArrowLeft />}</p>
                    </div>
                </div>

            </div>
        </section>
    )
}