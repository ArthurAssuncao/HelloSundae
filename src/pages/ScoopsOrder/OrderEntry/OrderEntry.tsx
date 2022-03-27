import { Options } from '../Options';

const OrderEntry = (): JSX.Element => {
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
    </div>
  );
};

export { OrderEntry };
