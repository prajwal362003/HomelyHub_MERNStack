import React from "react";
import { useState } from "react";
import moment from "moment";
import { DatePicker, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPaymentDetails } from "../../Store/Payment/payment-slice";

const BookingForm = ({
  price,
  propertyName,
  address,
  maximumGuest,
  propertyId,
  currentBookings,
}) => {
  const [paymentData, setPaymentData] = useState({});
  const [userData, setUserData] = useState({});
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDateChange = (value, dateString) => {
    handleFilterChange("checkinDate", dateString[0]);
    handleFilterChange("checkoutDate", dateString[1]);

    const calculatedNights = moment(dateString[1], "YYYY-MM-DD").diff(
      moment(dateString[0], "YYYY-MM-DD"),
      "days"
    );

    const calculatedTotalPrice = price * calculatedNights;
    handleFilterChange("nights", calculatedNights);
    handleFilterChange("totalPrice", calculatedTotalPrice);
  };

  let disabledDates = [];
  currentBookings.forEach((dates) =>
    disabledDates.push({ start: dates.fromDate, end: dates.toDate })
  );

  const isDateDisabled = (current) => {
    if (!disabledDates.length) {
      return current.isBefore(Date.now(), "day");
    } else {
      return disabledDates.some((date) => {
        const startDate = new Date(date.start); // start date of the booking
        const endDate = new Date(date.end).setHours(23, 59, 59, 999); // set the time to last millisecond of the time
        const currentDate = new Date(current);
        return (
          current.isBefore(Date.now(), "day") ||
          (currentDate >= startDate && currentDate <= endDate)
        );
      });
    }
  };

  const handleFilterChange = (keyName, value) => {
    setPaymentData((prevData) => ({
      ...prevData,
      [keyName]: value,
    }));
  };

  const handleBookPlace = (e) => {
    e.preventDefault();
    if (
      userData?.name &&
      userData?.guests &&
      userData?.phoneNo &&
      paymentData?.checkinDate &&
      paymentData?.checkoutDate
    ) {
      dispatch(
        setPaymentDetails({
          ...paymentData,
          propertyName,
          address,
          maximumGuest,
        })
      );
      navigate(`/payment/${propertyId}`);
    } else {
    }
  };

  return (
    <div className="form-container">
      <form className="payment-form" onSubmit={handleBookPlace}>
        <div className="price-pernight">
          <b>&#8377;{price}</b> {/*Code(&#8377) is to display the rs symbol*/}
          <span> / per night</span>
        </div>
        <div className="payment-field">
          <div className="date">
            <Space direction="vertical" size={"12"}>
              <RangePicker
                format="YYYY-MM-DD"
                onChange={handleDateChange}
                disabledDate={isDateDisabled}
              />
            </Space>
          </div>
          <div className="guest">
            <label className="payment-labels">Number of Guests:</label>
            <br />

            <input
              className="no-of-guests"
              placeholder="Number of Guests"
              type="number"
              min="1"
              max={maximumGuest}
              required
              // Update the number of huests when user inputs it
              onChange={(e) => {
                setUserData((prev) => ({ ...prev, guests: e.target.value }));
              }}
            />
          </div>
          <div className="name-phoneno">
            <label className="payment-labels">Your Full Name:</label>
            <br />
            <input
              type="text"
              className="Name"
              placeholder="Name"
              required
              // Update the Name when user inputs it
              onChange={(e) => {
                setUserData((prev) => ({ ...prev, name: e.target.value }));
              }}
              minLength="3"
            />

            <br />

            <label className="payment-labels">Phone Number:</label>
            <br />
            <input
              type="tel"
              className="phone-number"
              placeholder="Number"
              maxLength="10"
              required
              // Update the Number when user inputs it
              onChange={(e) => {
                setUserData((prev) => ({ ...prev, phoneNo: e.target.value }));
              }}
              pattern="[0-9]{10}"
            />
          </div>
        </div>

        <div className="book-place">
          <button className="book-btn">
            Book this place &#8377;{paymentData["totalPrice"] || 0}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
