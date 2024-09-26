import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useFormik } from "formik";
import userServices from "../services/userServices";
import { toast } from "react-toastify";
import "./Home.css";

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is required";
  }

  return errors;
};
const Home = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: (values) => {
      toast.loading(
        "Password reset link has been sending to your registered email id"
      );

      userServices
        .submit(values.email)
        .then((response) => {
          const message = response.data.message;
          toast.dismiss();
          toast.success(message);
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
    <center>
      <div className="container">
        <div>
          <form className="card" onSubmit={formik.handleSubmit}>
            <h1>Forgot Password</h1>
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
            <button type="submit" className="btn btn-primary">
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </center>
  );
};

export default Home;
