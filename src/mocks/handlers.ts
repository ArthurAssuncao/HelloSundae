import { rest } from 'msw';
import { SERVER_URL } from '../constants';

const scoopsHandler = rest.get(SERVER_URL.get.scoops, (req, res, ctx) => {
  return res(
    ctx.json([
      {
        name: 'Chocolate',
        imagePath: '/images/chocolate.png',
      },
      {
        name: 'Vanilla',
        imagePath: '/images/vanilla.png',
      },
    ]),
  );
});

const toppingsHandler = rest.get(SERVER_URL.get.toppings, (req, res, ctx) => {
  return res(
    ctx.json([
      {
        name: 'Cherries',
        imagePath: '/images/cherries.png',
      },
      {
        name: 'M&Ms',
        imagePath: '/images/m-and-ms.png',
      },
      {
        name: 'Hot fudge',
        imagePath: '/images/hot-fudge.png',
      },
    ]),
  );
});

const orderHandler = rest.post(SERVER_URL.post.order, (req, res, ctx) => {
  return res(ctx.status(201), ctx.json({ orderNumber: '123456789' }));
});

export const handlers = [scoopsHandler, toppingsHandler, orderHandler];
