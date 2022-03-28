import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { SERVER_URL } from '../../constants';
import { server } from '../../mocks/server';
import { OrderConfirmation } from './OrderConfirmation';

const handlersOrderStatus500 = [
  rest.post(SERVER_URL.post.order, (req, res, ctx) => {
    return res.once(ctx.status(500));
  }),
];

describe('Order Confirmation tests', () => {
  // order confirmation is displayed
  test('Order confirmation is displayed', async () => {
    const spySetOrderPhase = jest.fn();
    render(<OrderConfirmation setOrderPhase={spySetOrderPhase} />);

    const orderConfirmation = await screen.findByRole('heading', {
      name: /Loading.../i,
    });
    expect(orderConfirmation).toBeInTheDocument();

    const thankYouHeader = await screen.findByRole('heading', {
      name: /Thank you/i,
    });
    expect(thankYouHeader).toBeInTheDocument();
  });

  test('error response from server for submitting order', async () => {
    server.use(...handlersOrderStatus500);

    const spySetOrderPhase = jest.fn();
    render(<OrderConfirmation setOrderPhase={spySetOrderPhase} />);

    const alerts = await screen.findByRole('alert');
    expect(alerts).toHaveTextContent('An unexpected error occurred. Please try again later');
  });
  // order number starts out null
  // orderNumber displays Loading when orderNumber is null
  // orderNumber displays correct orderNumber received from other page
  // button Create new order call onClick function
  // button Create new order works (go back to order entry)
  // context is reseted on button Create new order click
  // add resetOrder in context return
});
