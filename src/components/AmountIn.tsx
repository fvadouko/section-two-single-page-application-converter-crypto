import { useState } from 'react';

import { chevronDown } from '../assets';
import { CRYPTO_CURRENCIES } from '../constants/cryptocurrencies';
import { ICryptoCurrency } from '../interfaces';
//import { useOnClickOutside } from '../utils';
import styles from '../styles';

interface AmountInProps {
  onChangeCurrency: (currency: ICryptoCurrency) => void;
  activeCryptoCurrency: ICryptoCurrency;
  fromAmount: string;
  onFromAmountChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const AmountIn = ({
  onChangeCurrency,
  activeCryptoCurrency,
  fromAmount,
  onFromAmountChange,
}: AmountInProps) => {
  const [showList, setShowList] = useState(false);

  return (
    <div className={styles.amountContainer}>
      <input
        placeholder="0"
        type="number"
        className={styles.amountInput}
        value={fromAmount}
        onChange={onFromAmountChange}
      />

      <div
        className="relative"
        onClick={() => setShowList(!showList)}
      >
        <button className={styles.currencyButton}>
          {activeCryptoCurrency.id}
          <img
            src={chevronDown}
            alt="cheveron-down"
            className={`w-4 h-4 object-contain ml-2 ${
              showList ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>

        {showList && (
          <ul className={styles.currencyList}>
            {Object.values(CRYPTO_CURRENCIES).map((crypCurrency) => (
              <li
                className={`${styles.currencyListItem} ${
                  activeCryptoCurrency.id === crypCurrency.id
                    ? 'bg-site-dim2'
                    : ''
                } cursor-pointer`}
                key={crypCurrency.id}
                onClick={() => {
                  onChangeCurrency(crypCurrency);
                  setShowList(false);
                }}
              >
                <img
                  src={crypCurrency.logoURI}
                  alt={`crypto-${crypCurrency.id}`}
                  className="w-6 h-6 object-contain mr-2"
                />{' '}
                {crypCurrency.id}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AmountIn;
