import { setPaymentDetails } from "./payment-slice";
import { CardNumberElement } from "@stripe/react-stripe-js";
import axios from "axios"; // for http requests
import { createBooking } from "../../Store/Booking/booking-action";

export const processPayment = ({
  totalAmount,
  stripe,
  elements,
  checkinDate,
  checkoutDate,
  propertyName,
  address,
  maximumGuest,
  bookingId,
  propertyId,
  nights,
  dispatch,
  navigate,
}) => {
  return async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      console.error("Stripe is not initialized");
      return;
    }
    const cardNumberElement = elements.getElement(CardNumberElement);
    try {
      const response = await axios.post(
        "https://homelyhub-backend-cmes.onrender.com/api/v1/rent/user/checkout-session",
        {
          amount: totalAmount,
          currency: "inr",
          paymentMethodType: ["card"],
          checkinDate,
          checkoutDate,
          propertyName,
          address,
          maximumGuest,
          bookingId,
          propertyId,
          nights,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardNumberElement,
        },
      });

      // After successfull payment create booking-action
      dispatch(
        createBooking({
          booking: bookingId,
          property: propertyId,
          price: totalAmount,
          guests: maximumGuest,
          fromDate: checkinDate,
          toDate: checkoutDate,
          nights,
        })
      );
      dispatch(
        setPaymentDetails({
          checkinDate,
          checkoutDate,
          totalPrice: totalAmount,
          propertyName,
          address,
          maximumGuest,
          nights,
        })
      );
      navigate("/user/booking");
    } catch (e) {
      console.error("Ërror processing payment:", e);
    }
  };
};
