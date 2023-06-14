import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from 'reactfire';
import { Spinner } from '../MainWrapper/Elements';

function formatErr(err) {
    let msg = err.message.slice(22,-2).replaceAll('-',' ');
    msg = msg[0].toUpperCase() + msg.slice(1);
    return msg;
}

export function LoginForm({history, setErrors}) {
    useEffect(() => {
        document.title = 'Log in to CryptoGraph';
    });
    const auth = useAuth();
    const email = useRef();
    const pass = useRef();
    const [loading, setLoading] = useState(false);

    function handleLogin(ev) {
        ev.preventDefault();
        setLoading(true);
        signInWithEmailAndPassword(auth, email.current.value, pass.current.value)
            .then(() => {
                history.push('/prices')
            })
            .catch(err => { setErrors([formatErr(err)]); setLoading(false); });
    }

    return (
        <form className="auth-form" onSubmit={handleLogin}>
            <label> Email
                <input type="email" ref={email}/>
            </label>
            <label> Password
                <input type="password" ref={pass} />
            </label>
            <button type="submit" className="login-submit-btn" disabled={loading}>Log in</button>
            { loading && <Spinner/> }
        </form>
    );
}

export function SignupForm({history, setErrors}) {
    useEffect(() => { document.title = 'Sign up for CryptoGraph'; });
    const auth = useAuth();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [rePass, setRePass] = useState('');
    const [loading, setLoading] = useState(false);
    const emailRegex = /^[a-z0-9+_.-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    let errList;

    function signupHandler(ev) {
        ev.preventDefault();
        setLoading(true);
        errList = [];
        if ([email,username,pass,rePass].some(x => !x)) errList.push('All fields are required');
        if (!emailRegex.test(email.toLowerCase())) errList.push('Enter valid email');
        if (pass && pass.length < 6) errList.push('Password must be at least 6 characters');
        if (pass !== rePass) errList.push('Passwords do not match');
        if (errList.length > 0) {
            setErrors(errList);
            return setLoading(false);
        } else setErrors(null)

        createUserWithEmailAndPassword(auth, email, pass)
            .then(userData => {
                updateProfile(userData.user, { displayName: username })
                    .then(() => history.push('/prices/binance/btc'))
                    // .catch(err => alert(err));
            }).catch(err => { errList.push(formatErr(err)); setErrors(errList); setLoading(false); console.log(err);});
    }

    return (
        <form className="auth-form" onSubmit={signupHandler}>
            <label> Email
                <input type="email" placeholder="user@example.com" value={email} onChange={ev => setEmail(ev.target.value)} />
            </label>
            <label> Username
                <input type="text" value={username} onChange={ev => setUsername(ev.target.value)} />
            </label>
            <label> Password
                <input type="password" value={pass} onChange={ev => setPass(ev.target.value)} />
            </label>
            <label> Repeat password
                <input type="password" value={rePass} onChange={ev => setRePass(ev.target.value)} />
            </label>
            <button type="submit" className="reg-submit-btn" disabled={loading}>Register</button>
            { loading && <Spinner/> }
        </form>
    );
}