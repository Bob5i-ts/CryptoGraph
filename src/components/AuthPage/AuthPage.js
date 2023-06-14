import { useState } from 'react';
import { NavLink, Route } from "react-router-dom";
import SimpleWrapper from "../SimpleWrapper/SimpleWrapper";
import { LoginForm, SignupForm } from './Forms';
import './AuthPage.css';

function AuthPage() {
    const [errors, setErrors] = useState();
    function hideErrors() {errors && setErrors(null);}
    return (
        <SimpleWrapper>
            <div className="forms-container">
                <nav className="auth-forms-nav">
                    <NavLink to="/auth/login" className="login-tab" replace onClick={hideErrors}>Log in</NavLink>
                    <NavLink to="/auth/register" className="reg-tab" replace onClick={hideErrors}>Register</NavLink>
                </nav>

                <Route path="/auth/login" children={<LoginForm setErrors={setErrors}/>}/>
                <Route path="/auth/register" children={<SignupForm setErrors={setErrors}/>}/>
            </div>
            {errors &&
                <div className="err-container">
                    <ul>
                        {errors.map((er, idx) => <li key={idx}>{er}</li>)}
                    </ul>
                </div>
            }
        </SimpleWrapper>
    );
}

export default AuthPage;