import { useFormik } from "formik";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./Sign.css";
import userServices from "../services/userServices";
import { Link, useNavigate } from "react-router-dom";

const validate = (values) => {
  let error = {};
  const lowercase = /[a-z]/;
  const uppercase = /[A-Z]/;
  const specialChar = /[~!@#$%^&*()_+{}:'"|<,>.]/;
  const password = values.password;
  const confirmPassword = values.confirmPassword;
  if (!values.name) {
    error.name = "Name is required";
  } else if (!values.email) {
    error.email = "Email is required";
  } else if (!password) {
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

const Sign = () => {
  const [visibility, setVisibility] = useState({
    password: false,
    confirmPassword: false,
  });
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: (values) => {
      toast.loading("Registering with given details");
      const { name, email, password } = values;
      userServices
        .register(name, email, password)
        .then((response) => {
          formik.resetForm();
          const message = response.data.message;
          toast.dismiss();
          toast.success(message);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        })
        .catch((e) => {
          const message = e.response.data.message;
          toast.dismiss();
          return toast.error(message);
        });
    },
  });
  const style = {
    color: "red",
    fontWeight: "italic",
  };

  return (
    <div>
      <div>
        <center>
          <form onSubmit={formik.handleSubmit}>
            <div className="card1">
              <h2>Name</h2>
              <div>
                <input
                  type="text"
                  placeholder="Please Enter Your Name..."
                  name="name"
                  id="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
              </div>
              <div style={style}>{formik.errors.name}</div>
              <h2>Email</h2>
              <div>
                <input
                  type="email"
                  placeholder="Please Enter Your Email..."
                  name="email"
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </div>
              <div style={style}>{formik.errors.email}</div>
              <h2>Password</h2>
              <div>
                <input
                  type={visibility.password ? "text" : "password"}
                  placeholder="Please Enter Your password..."
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
              <h2>Confirm Password</h2>
              <div>
                <input
                  type={visibility.confirmPassword ? "text" : "password"}
                  placeholder="Please Enter Your Confirm password..."
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                />
                &nbsp;&nbsp;&nbsp;
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
              <center>
                <button type="submit" className="btn btn-primary">
                  SUBMIT
                </button>
                <br /> <Link to={"/"}>I already have account</Link>
              </center>
            </div>
          </form>
        </center>
      </div>
    </div>
  );
};

export default Sign;
