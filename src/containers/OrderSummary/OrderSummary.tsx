import React from 'react';
import { SummaryForm } from '../../components/SummaryForm';
import style from './OrderSummary.module.css';

const OrderSummary = (): React.ReactElement => {
  return (
    <main className={style.container}>
      <h1 className={style.title}>Order Summary</h1>

      <SummaryForm />
    </main>
  );
};

export { OrderSummary };
