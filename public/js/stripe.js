// import { loadStripe } from '@stripe/stripe-js';
// import axios from 'axios';
// import { showAlert } from './alerts';

// const stripePromise = loadStripe(
//   'pk_test_51RkTCARk2c7gJ7HcX4zIkoK7SrZQOUwpE2xA9PEov1atSD7OY3PBMochFrgyuY9riGSUXoqGtDlZMxM71OSsT2TD00qThjsiRg',
// );
// export const bookTour = async (tourId) => {
//   try {
//     const session = await axios(
//       `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`,
//     );
//     const stripe = await stripePromise;

//     await stripe.redirectToCheckout({
//       sessionId: session.data.session.id,
//     });
//   } catch (err) {
//     console.log(err);
//     showAlert('error', err);
//   }
// };
import axios from 'axios';
import { showAlert } from './alerts';

const stripePromise = Stripe(
  'pk_test_51RkTCARk2c7gJ7HcX4zIkoK7SrZQOUwpE2xA9PEov1atSD7OY3PBMochFrgyuY9riGSUXoqGtDlZMxM71OSsT2TD00qThjsiRg',
);
export const bookTour = async (tourId) => {
  try {
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    const stripe = await stripePromise;

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
