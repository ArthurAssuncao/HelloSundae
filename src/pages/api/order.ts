import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  if (req.method === 'POST') {
    const orderNumber = Math.floor(Math.random() * 10000000000);

    res.status(201).json({ orderNumber });
  }
};
