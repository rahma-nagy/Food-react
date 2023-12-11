import React, { useContext, useEffect, useState } from "react";
import logo from "../../../assets/imgs/4 3.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../context/AuthContext";

export default function Register({ setUserData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
              <h3>Register</h3>
              <p className="text-color">
                welcome Back!Please enter your details
              </p>

              <div className="row my-2">
                <div className="col-md-6 ">
                <input
                  className="form-control email  px-4 "
                  type="text"
                  placeholder="Enter your user name"
                  {...register(" userName", {
                    required: true,
                  })}
                />

                {errors?. userName?.type && (
                  <span className="text-danger">
                    {errors?. userName?.type === "required"
                      ? " userName is Required"
                      : " userName pattern dosn't match"}
                  </span>
                   )}
                   <i className="fa-solid fa-mobile"></i>
                </div>
                              
                <div className="col-md-6">
                <input
                  className="form-control email  px-4 "
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: true,
                  })}
                />

                {errors?.password?.type && (
                  <span className="text-danger">
                    {errors?.password?.type === "required"
                      ? "password is Required"
                      : "password pattern dosn't match"}
                  </span>
                   )}
                   <i className="fa-solid fa-password"></i>
                </div>
              </div>

              
              <div className="row my-2">
                <div className="col-md-6 ">
                <div className="form-valid my-3">
                <input
                  className="form-control email  px-4 "
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: true,
                  })}
                />

                {errors?.email?.type && (
                  <span className="text-danger">
                    {errors?.email?.type === "required"
                      ? "email is Required"
                      : "email pattern dosn't match"}
                  </span>
                   )}
                   <i className="fa-solid fa-mobile"></i>
                 </div>
            
                </div>
                <div className="col-md-6">
                <div className="form-valid my-3">
                <input
                  className="form-control email  px-4 "
                  type="text"
                  placeholder="Enter your country"
                  {...register("country", {
                    required: true,
                  })}
                />

                {errors?.country?.type && (
                  <span className="text-danger">
                    {errors?.country?.type === "required"
                      ? "country is Required"
                      : "country pattern dosn't match"}
                  </span>
                   )}
                   <i className="fa-solid fa-mobile"></i>
                 </div>
                </div>
                <div className="col-md-6">
                <input
                  className="form-control email px-4 "
                  type="number"
                  placeholder="Enter your phone number"
                  {...register("phoneNumber", {
                    required: true,
                  })}
                />

                {errors?.phoneNumber?.type && (
                  <span className="text-danger">
                    {errors?.phoneNumber?.type === "required"
                      ? "phoneNumber is Required"
                      : "phoneNumber pattern dosn't match"}
                  </span>
                   )}
                   <i className="fa-solid fa-mobile"></i>
                </div>

                <div className="col-md-6">
                <input
                  className="form-control email px-4 "
                  type="password"
                  placeholder="Enter your confirm pass"
                  {...register("confirmPassword", {
                    required: true,
                  })}
                />

                {errors?.confirmPassword?.type && (
                  <span className="text-danger">
                    {errors?.confirmPassword?.type === "required"
                      ? "confirmPassword is Required"
                      : "confirmPassword pattern dosn't match"}
                  </span>
                   )}
                   <i className="fa-solid fa-mobile"></i>
                </div>
              </div>
             
              <button
                className="bg-success form-control text-white logBtn"
                disabled={isLoading}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
