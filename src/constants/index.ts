export const PRICE_PER_ITEM = {
  scoops: 2,
  toppings: 1.5,
};

export const SERVER_URL = {
  base: `${process.env.REACT_APP_SERVER_URL as string}`,
  get: {
    scoops: `${process.env.REACT_APP_SERVER_URL as string}scoops`,
    toppings: `${process.env.REACT_APP_SERVER_URL as string}toppings`,
  },
  post: {
    order: `${process.env.REACT_APP_SERVER_URL as string}order`,
  },
};
