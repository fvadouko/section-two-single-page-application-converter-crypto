import React, { useState } from 'react';

import AmountIn from './AmountIn';
import AmountOut from './AmountOut';
import Balance from './Balance';
import { useExchangeRates } from '../hooks/useExchangeRates';
import { ICryptoCurrency, ICurrency } from '../interfaces';

const Exchange = () => {
  const [activeCryptoCurrency, setActiveCryptoCurrency] =
    useState<ICryptoCurrency>({
      id: 'btc',
      name: 'bitcoin',
      symbol: 'BTC',
    });
  const [fromAmount, setFromAmount] = useState('');

  const [activeCurrency, setActiveCurrency] = useState<ICurrency>({
    id: 'usd',
    name: 'dollars',
    symbol: '€',
  });

  const [toAmount, setToAmount] = useState<string>('');
  const [isLoading, setIsloading] = useState(false);

  const { data: exchangeRate } = useExchangeRates(
    activeCryptoCurrency.name,
    activeCurrency.id
  );

  const handleFromCryptoCurrencyChange = (
    cryptoCurrency: ICryptoCurrency
  ) => {
    setActiveCryptoCurrency(cryptoCurrency);
    const exchangeRateB = exchangeRate || 0;
    setToAmount((parseFloat(fromAmount) * exchangeRateB).toString());
  };

  const handleCurrencyChange = (currency: ICurrency) => {
    setActiveCurrency(currency);
    const exchangeRateB = exchangeRate || 0;
    setFromAmount((parseFloat(toAmount) * exchangeRateB).toString());
  };

  const handleFromAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      setIsloading(true);
      const amount = event.target.value;

      const exchangeRateB = exchangeRate || 0;
      setFromAmount(amount);
      setToAmount((parseFloat(amount) * exchangeRateB).toString());
    } catch (error) {
    } finally {
      setIsloading(false);
    }
  };

  const handleToAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      setIsloading(true);
      const amount = event.target.value;

      const exchangeRateB = exchangeRate || 0;
      if (exchangeRateB === 0) {
        setToAmount(amount);
        setFromAmount('');
        return;
      }
      setToAmount(amount);
      setFromAmount((parseFloat(amount) / exchangeRateB).toString());
    } catch (error) {
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="flex flex-col w-full items-center">
      <div className="mb-8">
        <AmountIn
          onChangeCurrency={handleFromCryptoCurrencyChange}
          activeCryptoCurrency={activeCryptoCurrency}
          onFromAmountChange={handleFromAmountChange}
          fromAmount={fromAmount}
        />
      </div>

      <div className="mb-8 w-[100%]">
        <AmountOut
          onChangeCurrency={handleCurrencyChange}
          activeCurrency={activeCurrency}
          toAmount={toAmount}
          onToAmountChange={handleToAmountChange}
        />
      </div>
      <div className="mb-8 w-[100%]">
        <Balance
          isLoading={isLoading}
          cryptoCurrencyName={activeCryptoCurrency.name}
          exchangeRate={exchangeRate}
          currencyName={activeCurrency.name}
        />
      </div>
    </div>
  );
};

export default Exchange;
