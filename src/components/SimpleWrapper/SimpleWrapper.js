import { footer, logo } from '../MainWrapper/Common';
import './SimpleWrapper.css';

function SimpleWrapper(props) {
    return (
        <div className='smp-container'>
            <header className='smp-header'>
                {logo}
            </header>
            {props.children}
            {footer}
        </div>
    );
}

export default SimpleWrapper;