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
