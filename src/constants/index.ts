export const PRICE_PER_ITEM = {
  scoops: 2,
  toppings: 1.5,
};

export const SERVER_URL = {
  base: `${process.env.NEXT_PUBLIC_SERVER_URL as string}`,
  get: {
    scoops: `${process.env.NEXT_PUBLIC_SERVER_URL_API as string}/scoops`,
    toppings: `${process.env.NEXT_PUBLIC_SERVER_URL_API as string}/toppings`,
  },
  post: {
    order: `${process.env.NEXT_PUBLIC_SERVER_URL_API as string}/order`,
  },
};
