import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PRICE_PER_ITEM, SERVER_URL } from '../../../constants';
import { useOrderDetails } from '../../../context/OrderDetails';
import { formatCurrency } from '../../../util';
import { AlertBanner } from '../../common/AlertBanner';
import style from './Options.module.scss';
import { ScoopComp, ScoopData } from './Scoop';
import { ToppingComp, ToppingData } from './Topping';

interface Option {
  optionType: 'scoops' | 'toppings';
  className?: string;
}

const Options = (props: Option): React.ReactElement => {
  const { optionType } = props;

  const [error, setError] = useState<boolean>(false);
  const [orderDetails, updateItemCount] = useOrderDetails();

  const ItemComponent = optionType === 'scoops' ? ScoopComp : ToppingComp;
  const [items, setItems] = useState<ScoopData[] | ToppingData[]>([]);
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const pricePerItem = PRICE_PER_ITEM[optionType];

  const updateItemCountFunc = (itemName: string, newItemCount: string): void => {
    updateItemCount(itemName, newItemCount, optionType);
  };

  const optionItems = items.map((item) => {
    return (
      <ItemComponent
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
        updateItemCount={orderDetails ? updateItemCountFunc : () => {}}
        className={style.optionType}
      />
    );
  });

  // optionType is 'scoops' or 'toppings'
  useEffect(() => {
    const url = SERVER_URL.get[optionType];
    axios
      .get(url)
      .then((response: { data: ScoopData[] | ToppingData[] }) => setItems(response.data))
      .catch((_error) => {
        setError(true);
      });
  }, [optionType]);

  if (error) {
    return <AlertBanner message="An error occurred. Please try again later." variant="danger" />;
  }

  return (
    <div className={style.container}>
      <h2 className={style.title}>{title}</h2>
      <p className={style.price}>{formatCurrency(pricePerItem)} each</p>
      <p className={style.total}>
        {title} total: {orderDetails && orderDetails.totals && orderDetails.totals[optionType]}
      </p>
      <div className={style.optionsItems}>{optionItems}</div>
    </div>
  );
};

export { Options };
