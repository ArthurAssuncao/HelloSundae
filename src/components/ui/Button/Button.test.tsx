import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button component', () => {
  // children prop is passed
  test('children prop is passed', () => {
    const buttonChildren = 'Hello Button';
    const spyOnClick = jest.fn();
    render(
      <Button ariaLabel="" onClick={spyOnClick}>
        {buttonChildren}
      </Button>,
    );

    const button = screen.getByRole('button');

    expect(button).toHaveTextContent(buttonChildren);
  });

  // type is button when type prop not passed
  test('type is button when type prop not passed', () => {
    const buttonChildren = 'Hello Button';
    const spyOnClick = jest.fn();
    render(
      <Button ariaLabel="" onClick={spyOnClick}>
        {buttonChildren}
      </Button>,
    );

    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('type', 'button');
  });

  // type submit prop is passed
  test('type submit prop is passed', () => {
    const buttonChildren = 'Hello Button';
    const spyOnClick = jest.fn();

    render(
      <Button ariaLabel="" type="submit" onClick={spyOnClick}>
        {buttonChildren}
      </Button>,
    );

    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('type', 'submit');
  });

  // type reset prop is passed
  test('type reset prop is passed', () => {
    const buttonChildren = 'Hello Button';
    const spyOnClick = jest.fn();

    render(
      <Button ariaLabel="" type="reset" onClick={spyOnClick}>
        {buttonChildren}
      </Button>,
    );

    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('type', 'reset');
  });

  // aria-label prop is passed
  test('aria-label prop is passed', () => {
    const buttonChildren = 'Hello Button';
    const spyOnClick = jest.fn();
    const ariaLabel = 'Button label';

    render(
      <Button ariaLabel={ariaLabel} onClick={spyOnClick}>
        {buttonChildren}
      </Button>,
    );

    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('aria-label', ariaLabel);
  });

  // button is enable when disabled is undefined
  test('button is enable when disabled is undefined', () => {
    const buttonChildren = 'Hello Button';
    const spyOnClick = jest.fn();
    const ariaLabel = 'Button label';

    render(
      <Button ariaLabel={ariaLabel} onClick={spyOnClick}>
        {buttonChildren}
      </Button>,
    );

    const button = screen.getByRole('button');

    expect(button).toBeEnabled();
  });

  // button is enable when disabled is false
  test('button is enable when disabled is false', () => {
    const buttonChildren = 'Hello Button';
    const spyOnClick = jest.fn();
    const ariaLabel = 'Button label';

    render(
      <Button ariaLabel={ariaLabel} onClick={spyOnClick} disabled={false}>
        {buttonChildren}
      </Button>,
    );

    const button = screen.getByRole('button');

    expect(button).toBeEnabled();
  });

  // button is disabled when disabled is true
  test('button is disabled when disabled is true', () => {
    const buttonChildren = 'Hello Button';
    const spyOnClick = jest.fn();
    const ariaLabel = 'Button label';

    render(
      <Button ariaLabel={ariaLabel} type="submit" disabled={true} onClick={spyOnClick}>
        {buttonChildren}
      </Button>,
    );

    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
  });

  // onClick is called when the button is clicked
  test('onClick is called when the button is clicked', () => {
    const buttonChildren = 'Hello Button';
    const spyOnClick = jest.fn();
    const ariaLabel = 'Button label';

    render(
      <Button ariaLabel={ariaLabel} onClick={spyOnClick}>
        {buttonChildren}
      </Button>,
    );

    const button = screen.getByRole('button');

    expect(spyOnClick).not.toHaveBeenCalled();

    button.click();

    expect(spyOnClick).toHaveBeenCalled();
  });

  // onClick is called when the disabled button is clicked
  test('onClick is called when the disabled button is clicked', () => {
    const buttonChildren = 'Hello Button';
    const spyOnClick = jest.fn();
    const ariaLabel = 'Button label';

    render(
      <Button ariaLabel={ariaLabel} disabled={true} onClick={spyOnClick}>
        {buttonChildren}
      </Button>,
    );

    const button = screen.getByRole('button');

    expect(spyOnClick).not.toHaveBeenCalled();

    button.click();

    expect(spyOnClick).not.toHaveBeenCalled();
  });
});
