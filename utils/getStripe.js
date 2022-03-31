import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = (key) => {
  if (!stripePromise) {
    stripePromise = loadStripe(key);
  }

  return stripePromise;
};

export default getStripe;
