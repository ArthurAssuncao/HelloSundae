import React from 'react';
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
    updateItemCount(name, event.target.value);
  };

  return (
    <div className={style.container}>
      <span className={style.name}>{name}</span>
      <img
        src={`${process.env.REACT_APP_SERVER_URL as string}${imagePath}`}
        alt={`${name} topping`}
        className={style.image}
      />
      <form className={style.form}>
        <label className={style.label}>
          <input
            type="number"
            defaultValue={0}
            className={style.count}
            onChange={handleChange}
            name={name}
            aria-label={name}
            role="spinbutton"
          />
        </label>
      </form>
    </div>
  );
};

export { ToppingComp };
