import React from 'react';
import { Options } from './Options/Options';
import style from './ScoopsOrder.module.css';

const ScoopsOrder = (): React.ReactElement => {
  return (
    <main className={style.container}>
      <h1 className={style.title}>Scoops Order</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
    </main>
  );
};

export { ScoopsOrder };
