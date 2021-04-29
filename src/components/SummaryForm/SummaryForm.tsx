import React, { useRef, useState } from 'react';
import style from './SummaryForm.module.css';

const SummaryForm = (): React.ReactElement => {
  const dialogRef = useRef(null);
  const [showDialog, setShowDialog] = useState(false);
  const [checkboxCheck, setCheckboxCheck] = useState(false);

  const dialogToggle = (): void => {
    setShowDialog((prev) => {
      return !prev;
    });
  };

  const checkboxToggle = (): void => {
    setCheckboxCheck((prev) => {
      return !prev;
    });
  };

  return (
    <form className={style.container}>
      <div>
        <input
          type="checkbox"
          title="Checkbox I agree to Terms and Conditions"
          id="summary-form-checkbox"
          checked={checkboxCheck}
          onChange={checkboxToggle}
        />
        <label htmlFor="summary-form-checkbox">
          I agree to{' '}
          <span
            onMouseOver={dialogToggle}
            onMouseOut={dialogToggle}
            onFocus={dialogToggle}
            onBlur={dialogToggle}
          >
            Terms and Conditions
          </span>
        </label>
        {showDialog && <div ref={dialogRef}>App Terms and Conditions</div>}
      </div>
      <button type="submit" disabled={!checkboxCheck}>
        Confirm order
      </button>
    </form>
  );
};

export { SummaryForm };
