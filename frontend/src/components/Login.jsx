import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { Button, Input } from "./index";
import { ClipLoader } from "react-spinners";

const Userlogin = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setError("");
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/login`,
        data
      );
      if (response.data.data) {
        sessionStorage.setItem("accessToken", response.data.data.accessToken);
        sessionStorage.setItem("refreshToken", response.data.data.refreshToken);
        sessionStorage.setItem("userId", response.data._id);
        dispatch(authLogin(response.data.data));
        toast.success("login successfully");
      }
    } catch (error) {
      toast.error("LogIn failed: invalid credentials or server error")
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex m-auto items-center justify-center">
        <div
          className={`mx-auto w-full max-w-md font-mono bg-white rounded-xl p-10 border border-black/10`}
        >
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
              {/* <Logo width="100%" /> */}
            </span>
          </div>
          <h2 className="text-start text-2xl  mb-4 ">
            Sign in to your account
          </h2>

          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5 ">
              <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Invalid email format",
                  },
                })}
              />
              <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <Button type="submit" className="w-full font-serif" disabled={loading}>
                {loading ? <ClipLoader size={24} color={"#ffffff"} /> : 
                <div className="flex flex-row justify-center">
                  Login
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-5 ml-1 mt-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </div>
                }
              </Button>
            </div>
          </form>
          <p className="mt-4 text-center text-base  text-gray-800">
            Don&apos;t have any account?&nbsp;
            <Link
              to="/signup"
              className="font-extralight text-primary transition-all duration-200 hover:underline "
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export { Userlogin };
