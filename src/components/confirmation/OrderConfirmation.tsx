import axios from 'axios';
import React, { useEffect } from 'react';
import { SERVER_URL } from '../../constants';
import { useOrderDetails } from '../../context/OrderDetails';
import { OrderPhases } from '../App/App';
import { AlertBanner } from '../common/AlertBanner';

interface OrderConfirmationProps {
  setOrderPhase: (orderPhase: OrderPhases) => void;
}

const OrderConfirmation = (props: OrderConfirmationProps): React.ReactElement => {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = React.useState<number | null>(null);
  const { setOrderPhase } = props;
  const [error, setError] = React.useState<boolean>(false);

  const handleClick = (): void => {
    // clear the order details
    resetOrder();

    // send back to order page
    setOrderPhase('inProgress');
  };

  useEffect(() => {
    axios
      .post(SERVER_URL.post.order)
      .then((response: { data: { orderNumber: number } }) => {
        setOrderNumber(response.data.orderNumber);
        return response.data.orderNumber;
      })
      .catch((_error) => {
        setError(true);
      });
  }, []);

  if (error) {
    return (
      <AlertBanner message="An unexpected error occurred. Please try again later" variant="error" />
    );
  }

  if (orderNumber === null) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Thank You!</h1>
      <p>Your order number is {orderNumber}</p>
      <p>as per our terms and conditions, nothing will happend now</p>
      <button onClick={handleClick}>Create new order</button>
    </div>
  );
};

export { OrderConfirmation };
