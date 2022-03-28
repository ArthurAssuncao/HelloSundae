import React from 'react';
import { SERVER_URL } from '../../../../constants';
import style from './Topping.module.scss';

export interface Topping {
  name: string;
  imagePath: string;
  updateItemCount: (itemName: string, newItemCount: string) => void;
}

export interface ToppingData {
  name: string;
  imagePath: string;
}

const ToppingComp = (props: Topping): React.ReactElement => {
  const { name, imagePath, updateItemCount } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    updateItemCount(name, event.target.checked ? '1' : '0');
  };

  return (
    <div className={style.container}>
      <span className={style.name}>{name}</span>
      <img
        src={`${SERVER_URL.base}${imagePath}`}
        alt={`${name} topping`}
        className={style.image}
      />
      <form className={style.form}>
        <label className={style.label}>
          <input
            type="checkbox"
            defaultChecked={false}
            className={style.checkbox}
            onChange={handleChange}
            name={name}
            aria-label={name}
          />
        </label>
      </form>
    </div>
  );
};

export { ToppingComp };
