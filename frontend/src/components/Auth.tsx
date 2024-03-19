import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import { SignInInputs, SignUpInputs } from "@dheeraj1805/medium-common";
import { signin, signup } from "../server";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const handleSignUp = async (values: SignUpInputs) => {
    const res: any = await signup(values);
    if (res && res.data && res.data.jwt) {
      localStorage.setItem("token", res.data.jwt);
      navigate("/blogs");
    }
  };

  const handleSignIn = async (values: SignInInputs | SignUpInputs) => {
    console.log("signin is ", values);
    delete values?.name;
    const res: any = await signin(values);
    console.log("res is ", res);
    if (res && res.data && res.data.jwt) {
        localStorage.setItem("token", res.data.jwt);
        navigate("/blogs");
    }
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="min-w-full md:w-2/4">
        <div className="text-center font-bold text-3xl">
          {type === "signup" ? "Create an Account" : "Log in to your account"}
        </div>
        <div className="text-center text-md text-slate-400">
          {type === "signup"
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          &nbsp;
          <Link
            to={type === "signup" ? "/signin" : "/signup"}
            className="underline"
          >
            {type === "signup" ? "Login" : "Signup"}
          </Link>
        </div>
        <AuthForm
          isSignUp={type === "signup"}
          onSubmit={type === "signup" ? handleSignUp : handleSignIn}
        />
      </div>
    </div>
  );
};

export default Auth;
