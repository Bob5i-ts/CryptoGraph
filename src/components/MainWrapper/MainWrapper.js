import { footer } from './Common';
import { UserHeader } from './Headers';
import './MainWrapper.css';

function MainWrapper(props) {
    return (
        <div className="main-container">
            <UserHeader />
            {props.children}
            {footer}
        </div>
    );
}

export default MainWrapper;