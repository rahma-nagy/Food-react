import React, { useContext, useEffect, useState } from "react";
import logo from "../../../assets/imgs/4 3.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../context/AuthContext";
import FacebookLogin from "../../../AuthModule/Components/FacebookLogin/FacebookLogin.jsx";

export default function Login({ setUserData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    console.log('Login successful', data);
  };
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { baseUrl } = useContext(AuthContext);
  const [formErr, setFormErr] = useState(null);

  const onSubmit = (data) => {
    setFormErr(null);
    axios
      .post(`${baseUrl}/Users/Login`, data)
      .then((response) => {
        localStorage.setItem("userToken", response?.data?.token);
        setUserData(response.data.token);
        navigate("/dashboard");

      })
      .catch((error) => {
        toast(error?.response?.data?.message);
      });
  };

  const onError = (err) => {
    Object.keys(err).length > 0 ? setFormErr(err) : setFormErr(null);
  };

  return (
    <div className="Auth-container">
      <div className="row bg-overlay  vh-100">
        <div className="col-md-6 m-auto">
          <div className="bg-white p-2">
            <div className="img text-center ">
              <img src={logo} className="w-50" alt="logo" />
            </div>

            <form
              className="w-75 m-auto"
              onSubmit={handleSubmit(onSubmit, onError)}
            >
              <h3>Log In</h3>
              <p className="text-color">
                welcome Back!Please enter your details
              </p>
              <div className="form-valid my-3">
                <input
                  className="form-control email  px-4 "
                  type="email"
                  placeholder="Enter your E-mail"
                  {...register("email", {
                    required: true,
                    pattern: /^/,
                  })}
                />

                {formErr?.email?.type && (
                  <span className="text-danger">
                    {formErr?.email?.type === "required"
                      ? "Email is Required"
                      : "Email pattern dosn't match"}
                  </span>
                )}
                <i className="fa-solid fa-mobile"></i>
              </div>
              <div className="form-valid my-3">
                <input
                  className="form-control px-4"
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: true,
                    pattern:
                      /^/,
                  })}
                />
                {formErr?.password?.type && (
                  <span className="text-danger">
                    {formErr?.password?.type === "required"
                      ? "Password is Required"
                      : "Password pattern dosn't match"}
                  </span>
                )}

                <i className="fa-solid fa-lock"></i>
              </div>
              <div className="form-group  my-3 position-relative d-flex justify-content-between">
              <Link to="/Register" className="text-success">
                  register now?
                </Link>
                <Link to="/RequestResetPassword" className="text-success">
                  Forget Password?
                </Link>
              </div>
              <button
                className="bg-success form-control text-white logBtn"
                disabled={isLoading}
              >
                Login
              </button>
              <div>
     <i class="fa-brands fa-facebook"></i>
      <FacebookLogin onLogin={handleLogin}/>
      </div>
            </form>

            
          </div>
        </div>

      </div>
    </div>
  );
}
