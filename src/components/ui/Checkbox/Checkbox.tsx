import classNames from 'classnames';
import style from './Checkbox.module.scss';

interface CheckboxProps {
  className?: string;
  ariaLabel: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  defaultChecked?: boolean;
  name: string;
}

const Checkbox = (props: CheckboxProps): JSX.Element => {
  const { className, ariaLabel, onChange, disabled, defaultChecked, name } = props;
  return (
    <label className={style.container}>
      <input
        type={'checkbox'}
        aria-label={ariaLabel}
        onChange={onChange}
        disabled={disabled}
        className={classNames(style.container, className)}
        defaultChecked={defaultChecked}
        name={name}
      ></input>
    </label>
  );
};

export { Checkbox };
