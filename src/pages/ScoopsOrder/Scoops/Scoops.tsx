import axios from 'axios';
import 'dotenv/config';
import React, { useEffect, useState } from 'react';
import { Scoop, ScoopComp } from './Scoop';
import style from './Scoops.module.scss';

interface ScoopsOption {
  optionType: string;
}

const Scoops = (props: ScoopsOption): React.ReactElement => {
  const { optionType } = props;
  const [items, setItems] = useState<Scoop[]>([]);

  const optionItems = items.map((item) => {
    return (
      <ScoopComp key={item.name} name={item.name} imagePath={item.imagePath} />
    );
  });

  // optionType is 'scoops' or 'toppings'
  useEffect(() => {
    const url = `${process.env.SERVER_URL as string}${optionType}`;
    axios
      .get(url)
      .then((response) => setItems(response.data as Scoop[]))
      .catch((error) => {
        // TODO: handle error response
        console.error(error);
      });
  }, [optionType]);

  return <div className={style.container}>{optionItems}</div>;
};

export { Scoops };
