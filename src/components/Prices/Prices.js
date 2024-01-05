import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { MainToolbar } from '../MainWrapper/Elements';
import MainWrapper from '../MainWrapper/MainWrapper';
import './Prices.css';

function Prices({ match }) {
    let exchange = match.params.exchange;
    let coin = match.params.coin;
    const chartRef = useRef();
    useEffect(() => {
        document.title = 'Prices | CryptoGraph'
        const chartConfig = {
            "autosize": true,
            "symbol": `${exchange}:${coin}USDT`,
            "interval": "D",
            "timezone": "Europe/Bucharest",
            "theme": "light",
            "style": "1",
            "locale": "en",
            "toolbar_bg": "#f1f3f6",
            "enable_publishing": false,
            "allow_symbol_change": true,
            "container_id": "tradingview_chart"
        }
        const script = document.createElement('script');
        const chart = `new TradingView.widget(${JSON.stringify(chartConfig)});`
        script.replaceChildren(chart);
        chartRef.current.appendChild(script);
        return () => {document.body.lastChild.remove(); sessionStorage.setItem('cgLastChart', match.url)}
    }, [exchange, coin])
    return (
        <MainWrapper>
            <MainToolbar>
                <span>Currency</span>
                <div className='coins-nav'>
                    <NavLink to={`/prices/${exchange}/btc`} className='coin-link'>BTC</NavLink>
                    <NavLink to={`/prices/${exchange}/eth`} className='coin-link'>ETH</NavLink>
                    <NavLink to={`/prices/${exchange}/xrp`} className='coin-link'>XRP</NavLink>
                    <NavLink to={`/prices/${exchange}/ltc`} className='coin-link'>LTC</NavLink>
                    <NavLink to={`/prices/${exchange}/atom`} className='coin-link'>ATOM</NavLink>
                    <NavLink to={`/prices/${exchange}/algo`} className='coin-link'>ALGO</NavLink>
                </div>
                <span>/USDT</span>
            </MainToolbar>
            <aside className='exchanges-nav'>
                <h3>Exchange</h3>
                <NavLink to={`/prices/binance/${coin}`} className='exchange-link'>
                    <img src='/img/binance.png' alt='' />
                    Binance
                </NavLink>
                <NavLink to={`/prices/coinbase/${coin}`} className='exchange-link'>
                    <img src='/img/coinbase.png' alt='' />
                    Coinbase
                </NavLink>
                <NavLink to={`/prices/kraken/${coin}`} className='exchange-link'>
                    <img src='/img/kraken.png' alt='' />
                    Kraken
                </NavLink>
                <NavLink to={`/prices/kucoin/${coin}`} className='exchange-link'>
                    <img src='/img/kucoin.png' alt='' />
                    KuCoin
                </NavLink>
                <NavLink to={`/prices/huobi/${coin}`} className='exchange-link'>
                    <img src='/img/huobi.png' alt='' />
                    Huobi
                </NavLink>
            </aside>
            <div className="tradingview-widget-container main-chart" ref={chartRef}>
                <div id="tradingview_chart"></div>
                <div className="tradingview-widget-copyright">
                    <a href="https://www.tradingview.com" rel="noreferrer" target="_blank">
                        <span className="blue-text">Chart</span>
                    </a> by TradingView
                </div>
            </div>
        </MainWrapper>
    );
}

export default Prices;