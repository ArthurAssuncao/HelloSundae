import logo from '../../assets/icons/hello-sundae-w-text.png';
import { OrderSummary } from '../OrderSummary';
import './App.css';

const App = (): React.ReactElement => {
  return (
    <div className="App">
      <img src={logo} alt="Logo do Hello Sundae" />
      <OrderSummary />
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default App;
