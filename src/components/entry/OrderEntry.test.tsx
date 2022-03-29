import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { OrderEntry } from '.';
import { SERVER_URL } from '../../constants';
import { server } from '../../mocks/server';
import { renderWithContext } from '../../test-utils/testing-library-utils';

const handlersStatus500 = [
  rest.get(SERVER_URL.get.scoops, (req, res, ctx) => {
    return res(ctx.status(500));
  }),
  rest.get(SERVER_URL.get.toppings, (req, res, ctx) => {
    return res(ctx.status(500));
  }),
];

describe('OrderEntry component', () => {
  test('handlers error for scoops and toppings routes', async () => {
    server.resetHandlers(...handlersStatus500);

    const spySetOrderPhase = jest.fn();
    render(<OrderEntry setOrderPhase={spySetOrderPhase} />);

    await waitFor(async () => {
      const alerts = await screen.findAllByRole('alert');

      expect(alerts).toHaveLength(2);
    });
    server.resetHandlers();
  });

  test('button click starts disabled', () => {
    const spySetOrderPhase = jest.fn();
    render(<OrderEntry setOrderPhase={spySetOrderPhase} />);

    const buttonSubmit = screen.getByRole('button', { name: 'Order Sundae' });
    expect(buttonSubmit).toBeDisabled();
  });

  test('button enable when some scoop is chosen', async () => {
    const spySetOrderPhase = jest.fn();
    renderWithContext(<OrderEntry setOrderPhase={spySetOrderPhase} />);

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    const buttonSubmit = screen.getByRole('button', { name: 'Order Sundae' });
    expect(buttonSubmit).toBeEnabled();
  });

  test('button click call onSubmit function', async () => {
    const promise = Promise.resolve();

    const spy = jest.fn(() => promise);
    const spySetOrderPhase = jest.fn();
    renderWithContext(<OrderEntry setOrderPhase={spySetOrderPhase} />);

    const buttonSubmit = screen.getByRole('button', { name: 'Order Sundae' });

    expect(buttonSubmit).toBeDisabled();
    // buttonSubmit.setAttribute('disabled', 'false');
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    expect(buttonSubmit).toBeEnabled();

    buttonSubmit.onclick = spy;
    userEvent.click(buttonSubmit);

    expect(spy).toHaveBeenCalled();
    await act(() => promise);
  });

  test('Disabled order button for No scoops', () => {
    const spySetOrderPhase = jest.fn();
    render(<OrderEntry setOrderPhase={spySetOrderPhase} />);

    const buttonSubmit = screen.getByRole('button', { name: 'Order Sundae' });

    expect(buttonSubmit).toBeDisabled();
  });
});
