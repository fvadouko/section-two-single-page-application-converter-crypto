import { useState } from 'react';

import { chevronDown } from '../assets';

import { CURRENCIES } from '../constants/currencies';
import { ICurrency } from '../interfaces';
//import { useOnClickOutside } from '../utils';
import styles from '../styles';

interface AmountOutProps {
  onChangeCurrency: (currency: ICurrency) => void;
  activeCurrency: ICurrency;
  toAmount: string;
  onToAmountChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const AmountOut = ({
  onChangeCurrency,
  activeCurrency,
  toAmount,
  onToAmountChange,
}: AmountOutProps) => {
  const [showList, setShowList] = useState(false);

  return (
    <div className={styles.amountContainer}>
      <input
        placeholder="0"
        type="number"
        className={styles.amountInput}
        value={toAmount}
        onChange={onToAmountChange}
      />

      <div
        className="relative"
        onClick={() => setShowList(!showList)}
      >
        <button className={styles.currencyButton}>
          {activeCurrency.id}
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
            {Object.values(CURRENCIES).map((currency) => (
              <li
                className={`${styles.currencyListItem} ${
                  activeCurrency.id === currency.id
                    ? 'bg-site-dim2'
                    : ''
                } cursor-pointer`}
                key={currency.id}
                onClick={() => {
                  onChangeCurrency(currency);
                  setShowList(false);
                }}
              >
                {currency.symbol} {'-'}
                {currency.id}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AmountOut;
