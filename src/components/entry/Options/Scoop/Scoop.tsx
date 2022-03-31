import classNames from 'classnames';
import React from 'react';
import { SERVER_URL } from '../../../../constants';
import { InputNumber } from '../../../ui/InputNumber';
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

  const validClass = isValid ? style['is-valid'] : style['is-invalid'];

  const MAX = 10;
  const MIN = 0;

  const validate = (value: string): boolean => {
    const newIsValid =
      !isNaN(Number(value)) &&
      Number(value) >= MIN &&
      Number(value) <= MAX &&
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
    <div className={classNames(style.container, className)}>
      <img src={`${SERVER_URL.base}${imagePath}`} alt={`${name} scoop`} className={style.image} />
      <span className={style.name}>{name}</span>
      <form className={style.form}>
        <InputNumber
          className={classNames(style.count, validClass)}
          handleChange={handleChange}
          name={name}
          ariaLabel={name}
          min={MIN}
          max={MAX}
          value={scoopValue}
          isValidByExternalValidation={isValid ? 'valid' : 'invalid'}
        />
      </form>
    </div>
  );
};

export { ScoopComp };
