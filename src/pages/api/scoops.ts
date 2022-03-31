import { NextApiRequest, NextApiResponse } from 'next';

interface ScoopServerResponse {
  name: string;
  imagePath: string;
}

const data: ScoopServerResponse[] = [
  {
    name: 'Mint chip',
    imagePath: '/images/mint-chip.png',
  },
  {
    name: 'Vanilla',
    imagePath: '/images/vanilla.png',
  },
  {
    name: 'Chocolate',
    imagePath: '/images/chocolate.png',
  },
  {
    name: 'Salted caramel',
    imagePath: '/images/salted-caramel.png',
  },
];

export default (req: NextApiRequest, res: NextApiResponse): void => {
  res.send(data);
};
