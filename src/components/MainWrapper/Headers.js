import { signOut } from 'firebase/auth';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useAuth } from 'reactfire';
import { logo, ProfileImage } from './Common';

export function GuestHeader() {
    return (
        <>
            <header className="guest-header">
                {logo}
                <div className="auth-buttons">
                    <Link to="/auth/login" className="login-btn">Login</Link>
                    <Link to="/auth/register" className="reg-btn">Register</Link>
                </div>
            </header>
            <nav className="home-nav">
                <NavLink to="/home" className="home-tab" exact>Markets</NavLink>
                <NavLink to="/home/events" className="home-tab">Events</NavLink>
                <NavLink to="/home/forum" className="home-tab">Forum</NavLink>
            </nav>
        </>
    );
}

export function UserHeader() {
    const auth = useAuth();
    function logoutHandler() {
        signOut(auth)
            .catch(err => alert(err.message))
    }

    return (
        <>
            <header className="user-header">
                {logo}
                <div>
                    <Link to="/profile">
                        {auth.currentUser.displayName}
                    </Link>
                    <button onClick={logoutHandler}>Logout</button>
                </div>
            </header>
            <nav className="main-nav">
                <NavLink to="/prices">Prices</NavLink>
                <NavLink to="/assets">Portfolio</NavLink>
                <NavLink to="/news">News</NavLink>
                <NavLink to="/find-atm">Find ATM</NavLink>
                <NavLink to="/community">Community</NavLink>
            </nav>
        </>
    );
}