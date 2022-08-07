import { useEffect, useRef } from 'react';
import { Route } from 'react-router-dom';
import { GuestHeader } from '../MainWrapper/Headers';
import { footer } from '../MainWrapper/Elements';
import { AllPosts } from '../Discussions/Discussions';
import './HomePage.css';

function Markets() {
    const tickersRef = useRef();
    const homeChartRef = useRef();
    useEffect(() => {
        const tickerConfig = {
        "symbols": [
        {
          "description": "Algorand",
          "proName": "BINANCE:ALGOUSDT"
        },
        {
          "description": "Cosmos",
          "proName": "BINANCE:ATOMUSDT"
        },
        {
          "description": "Ethereum",
          "proName": "BINANCE:ETHUSDT"
        },
        {
          "description": "Ripple",
          "proName": "BINANCE:XRPUSDT"
        },
        {
          "description": "Litecoin",
          "proName": "BINANCE:LTCUSDT"
        }
        ],
        "colorTheme": "light",
        "isTransparent": false,
        "showSymbolLogo": true,
        "locale": "en"
        }
        const script = document.createElement('script');
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-tickers.js";
        script.async = true;
        script.replaceChildren(JSON.stringify(tickerConfig));
        tickersRef.current.appendChild(script);
        const homeChartConfig = {
              "symbols": [
                ["btc", "BINANCE:BTCUSDT|1D"],
                ["eth", "BINANCE:ETHUSDT|1D"],
                ["xrp", "BINANCE:XRPUSDT|1D"]
              ],
              "chartOnly": false,
              "width": "100%",
              "height": "600px",
              "locale": "en",
              "colorTheme": "light",
              "isTransparent": false,
              "autosize": true,
              "showVolume": false,
              "hideDateRanges": false,
              "scalePosition": "right",
              "scaleMode": "Normal",
              "fontFamily": "Arial, sans-serif",
              "noTimeScale": false,
              "valuesTracking": "1",
              "chartType": "area",
              "fontColor": "#787b86",
              "gridLineColor": "rgba(42, 46, 57, 0.06)",
              "lineColor": "#2962ff",
              "topColor": "rgba(41, 98, 255, 0.3)",
              "bottomColor": "rgba(41, 98, 255, 0)",
              "lineWidth": 2,
              "container_id": "tradingview_home"
        }
        const script2 = document.createElement('script');
        const newChart = `new TradingView.MediumWidget(${JSON.stringify(homeChartConfig)});`
        script2.replaceChildren(newChart);
        homeChartRef.current.appendChild(script2);
    }, [])

    return (
        <>
            <div className="tradingview-widget-container" ref={tickersRef}>
                <div className="tradingview-widget-container__widget"></div>
                <div className="tradingview-widget-copyright">
                    <a href="https://www.tradingview.com" rel="noreferrer" target="_blank">
                        <span className="blue-text">Quotes</span>
                    </a> by TradingView
                </div>
            </div>
            <div className="tradingview-widget-container" ref={homeChartRef}>
                <div id="tradingview_home"></div>
                <div className="tradingview-widget-copyright">
                    <a href="https://www.tradingview.com" rel="noreferrer" target="_blank">
                        <span className="blue-text">Chart</span>
                    </a> by TradingView
                </div>
            </div>
        </>
    )
}

function Events() {
    const eventsConfig = {
        "feedMode": "all_symbols",
        "colorTheme": "light",
        "isTransparent": false,
        "displayMode": "regular",
        "width": "650",
        "height": "800",
        "locale": "en"
    }
    const eventsRef = useRef()
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
        script.async = true;
        script.replaceChildren(JSON.stringify(eventsConfig));
        eventsRef.current.appendChild(script);
    });
    return (
        <div className="tradingview-widget-container events" ref={eventsRef}>
            <div className="tradingview-widget-container__widget"></div>
            <div className="tradingview-widget-copyright">
                <a href="https://www.tradingview.com/key-events/" rel="noreferrer" target="_blank">
                    <span className="blue-text">Daily news roundup</span>
                </a> by TradingView
            </div>
        </div>
    )
}

function HomePage() {
    return (
        <div className="home-container">
            <GuestHeader />
                <Route path="/home" exact component={Markets} />
                <Route path="/home/events" component={Events} />
                <Route path="/home/forum" component={AllPosts} />
            {footer}
        </div>
    )
}

export default HomePage;