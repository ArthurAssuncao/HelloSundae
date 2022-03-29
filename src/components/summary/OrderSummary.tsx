import { useOrderDetails } from '../../context/OrderDetails';
import { OrderPhases } from '../App/App';
import style from './OrderSummary.module.css';
import { SummaryForm } from './SummaryForm';

interface OrderSummaryProps {
  setOrderPhase: (orderPhase: OrderPhases) => void;
}

const OrderSummary = (props: OrderSummaryProps): JSX.Element => {
  const { setOrderPhase } = props;
  const [orderDetails] = useOrderDetails();

  const scoopsTotal = orderDetails?.totals?.scoops || 0;
  const toppingsTotal = orderDetails?.totals?.toppings || 0;

  const scoops = Array.from(orderDetails?.scoops?.entries() || []);

  const ScoopList = (): JSX.Element => {
    if (!scoops.length) {
      return <></>;
    }
    return (
      <ul>
        {scoops.map(([scoop, quantity]) => (
          <li key={scoop}>
            {scoop}: {quantity}
          </li>
        ))}
      </ul>
    );
  };

  const toppings = Array.from(orderDetails?.toppings?.entries() || []);

  const ToppingList = (): JSX.Element => {
    if (!toppings.length) {
      return <></>;
    }
    return (
      <ul>
        {toppings.map(([topping]) => (
          <li key={topping}>{topping}</li>
        ))}
      </ul>
    );
  };

  const Scoops = (): JSX.Element => {
    if (!scoops.length) {
      return <p>No scoops ordered</p>;
    }
    return (
      <>
        <h2>Scoops: {scoopsTotal}</h2>
        <ScoopList />
      </>
    );
  };

  const Toppings = (): JSX.Element => {
    if (!toppings.length) {
      return <p>No toppings ordered</p>;
    }

    return (
      <>
        <h2>Toppings: {toppingsTotal}</h2>
        <ToppingList />
      </>
    );
  };

  const onFinished = (): void => {
    setOrderPhase('completed');
  };

  return (
    <main className={style.container}>
      <h1 className={style.title}>Order Summary</h1>

      <Scoops />

      <Toppings />

      <SummaryForm onFinished={onFinished} />
    </main>
  );
};

export { OrderSummary };
