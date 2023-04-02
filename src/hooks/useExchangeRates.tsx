import { useQuery } from 'react-query';
import axios from 'axios';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
}

async function fetchExchangeRate(
  fromCurrency: string,
  toCurrency: string
) {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${toCurrency}&ids=${fromCurrency}&sparkline=true&locale=en`
  );
  const coin = response.data[0] as Coin;
  console.log(
    'useExchangeRates',
    fromCurrency,
    toCurrency,
    coin.current_price
  );
  return coin.current_price;
}

export function useExchangeRates(
  fromCurrency: string,
  toCurrency: string
) {
  return useQuery<number>(
    ['exchangeRate', fromCurrency, toCurrency],
    () => fetchExchangeRate(fromCurrency, toCurrency)
  );
}
