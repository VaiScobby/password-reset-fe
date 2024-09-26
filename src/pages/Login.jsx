import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import "./Sign.css";
import userServices from "../services/userServices";
import { Link, useNavigate } from "react-router-dom";

const validate = (values) => {
  let error = {};
  const password = values.password;
  if (!values.email) {
    error.email = "Email is required";
  } else if (!password) {
    error.password = "*Required";
  } else return error;
};

const Login = () => {
  const [visibility, setVisibility] = useState({
    password: false,
  });
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      toast.loading("Please Wait...");
      const { email, password } = values;
      userServices
        .login(email, password)
        .then((response) => {
          const message = response.data.message;
          toast.dismiss();
          toast.success(message);
          navigate("/");
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
      <center className="container">
        <div className="card3">
          <form onSubmit={formik.handleSubmit}>
            <div >
              <h2>Email</h2>
              <div>
                <input
                  type="email"
                  placeholder="Please Enter Your Register Email..."
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
                  placeholder="Please Enter Your Register password..."
                  name="password"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />

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
                  {" "}
                  {visibility.password ? "🙉" : "🙈"}
                </span>
              </div>
              <div style={style}>{formik.errors.password}</div>

              <center>
                <button type="submit" className="btn btn-primary">
                  Log In
                </button>
                <br />
                <Link to={"/forgot"}>Forgot Password</Link>
                <br />
                <Link to={"/signin"}>I don't have account</Link>
              </center>
            </div>
          </form>
        </div>
      </center>
    </div>
  );
};

export default Login;
