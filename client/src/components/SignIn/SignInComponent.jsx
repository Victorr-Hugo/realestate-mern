import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useBrokers } from "../../context/brokerContext";

const SignInComponent = () => {
  const { signinBroker, broker } = useBrokers();
  const navigate = useNavigate();

  return (
    <div className="transition-all ease-in-out dealay-150 duration-300">
      <div className="w-full h-full">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          enableReinitialize
          onSubmit={async (values, actions) => {
            await signinBroker(values);
            actions.resetForm();
            actions.setSubmitting(false);
            navigate("/");
          }}
        >
          {({ isSubmitting, handleSubmit }) => (
            <Form className="px-10 py-5" onSubmit={handleSubmit}>
              <div className="w-full flex-row mb-4 py-2 px-4 flex border rounded-[6px]">
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="outline-none bg-transparent"
                />
                <div className="mr-0 ml-auto">
                  <svg
                    xmlns="http://www.w3-org/2000/svg"
                    id="Outline"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="#666"
                  >
                    <path d="M19,1H5A5.006,5.006,0,0,0,0,6V18a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V6A5.006,5.006,0,0,0,19,1ZM5,3H19a3,3,0,0,1,2.78,1.887l-7.658,7.659a3.007,3.007,0,0,1-4.244,0L2.22,4.887A3,3,0,0,1,5,3ZM19,21H5a3,3,0,0,1-3-3V7.5L8.464,13.96a5.007,5.007,0,0,0,7.072,0L22,7.5V18A3,3,0,0,1,19,21Z"></path>
                  </svg>
                </div>
              </div>
              <div className="w-full mt-4 flex-row py-2 px-4 flex border rounded-[6px]">
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="outline-none bg-transparent"
                />
                <div className="mr-0 ml-auto">
                  <svg
                    xmlns="http://www.w3-org/2000/svg"
                    id="Outline"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="#666"
                  >
                    <path d="M19,8.424V7A7,7,0,0,0,5,7V8.424A5,5,0,0,0,2,13v6a5.006,5.006,0,0,0,5,5H17a5.006,5.006,0,0,0,5-5V13A5,5,0,0,0,19,8.424ZM7,7A5,5,0,0,1,17,7V8H7ZM20,19a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V13a3,3,0,0,1,3-3H17a3,3,0,0,1,3,3Z"></path>
                    <path d="M12,14a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V15A1,1,0,0,0,12,14Z"></path>
                  </svg>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-lime-600 text-white rounded-[6px] shadow mt-8 mb-4 py-3 text-[19px] font-medium cursor-pointer"
              >
                Sign in
              </button>
              <a href="#" className="text-lime-600 font-medium hover:underline">
                Forgot your password
              </a>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignInComponent;
