import classNames from 'classnames';
import { useOrderDetails } from '../../context/OrderDetails';
import { formatCurrency } from '../../util';
import { OrderPhases } from '../App/App';
import style from './OrderSummary.module.scss';
import { SummaryForm } from './SummaryForm';

interface OrderSummaryProps {
  setOrderPhase: (orderPhase: OrderPhases) => void;
  className?: string;
}

interface OptionProps {
  className?: string;
}

const OrderSummary = (props: OrderSummaryProps): JSX.Element => {
  const { setOrderPhase, className } = props;
  const [orderDetails] = useOrderDetails();

  const scoopsTotal = orderDetails?.totals?.scoops || formatCurrency(0);
  const toppingsTotal = orderDetails?.totals?.toppings || formatCurrency(0);

  const scoops = Array.from(orderDetails?.scoops?.entries() || []);

  const ScoopList = (scoopListProps: OptionProps): JSX.Element => {
    if (!scoops.length) {
      return <></>;
    }
    return (
      <ul className={scoopListProps.className}>
        {scoops.map(([scoop, quantity]) => (
          <li key={scoop}>
            {quantity} {scoop}
          </li>
        ))}
      </ul>
    );
  };

  const toppings = Array.from(orderDetails?.toppings?.entries() || []);

  const ToppingList = (toppingsListProps: OptionProps): JSX.Element => {
    if (!toppings.length) {
      return <></>;
    }
    return (
      <ul className={toppingsListProps.className}>
        {toppings.map(([topping]) => (
          <li key={topping}>{topping}</li>
        ))}
      </ul>
    );
  };

  const Scoops = (scoopProps: OptionProps): JSX.Element => {
    if (!scoops.length) {
      return <p className={scoopProps.className}>No scoops ordered</p>;
    }
    return (
      <div className={scoopProps.className}>
        <h2 className={style.title}>Scoops: {scoopsTotal}</h2>
        <ScoopList className={style.list} />
      </div>
    );
  };

  const Toppings = (toppingsProps: OptionProps): JSX.Element => {
    if (!toppings.length) {
      return <p className={toppingsProps.className}>No toppings ordered</p>;
    }

    return (
      <div className={toppingsProps.className}>
        <h2 className={style.title}>Toppings: {toppingsTotal}</h2>
        <ToppingList className={style.list} />
      </div>
    );
  };

  const onFinished = (): void => {
    setOrderPhase('completed');
  };

  return (
    <main className={classNames(style.container, className)}>
      <h1 className={style.title}>Order Summary</h1>

      <Scoops className={style.scoops} />

      <Toppings className={style.toppings} />

      <span className={style.total}>Total: {orderDetails.totals.grandTotal}</span>

      <SummaryForm onFinished={onFinished} />
    </main>
  );
};

export { OrderSummary };
