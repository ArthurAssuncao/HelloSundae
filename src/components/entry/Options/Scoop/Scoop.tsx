import classNames from 'classnames';
import React from 'react';
import { SERVER_URL } from '../../../../constants';
import style from './Scoop.module.scss';

export interface Scoop {
  name: string;
  imagePath: string;
  updateItemCount: (itemName: string, newItemCount: string) => void;
  className?: string;
}

export interface ScoopData {
  name: string;
  imagePath: string;
}

const ScoopComp = (props: Scoop): React.ReactElement => {
  const { name, imagePath, updateItemCount, className } = props;
  const [scoopValue, setScoopValue] = React.useState('0');
  const [isValid, setIsValid] = React.useState(true);

  const validate = (value: string): boolean => {
    const newIsValid =
      !isNaN(Number(value)) &&
      Number(value) >= 0 &&
      Number(value) <= 10 &&
      value !== '' &&
      Math.floor(Number(value)) === Number(value);
    setIsValid(newIsValid);
    return newIsValid;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setScoopValue(newValue);
    if (validate(newValue)) {
      updateItemCount(name, newValue);
    }
  };

  return (
    <div className={classNames(className, style.container)}>
      <span className={style.name}>{name}</span>
      <img src={`${SERVER_URL.base}${imagePath}`} alt={`${name} scoop`} className={style.image} />
      <form className={style.form}>
        <label className={style.label}>
          <input
            type="number"
            className={classNames(style.count, isValid ? style['is-valid'] : style['is-invalid'])}
            onChange={handleChange}
            name={name}
            aria-label={name}
            role="spinbutton"
            min="0"
            max="10"
            value={scoopValue}
          />
        </label>
      </form>
    </div>
  );
};

export { ScoopComp };
