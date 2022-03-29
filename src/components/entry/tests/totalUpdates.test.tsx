import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithContext } from '../../../test-utils/testing-library-utils';
import { Options } from '../Options';
import { OrderEntry } from '../OrderEntry';

describe('Total updates', () => {
  test('update scoops subtotal when scoops change', async () => {
    // render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });
    renderWithContext(<Options optionType="scoops" />);

    // make sure total starts out $0.00
    const scoopsSubtotal = screen.getByText('Scoops total: $', {
      exact: false,
    });
    expect(scoopsSubtotal).toHaveTextContent('0.00');

    // update vanilla scoops to 1 and check subtotal
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');
    expect(scoopsSubtotal).toHaveTextContent('2.00');

    // update chocolate scoops to 2 and check subtotal
    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, '2');
    expect(scoopsSubtotal).toHaveTextContent('6.00');
  });

  test('update toppings subtotal when toppings change', async () => {
    renderWithContext(<Options optionType="toppings" />);

    // make sure total starts out $0.00
    const toppingsSubtotal = screen.getByText('Toppings total: $', {
      exact: false,
    });
    expect(toppingsSubtotal).toHaveTextContent('0.00');

    // add M&Ms toppings and check subtotal
    const memsCheckbox = await screen.findByRole('checkbox', {
      name: 'M&Ms',
    });

    userEvent.click(memsCheckbox);
    expect(memsCheckbox).toBeChecked();
    expect(toppingsSubtotal).toHaveTextContent('1.50');

    // add Hot fudge toppings check subtotal
    const hotFudgeCheckbox = await screen.findByRole('checkbox', {
      name: 'Hot fudge',
    });
    userEvent.click(hotFudgeCheckbox);
    expect(hotFudgeCheckbox).toBeChecked();
    expect(toppingsSubtotal).toHaveTextContent('3.00');

    // remove Hot fudge toppings
    userEvent.click(hotFudgeCheckbox);
    expect(hotFudgeCheckbox).not.toBeChecked();
    expect(toppingsSubtotal).toHaveTextContent('1.50');
  });

  test('grand total starts at $0.00', async () => {
    const spySetOrderPhase = jest.fn();
    renderWithContext(<OrderEntry setOrderPhase={spySetOrderPhase} />);

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent('0.00');

    // avoid unomonted component error forcing async and await mock server response
    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    });
    userEvent.clear(chocolateInput);
  });

  test('grand total updates properly if scoop is added first', async () => {
    const spySetOrderPhase = jest.fn();
    renderWithContext(<OrderEntry setOrderPhase={spySetOrderPhase} />);

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    expect(grandTotal).toHaveTextContent('2.00');

    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, '2');

    expect(grandTotal).toHaveTextContent('6.00');
  });

  test('grand total updates properly if topping is added first', async () => {
    const spySetOrderPhase = jest.fn();
    renderWithContext(<OrderEntry setOrderPhase={spySetOrderPhase} />);

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    const memsCheckbox = await screen.findByRole('checkbox', {
      name: 'M&Ms',
    });

    userEvent.click(memsCheckbox);

    expect(grandTotal).toHaveTextContent('1.50');

    const hotFudgeCheckbox = await screen.findByRole('checkbox', {
      name: 'Hot fudge',
    });
    userEvent.click(hotFudgeCheckbox);

    expect(grandTotal).toHaveTextContent('3.00');
  });

  test('grand total updates properly if item is removed', async () => {
    const spySetOrderPhase = jest.fn();
    renderWithContext(<OrderEntry setOrderPhase={spySetOrderPhase} />);

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    expect(grandTotal).toHaveTextContent('2.00');

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '0');

    expect(grandTotal).toHaveTextContent('0.00');
  });
});
