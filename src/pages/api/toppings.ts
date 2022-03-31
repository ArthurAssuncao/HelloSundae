import { NextApiRequest, NextApiResponse } from 'next';

interface ToppingServerResponse {
  name: string;
  imagePath: string;
}

const data: ToppingServerResponse[] = [
  {
    name: 'M&Ms',
    imagePath: '/images/m-and-ms.png',
  },
  {
    name: 'Hot fudge',
    imagePath: '/images/hot-fudge.png',
  },
  {
    name: 'Peanut butter cups',
    imagePath: '/images/peanut-butter-cups.png',
  },
  {
    name: 'Gummi bears',
    imagePath: '/images/gummi-bears.png',
  },
  {
    name: 'Mochi',
    imagePath: '/images/mochi.png',
  },
  {
    name: 'Cherries',
    imagePath: '/images/cherries.png',
  },
];

export default (req: NextApiRequest, res: NextApiResponse): void => {
  res.send(data);
};
