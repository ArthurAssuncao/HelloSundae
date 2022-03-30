import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputNumber } from './InputNumber';

describe('InputNumber component', () => {
  // ariaLabel prop is passed
  test('ariaLabel prop is passed', () => {
    const spyHandleChange = jest.fn();
    render(<InputNumber name="test" ariaLabel="test" handleChange={spyHandleChange} />);

    const field = screen.getByLabelText('test');

    expect(field).toHaveAttribute('aria-label', 'test');
  });

  // input is disabled when disabled is true
  test('input is disabled when disabled is true', () => {
    const spyHandleChange = jest.fn();
    render(<InputNumber name="test" ariaLabel="test" disabled handleChange={spyHandleChange} />);

    const inputNumber = screen.getByRole('spinbutton', { name: 'test input' });

    expect(inputNumber).toBeDisabled();
  });

  // input is enable when disabled is undefined
  test('input is enable when disabled is undefined', () => {
    const spyHandleChange = jest.fn();
    render(<InputNumber name="test" ariaLabel="test" handleChange={spyHandleChange} />);

    const inputNumber = screen.getByRole('spinbutton', { name: 'test input' });

    expect(inputNumber).toBeEnabled();
  });

  // input is enable when disabled is false
  test('input is enable when disabled is false', () => {
    const spyHandleChange = jest.fn();
    render(
      <InputNumber name="test" ariaLabel="test" disabled={false} handleChange={spyHandleChange} />,
    );

    const inputNumber = screen.getByRole('spinbutton', { name: 'test input' });

    expect(inputNumber).toBeEnabled();
  });

  // controls are disabled when disabled is true
  test('controls are disabled when disabled is true', () => {
    const spyHandleChange = jest.fn();
    render(<InputNumber name="test" ariaLabel="test" disabled handleChange={spyHandleChange} />);

    const decrement = screen.getByRole('button', { name: 'decrement' });
    const increment = screen.getByRole('button', { name: 'increment' });

    expect(decrement).toBeDisabled();
    expect(decrement).toHaveClass('disabled');
    expect(increment).toBeDisabled();
    expect(increment).toHaveClass('disabled');
  });

  // value prop is passed
  test('value prop is passed', () => {
    const spyHandleChange = jest.fn();
    render(<InputNumber name="test" ariaLabel="test" handleChange={spyHandleChange} value={10} />);

    const inputNumber = screen.getByRole('spinbutton', { name: 'test input' });

    expect(inputNumber).toHaveValue(10);
  });

  // is-valid css class is applied when value is valid

  // is-invalid css class is applied when value is ​​smaller than min
  test('is-invalid css class is applied when value is ​​smaller than min', () => {
    const spyHandleChange = jest.fn();
    render(<InputNumber name="test" ariaLabel="test" handleChange={spyHandleChange} min={10} />);

    const field = screen.getByLabelText('test');
    const inputNumber = screen.getByRole('spinbutton', { name: 'test input' });

    userEvent.clear(inputNumber);
    userEvent.type(inputNumber, '9');

    expect(field).toHaveClass('is-invalid');
  });

  // is-invalid css class is applied when value is ​​greater than max
  test('is-invalid css class is applied when value is ​​greater than max', () => {
    const spyHandleChange = jest.fn();
    render(<InputNumber name="test" ariaLabel="test" handleChange={spyHandleChange} max={10} />);

    const field = screen.getByLabelText('test');
    const inputNumber = screen.getByRole('spinbutton', { name: 'test input' });

    userEvent.clear(inputNumber);
    userEvent.type(inputNumber, '15');

    expect(field).toHaveClass('is-invalid');
  });

  // is-valid css class is applied when value is ​​between min and max
  test('is-valid css class is applied when value is ​​between min and max', () => {
    const spyHandleChange = jest.fn();
    render(
      <InputNumber
        name="test"
        ariaLabel="test"
        handleChange={spyHandleChange}
        min={10}
        max={20}
        value={15}
      />,
    );

    const field = screen.getByLabelText('test');

    expect(field).toHaveClass('is-valid');
  });

  // handleChange is called when value is changed
  test('handleChange is called when value is changed', () => {
    const spyHandleChange = jest.fn();
    render(<InputNumber name="test" ariaLabel="test" handleChange={spyHandleChange} />);

    const inputNumber = screen.getByRole('spinbutton', { name: 'test input' });

    userEvent.clear(inputNumber);
    userEvent.type(inputNumber, '5');

    expect(spyHandleChange).toHaveBeenCalledTimes(2);
  });

  // handleChange is called when value is changed by increment and decrement
  test('handleChange is called when value is changed by increment and decrement', () => {
    const spyHandleChange = jest.fn();
    render(<InputNumber name="test" ariaLabel="test" handleChange={spyHandleChange} />);

    const increment = screen.getByRole('button', { name: 'increment' });
    const decrement = screen.getByRole('button', { name: 'decrement' });

    userEvent.click(increment);
    userEvent.click(decrement);

    expect(spyHandleChange).toHaveBeenCalledTimes(2);
  });

  // isValidByExternalValidation changes css class (is-invalid or is-valid)
  test('isValidByExternalValidation changes css class to is-valid when its value is valid', () => {
    const spyHandleChange = jest.fn();

    // isValidByExternalValidation is valid
    render(
      <InputNumber
        ariaLabel="test"
        name="test"
        handleChange={spyHandleChange}
        min={10}
        max={20}
        value={15}
        isValidByExternalValidation={'valid'}
      />,
    );

    const field = screen.getByLabelText('test');

    expect(field).toHaveClass('is-valid');
  });

  test('isValidByExternalValidation changes css class to is-valid when its value is invalid', () => {
    const spyHandleChange = jest.fn();

    // isValidByExternalValidation is invalid
    render(
      <InputNumber
        name="test"
        ariaLabel="test"
        handleChange={spyHandleChange}
        min={10}
        max={20}
        value={15}
        isValidByExternalValidation={'invalid'}
      />,
    );

    const field = screen.getByLabelText('test');

    expect(field).toHaveClass('is-invalid');
  });

  // validationCallback is called when value is ​​smaller than min
  test('validationCallback is called when value is ​​smaller than min', () => {
    const spyHandleChange = jest.fn();
    const spyValidationCallback = jest.fn();
    render(
      <InputNumber
        name="test"
        ariaLabel="test"
        handleChange={spyHandleChange}
        min={10}
        validationCallback={spyValidationCallback}
      />,
    );

    const inputNumber = screen.getByRole('spinbutton', { name: 'test input' });

    userEvent.clear(inputNumber);
    userEvent.type(inputNumber, '9');

    expect(spyValidationCallback).toHaveBeenCalledWith(false);
  });

  // validationCallback is called when value is changed
  test('validationCallback is called when value is ​​greater than max', () => {
    const spyHandleChange = jest.fn();
    const spyValidationCallback = jest.fn();

    render(
      <InputNumber
        name="test"
        ariaLabel="test"
        handleChange={spyHandleChange}
        min={10}
        validationCallback={spyValidationCallback}
      />,
    );

    const inputNumber = screen.getByRole('spinbutton', { name: 'test input' });

    userEvent.clear(inputNumber);
    userEvent.type(inputNumber, '15');

    expect(spyValidationCallback).toHaveBeenCalled();
  });

  // validationCallback is called when value is changed and value is valid
  test('validationCallback is called when value is changed and value is valid', () => {
    const spyHandleChange = jest.fn();
    const spyValidationCallback = jest.fn();

    render(
      <InputNumber
        name="test"
        ariaLabel="test"
        handleChange={spyHandleChange}
        min={10}
        validationCallback={spyValidationCallback}
      />,
    );

    const inputNumber = screen.getByRole('spinbutton', { name: 'test input' });

    userEvent.clear(inputNumber);
    userEvent.type(inputNumber, '15');

    expect(spyValidationCallback).toHaveBeenCalledWith(true);
  });

  // validationCallback is called when value is changed and value is not valid
  test('validationCallback is called when value is changed and value is not valid', () => {
    const spyHandleChange = jest.fn();
    const spyValidationCallback = jest.fn();

    render(
      <InputNumber
        name="test"
        ariaLabel="test"
        handleChange={spyHandleChange}
        min={0}
        max={10}
        validationCallback={spyValidationCallback}
      />,
    );

    const inputNumber = screen.getByRole('spinbutton', { name: 'test input' });

    userEvent.clear(inputNumber);
    userEvent.type(inputNumber, '15');

    expect(spyValidationCallback).toHaveBeenCalledWith(false);
  });

  // is-valid css class is not applied when isValidByExternalValidation is false and internal validation is true
  test('is-valid css class is not applied when the Value is ​​undefined', () => {
    const spyHandleChange = jest.fn();
    render(
      <InputNumber
        name="test"
        ariaLabel="test"
        handleChange={spyHandleChange}
        isValidByExternalValidation={'invalid'}
      />,
    );

    const field = screen.getByLabelText('test');

    expect(field).not.toHaveClass('is-valid');
  });

  // button decrement reduces value
  test('button decrement reduces value', () => {
    const spyHandleChange = jest.fn();
    render(<InputNumber name="test" ariaLabel="test" handleChange={spyHandleChange} />);

    const inputNumber = screen.getByRole('spinbutton', { name: 'test input' });
    const buttonDecrement = screen.getByRole('button', { name: 'decrement' });

    userEvent.clear(inputNumber);
    userEvent.type(inputNumber, '15');

    expect(inputNumber).toHaveValue(15);

    userEvent.click(buttonDecrement);

    expect(inputNumber).toHaveValue(14);
  });

  // button increment increases value
  test('button increment increases value', () => {
    const spyHandleChange = jest.fn();
    render(<InputNumber name="test" ariaLabel="test" handleChange={spyHandleChange} />);

    const inputNumber = screen.getByRole('spinbutton', { name: 'test input' });
    const buttonIncrement = screen.getByRole('button', { name: 'increment' });

    userEvent.clear(inputNumber);
    userEvent.type(inputNumber, '15');

    expect(inputNumber).toHaveValue(15);

    userEvent.click(buttonIncrement);

    expect(inputNumber).toHaveValue(16);
  });

  // is-invalid css class is applied when value is decimal
  test('is-invalid css class is applied when value is decimal', () => {
    const spyHandleChange = jest.fn();
    render(<InputNumber name="test" ariaLabel="test" handleChange={spyHandleChange} />);

    const field = screen.getByLabelText('test');
    const inputNumber = screen.getByRole('spinbutton', { name: 'test input' });

    userEvent.clear(inputNumber);
    userEvent.type(inputNumber, '15.5');

    expect(field).toHaveClass('is-invalid');
  });

  // is-invalid css class is applied when value is empty
  test('is-invalid css class is applied when value is empty', () => {
    const spyHandleChange = jest.fn();
    render(<InputNumber name="test" ariaLabel="test" handleChange={spyHandleChange} />);

    const field = screen.getByLabelText('test');
    const inputNumber = screen.getByRole('spinbutton', { name: 'test input' });

    userEvent.clear(inputNumber);
    userEvent.type(inputNumber, '');

    expect(field).toHaveClass('is-invalid');
  });

  // is-invalid css class is applied when value is non-numeric
  test('is-invalid css class is applied when value is non-numeric', () => {
    const spyHandleChange = jest.fn();
    render(<InputNumber name="test" ariaLabel="test" handleChange={spyHandleChange} />);

    const field = screen.getByLabelText('test');
    const inputNumber = screen.getByRole('spinbutton', { name: 'test input' });

    userEvent.clear(inputNumber);
    userEvent.type(inputNumber, 'a');

    expect(field).toHaveClass('is-invalid');
  });
});
