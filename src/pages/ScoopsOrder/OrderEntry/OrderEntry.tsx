import { useOrderDetails } from '../../../context/OrderDetails';
import { Options } from '../Options';

const OrderEntry = (): JSX.Element => {
  const [orderDetails] = useOrderDetails();

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>
        Grand Total:{' '}
        {orderDetails && orderDetails.totals && orderDetails.totals.grandTotal}
      </h2>
    </div>
  );
};

export { OrderEntry };
