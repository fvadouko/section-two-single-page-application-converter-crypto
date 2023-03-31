import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Currency {
  id: string;
  name: string;
  symbol: string;
}

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
}

function App() {
  const [fromCurrency, setFromCurrency] = useState<Currency>({
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
  });
  const [toCurrency, setToCurrency] = useState<Currency>({
    id: 'eur',
    name: 'Euro',
    symbol: 'EUR',
  });
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');

  useEffect(() => {
    const fetchExchangeRate = async () => {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${toCurrency.id}&ids=${fromCurrency.id}&sparkline=true&locale=en`
      );
      const coin = response.data[0] as Coin;
      setExchangeRate(coin.current_price);
    };

    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  const handleFromCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const currencyId = event.target.value;
    const currency = {
      id: currencyId,
      name: currencyId.toUpperCase(),
      symbol: currencyId.toUpperCase(),
    };
    setFromCurrency(currency);
  };

  const handleToCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const currencyId = event.target.value;
    const currency = {
      id: currencyId,
      name: currencyId.toUpperCase(),
      symbol: currencyId.toUpperCase(),
    };
    setToCurrency(currency);
  };

  const handleFromAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const amount = event.target.value;
    setFromAmount(amount);
    setToAmount((parseFloat(amount) * exchangeRate).toString());
  };

  const handleToAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const amount = event.target.value;
    setToAmount(amount);
    setFromAmount((parseFloat(amount) / exchangeRate).toString());
  };

  return (
    <>
      <div>
        <label>From:</label>
        <select
          value={fromCurrency.id}
          onChange={handleFromCurrencyChange}
        >
          <option value="bitcoin">BTC</option>
          <option value="ethereum">ETH</option>
          <option value="litecoin">LTC</option>
        </select>
        <input
          type="number"
          value={fromAmount}
          onChange={handleFromAmountChange}
        />
      </div>
      <div>
        <label>To:</label>
        <select
          value={toCurrency.id}
          onChange={handleToCurrencyChange}
        >
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="gbp">GBP</option>
        </select>
        <input
          type="number"
          value={toAmount}
          onChange={handleToAmountChange}
        />
      </div>
      <div>
        <p>
          1 {fromCurrency.symbol} = {exchangeRate} {toCurrency.symbol}
        </p>
      </div>
    </>
  );
}

export default App;
