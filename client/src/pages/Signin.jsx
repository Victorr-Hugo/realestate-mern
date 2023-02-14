import React, { useState } from "react";
import Footer from "../components/Footer";
import SignInComponent from "../components/SignIn/SignInComponent";
import SignUpComponent from "../components/SignIn/SignUpComponent";

export const Signin = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <div className="w-full h-full bg-slate-100 relative flex-col flex">
        <div className="top-10 left-1/2 -translate-x-1/2 rounded-[6px] w-1/3 shadow-lg absolute bg-white max-h-[70%] h-[70%] overflow-auto">
          <div className="border-b">
            <div className="w-full flex-row flex">
              <div
                onClick={() => setIsLogin(false)}
                className={
                  !isLogin
                    ? "mx-10 w-1/2 py-4 cursor-pointer text-[1.25rem] border-b-[5px] border-b-lime-600 text-lime-600 transition-all ease-in-out dealay-150 duration-300"
                    : "mx-10 w-1/2 py-4 cursor-pointer text-[1.25rem] "
                }
              >
                Create account
              </div>
              <div
                onClick={() => setIsLogin(true)}
                className={
                  isLogin
                    ? "mx-10 w-1/2 py-4 cursor-pointer text-[1.25rem] border-b-[5px] border-b-lime-600 text-lime-600 transition-all ease-in-out dealay-150 duration-300"
                    : "mx-10 w-1/2 py-4 cursor-pointer text-[1.25rem] "
                }
              >
                Login
              </div>
            </div>
          </div>
          {isLogin ? <SignInComponent /> : <SignUpComponent />}
        </div>
      </div>
      <Footer />
    </>
  );
};
