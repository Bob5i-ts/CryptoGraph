import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from 'reactfire';

export function LoginForm({history}) {
function formatErr(err) {
    let msg = err.message.slice(22,-2).replaceAll('-',' ');
    msg = msg[0].toUpperCase() + msg.slice(1);
    return msg;
}

    useEffect(() => {
        document.title = 'Log in to CryptoGraph';
    });

    const auth = useAuth();
    const email = useRef();
    const pass = useRef();

    function handleLogin(ev) {
        ev.preventDefault()
        signInWithEmailAndPassword(auth, email.current.value, pass.current.value)
            .then(() => {
                history.push('/prices')
            })
            .catch( err => alert(err) );
    }

    return (
        <form onSubmit={handleLogin} className="auth-form">
            <label> Email
                <input type="email" ref={email}/>
            </label>
            <label> Password
                <input type="password" ref={pass} />
            </label>
            <button type="submit" className="login-submit-btn">Login</button>
        </form>
    );
}

export function SignupForm({history}) {
    useEffect(() => {
        document.title = 'Sign up for CryptoGraph';
    });
    const auth = useAuth();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [rePass, setRePass] = useState('');

    function valEmail(ev) {
        setEmail(ev.target.value)
    }
    function valUsername(ev) {
        setUsername(ev.target.value)
    }
    function valPass(ev) {
        setPass(ev.target.value)
    }
    function valRePass(ev) {
        setRePass(ev.target.value)
    }

    function signupHandler(ev) {
        ev.preventDefault();
        createUserWithEmailAndPassword(auth, email, pass)
            .then(userData => {// console.log(userData);
                updateProfile(userData.user, { displayName: username })
                .then(() => history.replace('/prices'))
                // .catch(err => alert(err));
            }).catch(err => alert(err));
    }

    return (
        <form onSubmit={signupHandler} className="auth-form">
            <label>
                Email
                <input type="email" placeholder="user@domain.com" value={email} onChange={valEmail}/>
            </label>
            <label>
                Username
                <input type="text" value={username} onChange={valUsername}/>
            </label>
            <label>
                Password
                <input type="password" value={pass} onChange={valPass}/>
            </label>
            <label>
                Repeat password
                <input type="password" value={rePass} onChange={valRePass}/>
            </label>
            <button type="submit" className="reg-submit-btn">Register</button>
        </form>
    );
}