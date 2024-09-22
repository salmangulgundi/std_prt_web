import React, { useState } from "react";
import './registrationPage.css'
import { FaUserTie } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { RiLockPasswordFill } from "react-icons/ri";
import { GoArrowLeft } from "react-icons/go";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { MdMarkEmailRead } from "react-icons/md";

export default function RegistrationPage() {

    const [onFocusEmail, setonFocusEmail] = useState(false);
    const [onFocusPassword, setonFocusPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
                        <button className="button" type="submit">SIGN IN</button>
                    </div>
                </div>

            </div>

            <div className="w-50 justify-content-center align-items-center">
                <div className="container">
                    <div className="insideContainer">
                        <h1 className="font d-flex justify-content-center align-items-center">
                            <span class="typing-effect">Hello, Friend!</span>
                        </h1>

                        <p className="fontP">Welcome to application onboard <br />Enter your personal details and start journey with us!</p>
                        <p className="direction d-flex justify-content-center align-items-center">{<GoArrowLeft />}</p>
                    </div>
                </div>

            </div>
        </section>
    )
}