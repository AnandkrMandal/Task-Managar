import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { Button, Input } from "./index";
import { ClipLoader } from "react-spinners";

const RegisterUser = () => {
  const { register, handleSubmit } = useForm();
  //   const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    console.log(data);
    setError("");
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/register`,
        data
      );
      console.log("account created successfully", response.data);
      toast.success("account created successfully");
      //navigate("/login")
    } catch (error) {
      console.log("Registration failed", error.message);
      toast.error("Registration failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex items-center justify-center">
        <div
          className={`mx-auto w-full  font-mono max-w-md bg-white rounded-xl p-10 border border-black/10`}
        >
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
              {/* <Logo width="100%" /> */}
            </span>
          </div>
          <h2 className="text-start text-2xl mb-4 ">
            Sign up to create account
          </h2>

          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">
              <Input
                label="Username"
                placeholder="enter your username"
                {...register("username", {
                  required: "Full name is required",
                  pattern: {
                    value: /^[A-Za-z ]+$/i,
                    message: "Invalid name format",
                  },
                })}
              />
              <Input
                label="Email:"
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
                label="Password:"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <Button
                type="submit"
                className="w-full font-mono"
                disabled={loading}
              >
                {loading ? (
                  <ClipLoader size={24} color={"#ffffff"} />
                ) : (
                  <div className="flex flex-row justify-center">
                   Create a Account
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
                )}
              </Button>
            </div>
          </form>
          <p className="mt-4 text-center text-base">
            Already have an account?&nbsp;
            <Link
              to="/login"
              className="text-primary font-extralight transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export { RegisterUser };
