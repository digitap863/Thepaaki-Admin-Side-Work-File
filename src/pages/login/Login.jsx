import "./login.css";

import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { logInAdmin } from "../../redux/slices/AdminData";
import { useSelector, useDispatch } from "react-redux";

const Login = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const AdminDeatails = useSelector((state) => state.admin.value);
  useEffect(() => {
    if (AdminDeatails && AdminDeatails.Token) {
      history("/home");
    }
  }, [AdminDeatails]);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/superAdmin/login",
        {
          email,
          password,
        },
        config
      );

      dispatch(logInAdmin(data));
      history("/home");
    } catch (error) {
      swal("OOPS!", "Email And Password Incorrect!", "error");
    }
  };
  return (
    <div className="containerr">
      <div className="screen align-items-center">
        <div className="screen__content">
          <form onSubmit={handleSubmit(onSubmit)} className="p-3 mt-3">
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                type="text"
                className="login__input"
                placeholder="User name / Email"
                {...register("email", {
                  required: "email is required",
                  pattern: {
                    value: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "invalid email address",
                  },
                })}
                onKeyUp={() => {
                  trigger("email");
                }}
              />

              {errors.email && (
                <div>
                  <small className="text-danger">{errors.email.message}</small>
                </div>
              )}
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                type="password"
                className="login__input"
                placeholder="Password"
                {...register("password", {
                  required: "password is required",
                  //   pattern: {
                  //     value: /^[a-zA-Z]$/,
                  //     message: "Invalid password address",
                  //   },
                })}
                onKeyUp={() => {
                  trigger("password");
                }}
              />
              {errors.password && (
                <div>
                  <small className="text-danger">
                    {errors.password.message}
                  </small>
                </div>
              )}
            </div>
            <button className="button login__submit">
              <span className="button__text">Log In Now</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
          <div className="social-login">
            <h3>log in via</h3>
            <div className="social-icons">
              {/* <a href="#" className="social-login__icon fab fa-instagram"></a>
              <a href="#" className="social-login__icon fab fa-facebook"></a>
              <a href="#" className="social-login__icon fab fa-twitter"></a> */}
            </div>
          </div>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
