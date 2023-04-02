import styles from '../styles';

interface BalanceProps {
  isLoading: boolean;
  cryptoCurrencyName: string;
  currencyName: string;

  exchangeRate: number | undefined;
}

const Balance = ({
  isLoading,
  cryptoCurrencyName,
  currencyName,
  exchangeRate,
}: BalanceProps) => {
  return (
    <div className={styles.balance}>
      <p className={styles.balanceText}>
        {!isLoading ? (
          <>
            <span className={styles.balanceBold}>
              Exchange: 1 {cryptoCurrencyName} = {exchangeRate}{' '}
              {currencyName}
            </span>
          </>
        ) : (
          ''
        )}
      </p>
    </div>
  );
};

export default Balance;
