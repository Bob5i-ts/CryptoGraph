import { useEffect, useState } from 'react';
import { MainToolbar } from '../MainWrapper/Elements';
import { NavLink } from 'react-router-dom';

function News() {
    const [news, setNews] = useState();
    const [newsCount, setNewsCount] = useState('10');
    useEffect(() => {
        document.title = 'News | CryptoGraph';

    });
    return (
        <div className='news'>
            <MainToolbar>
                <div className='news-sources'>
                    <NavLink to='/news/cointelegraph' className='news-link'>CoinTelegraph</NavLink>
                    <NavLink to='/news/bitcoinist' className='news-link'>Bitcoinist</NavLink>
                </div>
                <div className='news-view'>
                    <label htmlFor='news-count'>Show:</label>
                    <select id='news-count' value={newsCount} onChange={ev => setNewsCount(ev.target.value)}>
                        <option value='10'>10</option>
                        <option value='20'>20</option>
                        <option value='30'>30</option>
                    </select>
                    <button>Refresh</button>
                </div>
            </MainToolbar>

        </div>
    )
}

export default News;