import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useOrderDetails } from '../../context/OrderDetails';
import { formatCurrency } from '../../util';
import { OrderPhases } from '../App/App';
import { Button } from '../ui/Button';
import { Options } from './Options';
import style from './OrderEntry.module.scss';

interface OrderEntryProps {
  setOrderPhase: (orderPhase: OrderPhases) => void;
}

const OrderEntry = (props: OrderEntryProps): JSX.Element => {
  const [orderDetails] = useOrderDetails();
  const [, setError] = useState<boolean>(false);
  const { setOrderPhase } = props;

  const isOrderButtonEnabled = (orderDetails?.scoops?.size || '0') > 0 ? true : false;

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
    <div className={style.container}>
      <h1 className={style.title}>Design Your Sundae</h1>
      <Options optionType="scoops" className={style.scoops} />
      <Options optionType="toppings" className={style.toppings} />
      <h2 className={style.grandTotal}>Grand Total: {grandTotal}</h2>
      <Button
        type="submit"
        ariaLabel="Order Sundae"
        onClick={onSubmit}
        disabled={!isOrderButtonEnabled}
        className={style.button}
      >
        Order Sundae!
      </Button>
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
