import { rest } from 'msw';

export const handlers = [
  rest.get(`${process.env.SERVER_URL as string}scoops`, (req, res, ctx) => {
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
  }),
];
