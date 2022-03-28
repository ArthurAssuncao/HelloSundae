import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useOrderDetails } from '../../context/OrderDetails';
import { formatCurrency } from '../../util';
import { OrderPhases } from '../App/App';
import { Options } from './Options';

interface OrderEntryProps {
  setOrderPhase: (orderPhase: OrderPhases) => void;
}

const OrderEntry = (props: OrderEntryProps): JSX.Element => {
  const [orderDetails] = useOrderDetails();
  const [, setError] = useState<boolean>(false);
  const { setOrderPhase } = props;

  const isOrderButtonEnabled =
    (orderDetails?.scoops?.size || '0') > 0 ? true : false;

  const grandTotal = orderDetails?.totals?.grandTotal || formatCurrency(0);

  const onSubmit = (): void => {
    if (!orderDetails || !orderDetails?.totals) {
      setError(true);
      toast.error('Order not works. Try again.', {
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    setOrderPhase('review');
  };

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand Total: {grandTotal}</h2>
      <button
        type="submit"
        aria-label="Order Sundae"
        onClick={onSubmit}
        disabled={!isOrderButtonEnabled}
      >
        Order Sundae!
      </button>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export { OrderEntry };
