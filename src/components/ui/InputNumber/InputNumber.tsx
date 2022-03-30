import downArrow from '@iconify/icons-bxs/down-arrow';
import upArrow from '@iconify/icons-bxs/up-arrow';
import { Icon } from '@iconify/react';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import style from './InputNumber.module.scss';

interface InputNumberProps {
  className?: string;
  name: string;
  ariaLabel: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  min?: number;
  max?: number;
  value?: string | number | readonly string[] | undefined;
  isValidByExternalValidation?: 'valid' | 'invalid';
  validationCallback?: (value: boolean) => void;
  labelComponent?: JSX.Element;
}

const InputNumber = (props: InputNumberProps): JSX.Element => {
  const {
    className,
    ariaLabel,
    handleChange,
    disabled,
    min,
    max,
    value,
    isValidByExternalValidation, // disables internal validation
    validationCallback,
    name,
  } = props;

  const inputElement = useRef<HTMLInputElement>(null);

  const hasExternalValidation = isValidByExternalValidation !== undefined;
  const [isValid, setIsValid] = useState<boolean>(
    hasExternalValidation && isValidByExternalValidation === 'invalid' ? false : true,
  );
  const [internalValue, setInternalValue] = useState<string>(value ? value.toString() : '0');

  const validClass =
    !isValid || (hasExternalValidation && isValidByExternalValidation === 'invalid')
      ? style['is-invalid']
      : style['is-valid'];

  const validate = (newValue: string): boolean => {
    if (newValue === '') {
      return false;
    }

    const parsedValue = parseInt(newValue);

    if (isNaN(parsedValue)) {
      return false;
    }

    if (min && parsedValue < min) {
      return false;
    }

    if (max && parsedValue > max) {
      return false;
    }

    if (Math.floor(Number(newValue)) !== Number(newValue)) {
      return false;
    }

    return true;
  };

  const setValue = (newValue: string, triggerOnChange?: boolean): void => {
    setInternalValue(newValue);
    if (triggerOnChange && inputElement.current) {
      inputElement.current.value = newValue;
      const event = new Event('input', { bubbles: true });
      inputElement.current.dispatchEvent(event);
    }
  };

  const handleChangeInternal = (event: React.ChangeEvent<HTMLInputElement>): void => {
    handleChange(event);
    const newValue = event.target.value;
    const isNewValueValid = validate(newValue);
    if (!hasExternalValidation) {
      setIsValid(isNewValueValid);
    }
    setValue(newValue, false);
    if (validationCallback) {
      validationCallback(isNewValueValid);
    }
  };

  const onDecrement: React.MouseEventHandler<HTMLButtonElement> = (event): void => {
    event.preventDefault();
    const newValue = Math.floor(Number(internalValue)) - 1;
    setValue(newValue.toString(), true);
  };

  const onIncrement: React.MouseEventHandler<HTMLButtonElement> = (event): void => {
    event.preventDefault();
    const newValue = Math.floor(Number(internalValue)) + 1;
    setValue(newValue.toString(), true);
  };

  return (
    <div aria-label={ariaLabel} className={classNames(style.container, className, validClass)}>
      <button
        className={classNames(style.inputControl, style.inputDecrement, disabled && style.disabled)}
        aria-label="decrement"
        disabled={disabled}
        onClick={onDecrement}
      >
        <Icon icon={downArrow} className={style.inputControlIcon} />
      </button>
      <label>
        <input
          type="number"
          className={classNames(style.inputField, className, validClass)}
          onInput={handleChangeInternal}
          name={`${name} input`}
          aria-label={`${name} input`}
          role="spinbutton"
          min={min}
          max={max}
          value={internalValue}
          disabled={disabled}
          ref={inputElement}
        />
      </label>
      <button
        className={classNames(style.inputControl, style.inputIncrement, disabled && style.disabled)}
        aria-label="increment"
        disabled={disabled}
        onClick={onIncrement}
      >
        <Icon icon={upArrow} className={style.inputControlIcon} />
      </button>
    </div>
  );
};

export { InputNumber };
