import { useState } from 'react';
import logo from '../../assets/icons/hello-sundae-w-text.png';
import { OrderDetailsProvider } from '../../context/OrderDetails';
import { OrderConfirmation } from '../confirmation';
import { OrderEntry } from '../entry';
import { OrderSummary } from '../summary';
import style from './App.module.scss';

export type OrderPhases = 'inProgress' | 'review' | 'completed';

const App = (): React.ReactElement => {
  const [orderPhase, setOrderPhase] = useState<OrderPhases>('inProgress');

  const components = {
    inProgress: OrderEntry,
    review: OrderSummary,
    completed: OrderConfirmation,
  };
  const Component = components[orderPhase];

  return (
    <div className={style.container}>
      <img src={logo} alt="Logo do Hello Sundae" aria-label="Logo do Hello Sundae" />
      <OrderDetailsProvider>
        {/* summary page and entry page need provider */}
        <Component setOrderPhase={setOrderPhase} />
      </OrderDetailsProvider>
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default App;