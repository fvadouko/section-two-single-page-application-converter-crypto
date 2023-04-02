import AmountIn from './AmountIn';
import AmountOut from './AmountOut';
import Balance from './Balance';
import { useFormExchange } from '../hooks/useFormExchange';

const Exchange = () => {
  const {
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
  } = useFormExchange();

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
