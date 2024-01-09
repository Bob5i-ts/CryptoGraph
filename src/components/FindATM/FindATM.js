import MainWrapper from '../MainWrapper/MainWrapper';
import { MainToolbar } from '../MainWrapper/Elements';
import { useEffect, useRef, useState } from 'react';
import './FindATM.css';

function FindATM() {
    useEffect(() => document.title = 'Find ATM | CryptoGraph');

    const [query, setQuery] = useState('ATMs');
    const searchRef = useRef();
    const atmRadioRef = useRef();
    const btcAtmRadioRef = useRef();

    function searchAtms() {
        const atmType = atmRadioRef.current.checked
            ? atmRadioRef.current.value
            : btcAtmRadioRef.current.value;
        setQuery(atmType + ',' + searchRef.current.value);
    }
    return (
        <MainWrapper>
            <MainToolbar>
                <input type='search' id='atm-input' name='atm-search' placeholder='Location' ref={searchRef}/>
                <div>
                    <input type='radio' id='atm-radio' name='atm-type' value='ATMs' defaultChecked ref={atmRadioRef}/>
                    <label htmlFor='atm-radio'>ATMs</label>
                    <input type='radio' id='btc-atm-radio' name='atm-type' value='BTC+ATMs' ref={btcAtmRadioRef}/>
                    <label htmlFor='btc-atm-radio'>Crypto ATMs</label>
                </div>
                <button onClick={searchAtms}>Search</button>
            </MainToolbar>

            <iframe className='map-container' loading='lazy' allowFullScreen
                referrerPolicy='no-referrer-when-downgrade' title='g-map'
                src={'https://www.google.com/maps/embed/v1/search?key=' + process.env.REACT_APP_MAPS_API_KEY + '&q=' + query}
            >
            </iframe>
        </MainWrapper>
    );
}

export default FindATM;