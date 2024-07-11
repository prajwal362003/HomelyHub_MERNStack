import React from "react";
import { useState, useEffect } from "react";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../Store/User/user-action";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useDispatch(); // sending the actions

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
    setEmailSent(true); // after dispatch action setEmailSent is true
  };
  return (
    <>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          {!emailSent ? (
            <form onSubmit={submitHandler}>
              <h1 className="password_title">Forgot Password</h1>
              <div className="form-group">
                <label htmlFor="email_field">Enter Email</label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                className="btn-block py-3 password-btn"
                id="forgot_password_button"
                type="submit"
              >
                Send Email
              </button>
            </form>
          ) : (
            <div>Email sent. Please check your Inbox</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
