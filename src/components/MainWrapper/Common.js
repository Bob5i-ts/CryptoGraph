import { getDownloadURL, ref } from 'firebase/storage';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const logo = (
    <Link to="/" className="logo">
        <span className="logo-pt-1">Crypto</span>
        <span className="logo-pt-2">Graph</span>
    </Link>
);

export const footer = (
    <footer className="main-footer">
        &copy; CryptoGraph 2021
    </footer>
);

export function MainToolbar(props) {
    return (
        <div className="main-toolbar">
            {props.children}
        </div>
    );
}

export function Spinner() {
    return (
        <span className="spinner"
            style={{ width: '30px', height: '30px' }}
        >
        </span>
    )
}

export function ProfileImage({ storage, uid }) {
    const [url, setUrl] = useState('/img/default.png');

    if (uid) getDownloadURL(ref(storage, `userPics/${uid}.png`))
        .then(imgURL => setUrl(imgURL))
        .catch(null);

    return <img src={url} alt='user' />;
}

