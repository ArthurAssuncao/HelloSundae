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

const handlersOrderConfirmation = [
  rest.post(SERVER_URL.post.order, (req, res, ctx) => {
    return res.once(ctx.status(201), ctx.json({ orderNumber: 123456789 }));
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

  // orderNumber displays Loading when orderNumber is null
  test('orderNumber displays Loading when orderNumber is null', async () => {
    const spySetOrderPhase = jest.fn();
    render(<OrderConfirmation setOrderPhase={spySetOrderPhase} />);

    const orderNumber = await screen.findByRole('heading', {
      name: /Loading.../i,
    });
    expect(orderNumber).toBeInTheDocument();
  });

  // displays correct orderNumber received from other page
  test('displays correct orderNumber received from other page', async () => {
    server.use(...handlersOrderConfirmation);

    const spySetOrderPhase = jest.fn();
    render(<OrderConfirmation setOrderPhase={spySetOrderPhase} />);

    const orderNumber = await screen.findByText(/Your order number is 123456789/i);
    expect(orderNumber).toBeInTheDocument();
    server.resetHandlers();
  });

  // button Create new order call onClick function
  test('button Create new order call onClick function', async () => {
    const spySetOrderPhase = jest.fn();
    render(<OrderConfirmation setOrderPhase={spySetOrderPhase} />);

    const button = await screen.findByRole('button', {
      name: /Create new order/i,
    });
    expect(button).toBeInTheDocument();

    const spyButton = jest.fn();
    button.onclick = spyButton;

    button.click();
    expect(spyButton).toHaveBeenCalled();
  });
});
