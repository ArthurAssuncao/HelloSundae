import React, { useRef, useState } from 'react';
import style from './SummaryForm.module.css';

const SummaryForm = (): React.ReactElement => {
  const dialogRef = useRef(null);
  const [showDialog, setShowDialog] = useState(false);
  const [checkboxCheck, setCheckboxCheck] = useState(false);
  let timeoutDialog: ReturnType<typeof setTimeout> | null;

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
    <form className={style.container}>
      <div className={style.fields}>
        <input
          type="checkbox"
          title="Checkbox I agree to Terms and Conditions"
          id="summary-form-checkbox"
          checked={checkboxCheck}
          onChange={checkboxToggle}
          className={style.checkbox}
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
      <button
        type="submit"
        disabled={!checkboxCheck}
        className={style.confirmButton}
      >
        Confirm order
      </button>
    </form>
  );
};

export { SummaryForm };
