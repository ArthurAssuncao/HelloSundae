import React from 'react';
import style from './Scoop.module.scss';

export interface Scoop {
  name: string;
  imagePath: string;
  updateItemCount: (itemName: string, newItemCount: string) => void;
}

export interface ScoopData {
  name: string;
  imagePath: string;
}

const ScoopComp = (props: Scoop): React.ReactElement => {
  const { name, imagePath, updateItemCount } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    updateItemCount(name, event.target.value);
  };

  return (
    <div className={style.container}>
      <span className={style.name}>{name}</span>
      <img
        src={`${process.env.REACT_APP_SERVER_URL as string}${imagePath}`}
        alt={`${name} scoop`}
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

export { ScoopComp };
