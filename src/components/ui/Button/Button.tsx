import classNames from 'classnames';
import style from './Button.module.scss';

interface ButtonProps {
  className?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  ariaLabel: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button = (props: ButtonProps): JSX.Element => {
  const { className, type, ariaLabel, onClick, disabled, children } = props;
  return (
    <button
      type={type || 'button'}
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled || false}
      className={classNames(style.container, className)}
    >
      {children}
    </button>
  );
};

export { Button };
