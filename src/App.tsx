import styles from './styles';

import { uniswapLogo } from './assets';
import { Exchange, WalletButton } from './components';

function App() {
  // return (
  //   <>
  //     <div>
  //       <label>From:</label>
  //       <select
  //         value={fromCurrency.id}
  //         onChange={handleFromCurrencyChange}
  //       >
  //         <option value="bitcoin">BTC</option>
  //         <option value="ethereum">ETH</option>
  //         <option value="litecoin">LTC</option>
  //       </select>
  //       <input
  //         type="number"
  //         value={fromAmount}
  //         onChange={handleFromAmountChange}
  //       />
  //     </div>
  //     <div>
  //       <label>To:</label>
  //       <select
  //         value={toCurrency.id}
  //         onChange={handleToCurrencyChange}
  //       >
  //         <option value="usd">USD</option>
  //         <option value="eur">EUR</option>
  //         <option value="gbp">GBP</option>
  //       </select>
  //       <input
  //         type="number"
  //         value={toAmount}
  //         onChange={handleToAmountChange}
  //       />
  //     </div>
  //     <div>
  //       <p>
  //
  //       </p>
  //     </div>
  //   </>
  // );

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <header className={styles.header}>
          <img
            src={uniswapLogo}
            alt="uniswap-logo"
            className="w-16 h-16 object-contain"
          />
          <WalletButton />
        </header>

        <div className={styles.exchangeContainer}>
          <h1 className={styles.headTitle}>Uniswap 3.0</h1>
          <p className={styles.subTitle}>
            Exchange tokens in seconds
          </p>

          <div className={styles.exchangeBoxWrapper}>
            <div className={styles.exchangeBox}>
              <div className="pink_gradient" />
              <div className={styles.exchange}>
                <Exchange />
              </div>
              <div className="blue_gradient" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
