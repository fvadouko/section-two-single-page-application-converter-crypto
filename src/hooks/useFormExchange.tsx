import { useState } from 'react';
import { ICryptoCurrency, ICurrency } from '../interfaces';
import { useExchangeRates } from './useExchangeRates';

export const useFormExchange = () => {
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

      const exchangeRateB = exchangeRate ?? 0;
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

  return {
    activeCryptoCurrency,
    handleFromCryptoCurrencyChange,
    fromAmount,
    handleFromAmountChange,
    activeCurrency,
    handleCurrencyChange,
    toAmount,
    handleToAmountChange,
    isLoading,
    exchangeRate,
  };
};
