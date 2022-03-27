import logo from '../../assets/icons/hello-sundae-w-text.png';
import { OrderDetailsProvider } from '../../context/OrderDetails';
import { OrderEntry } from '../ScoopsOrder/OrderEntry';
import './App.css';

const App = (): React.ReactElement => {
  return (
    <div className="App">
      <img src={logo} alt="Logo do Hello Sundae" />
      <OrderDetailsProvider>
        {/* summary page and entry page need provider */}
        <OrderEntry />
      </OrderDetailsProvider>
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default App;
