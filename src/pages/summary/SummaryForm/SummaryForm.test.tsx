/* eslint-disable max-lines-per-function */
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MouseEvent } from 'react';
import { SummaryForm } from './SummaryForm';

// checkbox
describe('<SummaryForm />', () => {
  // afterEach(cleanup);

  describe('Checkbox', () => {
    it('checkbox is unchecked by default and label is "I agree to Terms and Conditions"', () => {
      const spyOnFinished = jest.fn();
      render(<SummaryForm onFinished={spyOnFinished} />);

      const checkbox = screen.getByRole('checkbox');
      const checkboxLabel = screen.getByLabelText(
        'I agree to Terms and Conditions',
      );

      expect(checkbox).not.toBeChecked();
      expect(checkboxLabel).toBeInTheDocument(); // toHaveTextContent("I agree to");
    });

    it('checkbox turns checked when click in checkbox', () => {
      const spyOnFinished = jest.fn();
      render(<SummaryForm onFinished={spyOnFinished} />);

      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).not.toBeChecked();
      userEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    it('checkbox turns checked when click in label', () => {
      const spyOnFinished = jest.fn();
      render(<SummaryForm onFinished={spyOnFinished} />);

      const checkbox = screen.getByRole('checkbox');
      const checkboxLabel = screen.getByLabelText(
        'I agree to Terms and Conditions',
      );

      expect(checkbox).not.toBeChecked();
      userEvent.click(checkboxLabel);
      expect(checkbox).toBeChecked();
    });

    describe('onChange()', () => {
      it('is called with the updated checked value on click', () => {
        const spy = jest.fn();
        const spyOnFinished = jest.fn();
        render(<SummaryForm onFinished={spyOnFinished} />);

        const checkbox = screen.getByRole('checkbox');
        checkbox.onchange = spy;

        userEvent.click(checkbox);
        expect(spy).toHaveBeenCalled();
      });

      it('is called when space is pressed', () => {
        const spy = jest.fn();
        const spyOnFinished = jest.fn();
        render(<SummaryForm onFinished={spyOnFinished} />);

        const checkbox = screen.getByRole('checkbox');
        checkbox.onchange = spy;

        userEvent.click(checkbox, '{space}' as MouseEventInit, {
          skipPointerEventsCheck: true,
        });

        expect(spy).toHaveBeenCalledTimes(1);
        expect(checkbox).toBeChecked();
      });

      it('is called from keys other than space', () => {
        const spy = jest.fn();
        const spyOnFinished = jest.fn();
        render(<SummaryForm onFinished={spyOnFinished} />);

        const checkbox = screen.getByRole('checkbox');
        checkbox.onchange = spy;

        userEvent.click(checkbox, '{enter}' as MouseEventInit, {
          skipPointerEventsCheck: true,
        });

        expect(spy).toHaveBeenCalledTimes(1);
        expect(checkbox).toBeChecked();
      });

      it('is not called from keyboard events when disabled', () => {
        const spy = jest.fn();
        const spyOnFinished = jest.fn();
        render(<SummaryForm onFinished={spyOnFinished} />);

        const checkbox = screen.getByRole('checkbox');
        checkbox.setAttribute('disabled', 'disabled');
        checkbox.onchange = spy;

        userEvent.type(checkbox, '{space}');

        expect(spy).not.toHaveBeenCalled();
        expect(checkbox).not.toBeChecked();
      });

      it('is not called from click events when disabled', () => {
        const spy = jest.fn();
        const spyOnFinished = jest.fn();
        render(<SummaryForm onFinished={spyOnFinished} />);

        const checkbox = screen.getByRole('checkbox');
        checkbox.setAttribute('disabled', 'disabled');
        checkbox.onchange = spy;

        userEvent.click(checkbox);

        expect(spy).not.toHaveBeenCalled();
        expect(checkbox).not.toBeChecked();
      });
    });

    describe('onFocus()', () => {
      it('sets focus when tab is clicked', () => {
        const spy = jest.fn();
        const spyOnFinished = jest.fn();
        render(<SummaryForm onFinished={spyOnFinished} />);

        const checkbox = screen.getByRole('checkbox');
        checkbox.onchange = spy;

        userEvent.tab();

        expect(checkbox).toHaveFocus();
      });
    });

    describe('disabled', () => {
      it('can not change to checked when disabled and click in checkbox', () => {
        const spyOnFinished = jest.fn();
        render(<SummaryForm onFinished={spyOnFinished} />);

        const checkbox = screen.getByRole('checkbox');
        checkbox.setAttribute('disabled', 'disabled');

        expect(checkbox).not.toBeChecked();
        userEvent.click(checkbox);
        expect(checkbox).not.toBeChecked();
      });

      it('can not change to checked when disabled and click in label', () => {
        const spyOnFinished = jest.fn();
        render(<SummaryForm onFinished={spyOnFinished} />);

        const checkbox = screen.getByRole('checkbox');
        const checkboxLabel = screen.getByLabelText(
          'I agree to Terms and Conditions',
        );

        checkbox.setAttribute('disabled', 'disabled');

        expect(checkbox).not.toBeChecked();
        userEvent.click(checkboxLabel);
        expect(checkbox).not.toBeChecked();
      });
    });

    describe('helpText / title', () => {
      it('Has helpText/title', () => {
        const spyOnFinished = jest.fn();
        render(<SummaryForm onFinished={spyOnFinished} />);

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toHaveProperty('title');
      });
    });
  });

  describe('Label dialog', () => {
    it('Terms and Condition dialog appears on hover and disappear after 500ms on unhover in checkbox label', async () => {
      const spyOnFinished = jest.fn();
      render(<SummaryForm onFinished={spyOnFinished} />);

      // const checkbox = screen.getByRole('checkbox');
      const internSpan = screen.getByText('Terms and Conditions');

      const nullDialog = screen.queryByText(/App Terms and Conditions/i);

      expect(nullDialog).not.toBeInTheDocument();

      userEvent.hover(internSpan);

      const dialog = screen.getByText(/App Terms and Conditions/i);

      expect(dialog).toBeInTheDocument();

      // this way
      // jest.useFakeTimers();
      // userEvent.unhover(internSpan);
      // jest.runAllTimers();

      // const nullDialogAgain = screen.queryByText(/App Terms and Conditions/i);

      // expect(nullDialogAgain).not.toBeInTheDocument();

      // or this way
      userEvent.unhover(internSpan);
      await waitForElementToBeRemoved(
        screen.queryByText(/App Terms and Conditions/i),
      );
    });
  });

  describe('Button', () => {
    it('submit is called when clicked if enabled', () => {
      const spy = jest.fn();
      spy.mockImplementation((event: MouseEvent) => {
        event.preventDefault();
      });
      const spyOnFinished = jest.fn();
      render(<SummaryForm onFinished={spyOnFinished} />);

      const button = screen.getByRole('button', { name: /Confirm order/i });
      button.removeAttribute('disabled');

      button.onclick = spy;
      userEvent.click(button);

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Checkbox and Button interaction', () => {
    it('confirm button is disabled when checkbox is unchecked', () => {
      const spy = jest.fn();
      spy.mockImplementation((event: MouseEvent) => {
        event.preventDefault();
      });
      const spyOnFinished = jest.fn();
      render(<SummaryForm onFinished={spyOnFinished} />);

      const button = screen.getByRole('button', { name: /Confirm order/i });

      expect(button).toBeDisabled();

      button.onclick = spy;
      userEvent.click(button);

      expect(spy).not.toHaveBeenCalled();
    });

    it('confirm button is enabled when checkbox is checked', () => {
      const spy = jest.fn();
      spy.mockImplementation((event: MouseEvent) => {
        event.preventDefault();
      });
      const spyOnFinished = jest.fn();
      render(<SummaryForm onFinished={spyOnFinished} />);

      const checkbox = screen.getByRole('checkbox');
      const button = screen.getByRole('button', { name: /Confirm order/i });

      userEvent.click(checkbox);

      expect(button).toBeEnabled();

      button.onclick = spy;
      userEvent.click(button);

      expect(spy).toHaveBeenCalled();
    });
  });
});
