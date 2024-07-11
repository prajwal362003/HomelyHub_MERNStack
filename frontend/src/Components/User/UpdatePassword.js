import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../../Store/User/user-action";
import { userActions } from "../../Store/User/user-slice";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [password, setPassword] = useState("");
  const { errors, success } = useSelector((state) => state.user);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.error("Password does not match");
      return false;
    } else {
      dispatch(updatePassword({ passwordConfirm, password, passwordCurrent }));
    }
  };

  useEffect(() => {
    if (errors) {
      toast.error(errors);
      dispatch(userActions.clearError());
    } else if (success) {
      toast.success("Password updated successfully");
      navigate("/profile");
      dispatch(userActions.getPasswordSuccess(false));
    }
  }, [errors, dispatch, navigate, success]);

  return (
    <>
      <div className="row wrapper">
        <div className="col-10 col-lg-5 updateprofile">
          <form onSubmit={submitHandler}>
            <h1 className="password_title">Update Password</h1>
            {/*Current Password */}
            <div className="form-group">
              <label htmlFor="passwordCurrent_field">Password Current</label>
              <input
                type="password"
                id="passwordCurrent_field"
                className="form-control"
                value={passwordCurrent}
                onChange={(e) => setPasswordCurrent(e.target.value)}
              />
            </div>

            {/*New Password */}
            <div className="form-group">
              <label htmlFor="new_password_field">New Password</label>
              <input
                type="password"
                id="new_password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/*New Password Confirm */}
            <div className="form-group">
              <label htmlFor="new_password_confirm_field">
                New Password Confirm
              </label>
              <input
                type="password"
                id="new_password_confirm_field"
                className="form-control"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>

            <button className="btn-block py-3 password-btn" type="submit">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
