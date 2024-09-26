import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userServices from "../services/userServices";
import "./Verify.css";
import { useFormik } from "formik";
import { toast } from "react-toastify";

const validate = (values) => {
  let error = {};
  const lowercase = /[a-z]/;
  const uppercase = /[A-Z]/;
  const specialChar = /[~!@#$%^&*()_+{}:'"|<,>.]/;
  const password = values.password;
  const confirmPassword = values.confirmPassword;
  if (!password) {
    error.password = "*Required";
  } else if (password.length <= 8) {
    error.password = "Password must contain min length 8";
  } else if (!uppercase.test(password)) {
    error.password = "Password must contain one uppercase letter";
  } else if (!lowercase.test(password)) {
    error.password = "Password must contain one lowercase letter";
  } else if (!specialChar.test(password)) {
    error.password = "Password must contain one special character";
  } else if (password != confirmPassword) {
    error.confirmPassword = "Passwords don’t match.";
  }

  return error;
};

const Reset = () => {
  const { key } = useParams();
  const [visibility, setVisibility] = useState({
    password: false,
    confirmPassword: false,
  });
  const style = {
    color: "red",
    fontWeight: "italic",
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: (values) => {
      toast.loading("Password was changing...");
      userServices
        .reset(key, values.password)
        .then((response) => {
          const message = response.data.message;
          toast.dismiss();
          toast.success(message);
          values.password = "";
          values.confirmPassword = "";
        })
        .catch((e) => {
          const message = e.response.data.message;
          toast.dismiss();
          return toast.error(message);
        });
    },
  });
  return (
    <div>
      <div >
        <center>
          <form className="card" onSubmit={formik.handleSubmit}>
            <h1>New Password</h1>
            <div>
              <input
                type={visibility.password ? "text" : "password"}
                placeholder="Please Enter Your Register password..."
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              &nbsp;&nbsp;&nbsp;
              <span
                className="icon"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setVisibility({
                    password: !visibility.password,
                    confirmPassword: visibility.confirmPassword,
                  });
                }}
              >
                {visibility.password ? "🙉" : "🙈"}
              </span>
            </div>
            <div style={style}>{formik.errors.password}</div>
            <h1>Confirm Password</h1>
            <div>
              <input
                type={visibility.confirmPassword ? "text" : "password"}
                placeholder="Please Enter Your Register password..."
                name="confirmPassword"
                id="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
              />
              <span
                className="icon"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setVisibility({
                    confirmPassword: !visibility.confirmPassword,
                    password: visibility.password,
                  });
                }}
              >
                {visibility.confirmPassword ? "🙉" : "🙈"}
              </span>
            </div>
            <div style={style}>{formik.errors.confirmPassword}</div>
            <button type="submit" className="btn btn-primary">
              SUBMIT
            </button>
          </form>
        </center>
      </div>
    </div>
  );
};

export default Reset;
