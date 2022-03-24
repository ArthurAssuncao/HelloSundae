import React from 'react';
import style from './OrderSummary.module.css';
import { SummaryForm } from './SummaryForm';

const OrderSummary = (): React.ReactElement => {
  return (
    <main className={style.container}>
      <h1 className={style.title}>Order Summary</h1>

      <SummaryForm />
    </main>
  );
};

export { OrderSummary };
