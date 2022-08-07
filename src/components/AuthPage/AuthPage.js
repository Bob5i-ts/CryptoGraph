import { NavLink, Route } from "react-router-dom";
import SimpleWrapper from "../SimpleWrapper/SimpleWrapper";
import { LoginForm, SignupForm } from './Forms';
import './AuthPage.css';

function AuthPage() {
    return (
        <SimpleWrapper>
            <main>
                <div className="forms-container">
                    <nav className="auth-forms-nav">
                        <NavLink to="/auth/login" className="login-tab">Login</NavLink>
                        <NavLink to="/auth/register" className="reg-tab">Register</NavLink>
                    </nav>
                
                    <Route path="/auth/login" component={LoginForm}/>
                    <Route path="/auth/register" component={SignupForm}/>
                </div>
            </main>
        </SimpleWrapper>
    );
}

export default AuthPage;