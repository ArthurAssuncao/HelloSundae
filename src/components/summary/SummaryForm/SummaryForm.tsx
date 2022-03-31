import React, { useRef, useState } from 'react';
import { Button } from '../../ui/Button';
import { Checkbox } from '../../ui/Checkbox';
import style from './SummaryForm.module.scss';

interface SummaryFormProps {
  onFinished: () => void;
}

const SummaryForm = (props: SummaryFormProps): React.ReactElement => {
  const dialogRef = useRef(null);
  const [showDialog, setShowDialog] = useState(false);
  const [checkboxCheck, setCheckboxCheck] = useState(false);
  let timeoutDialog: ReturnType<typeof setTimeout> | null;

  const { onFinished } = props;

  const handleFinished = (event: React.FormEvent<EventTarget>): void => {
    event.preventDefault();
    onFinished();
  };

  const dialogToggle = (value: boolean): void => {
    if (timeoutDialog) {
      clearTimeout(timeoutDialog);
    }
    if (value) {
      setShowDialog(value);
      return;
    }
    timeoutDialog = setTimeout(() => {
      setShowDialog(value);
    }, 500);
  };

  const checkboxToggle = (): void => {
    setCheckboxCheck((prev) => {
      return !prev;
    });
  };

  return (
    <form className={style.container} onSubmit={handleFinished}>
      <div className={style.fields}>
        <Checkbox
          title="I agree to Terms and Conditions"
          name="summary-form-checkbox"
          checked={checkboxCheck}
          onChange={checkboxToggle}
          className={style.checkbox}
          ariaLabel="I agree to Terms and Conditions"
        />
        <div className={style.labelWrapper}>
          <label htmlFor="summary-form-checkbox">
            I agree to{' '}
            <span
              onMouseOver={() => dialogToggle(true)}
              onMouseOut={() => dialogToggle(false)}
              onFocus={() => dialogToggle(true)}
              onBlur={() => dialogToggle(false)}
              className={style.link}
            >
              Terms and Conditions
            </span>
          </label>
          {showDialog && (
            <div
              className={style.tooltip}
              ref={dialogRef}
              onMouseOver={() => dialogToggle(true)}
              onMouseOut={() => dialogToggle(false)}
              onFocus={() => dialogToggle(true)}
              onBlur={() => dialogToggle(false)}
            >
              <strong>App Terms and Conditions</strong>
              <br />
              <span>No ice cream will actually be delivered</span>
            </div>
          )}
        </div>
      </div>
      <Button
        ariaLabel="Confirm order"
        type="submit"
        disabled={!checkboxCheck}
        className={style.confirmButton}
        onClick={onFinished}
      >
        Confirm order
      </Button>
    </form>
  );
};

export { SummaryForm };
