import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { server } from '../../../mocks/server';
import { OrderEntry } from './';

const handlersStatus500 = [
  rest.get(
    `${process.env.REACT_APP_SERVER_URL as string}scoops`,
    (req, res, ctx) => {
      return res(ctx.status(500));
    },
  ),
  rest.get(
    `${process.env.REACT_APP_SERVER_URL as string}toppings`,
    (req, res, ctx) => {
      return res(ctx.status(500));
    },
  ),
];

describe('OrderEntry component', () => {
  test('handlers error for scoops and toppings routes', async () => {
    server.resetHandlers(...handlersStatus500);

    render(<OrderEntry />);

    await waitFor(async () => {
      const alerts = await screen.findAllByRole('alert');

      expect(alerts).toHaveLength(2);
    });
  });
});
