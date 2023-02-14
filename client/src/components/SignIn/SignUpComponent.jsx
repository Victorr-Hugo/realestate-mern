import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useBrokers } from "../../context/brokerContext";
import { useNavigate } from "react-router-dom";

const SignUpComponent = () => {
  const { signupBroker } = useBrokers();
  const [educationFields, setEducationFields] = useState([
    { school: "", year: "", title: "" },
  ]);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const addEducationField = () => {
    setEducationFields([
      ...educationFields,
      { school: "", year: "", title: "" },
    ]);
  };

  const removeEducationField = (index) => {
    setEducationFields(
      educationFields.filter((_, i) => {
        return i !== index;
      })
    );
  };

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="transition-all ease-in-out dealay-150 duration-300 overflow-auto">
      <div className="w-full h-full overflow-auto">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            moreInfo: "",
            education: [],
            languages: [],
            bio: "",
            email: "",
            password: "",
            profilePic: null,
          }}
          enableReinitialize
          onSubmit={async (values, actions) => {
            await signupBroker(values);
            console.log(values);
            actions.resetForm();
            actions.setSubmitting(false);
            navigate("/");
          }}
        >
          {({
            setFieldValue,
            isSubmitting,
            handleSubmit,
            values,
            handleBlur,
            handleChange,
          }) => (
            <Form onSubmit={handleSubmit} className="px-10">
              {image ? (
                <label
                  htmlFor="dropzone"
                  className="block m-auto my-4 w-24 h-24 cursor-pointer rounded-[6px] "
                >
                  <img
                    alt=""
                    src={image}
                    className="rounded-[6px] w-full h-full m-auto object-cover my-4 cursor-pointer"
                  />
                  <input
                    id="dropzone"
                    className="hidden"
                    name="profilePic"
                    type="file"
                    onChange={(e) =>
                      setFieldValue("profilePic", e.target.files[0]) &&
                      handleImageChange(e)
                    }
                  />
                </label>
              ) : (
                <label
                  htmlFor="dropzone"
                  className="block p-8 m-auto my-4 w-fit h-fit cursor-pointer rounded-[6px] bg-slate-200 border-slate-400 border-dashed border-[4px]"
                >
                  <svg
                    xmlns="http://www.w3-org/2000/svg"
                    id="Outline"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="#94a3b8"
                  >
                    <path d="M16.043,14H7.957A4.963,4.963,0,0,0,3,18.957V24H21V18.957A4.963,4.963,0,0,0,16.043,14Z"></path>
                    <circle cx="12" cy="6" r="6"></circle>
                  </svg>
                  <input
                    id="dropzone"
                    className="hidden"
                    name="profilePic"
                    type="file"
                    onChange={(e) =>
                      setFieldValue("profilePic", e.target.files[0]) &&
                      handleImageChange(e)
                    }
                  />
                </label>
              )}
              <ErrorMessage name="profilePic" component="div" />
              <Field
                name="firstName"
                type="text"
                placeholder="First Name"
                className="w-full flex-row mb-4 py-2 px-4 flex border rounded-[6px]"
              />
              <ErrorMessage name="firstName" component="div" />
              <Field
                name="lastName"
                type="text"
                placeholder="Last Name"
                className="w-full flex-row mb-4 py-2 px-4 flex border rounded-[6px]"
              />
              <ErrorMessage name="lastName" component="div" />
              <Field
                name="moreInfo"
                type="text"
                component="textarea"
                placeholder="Bio"
                className="w-full flex-row mb-4 py-2 px-4 flex border rounded-[6px]"
              />
              <ErrorMessage name="moreInfo" component="div" />
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
              </div>{" "}
              <ErrorMessage name="email" component="div" />
              <div className="w-full mt-4 mb-6 flex-row py-2 px-4 flex border rounded-[6px]">
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
              <div className="text-left text-[16px] my-2 font-medium">
                Education
              </div>
              {educationFields.map((field, index) => (
                <div key={index} className="w-full border rounded-[9px]">
                  <div className="w-full mt-4 border-b mb-6 flex-row py-2 px-4 flex">
                    <Field
                      type="text"
                      name={`education.${index}.school`}
                      id={`education.${index}.school`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.school}
                      placeholder="School"
                      className="w-full outline-none"
                    />
                    <div className="mr-0 ml-auto my-auto">
                      <svg
                        xmlns="http://www.w3-org/2000/svg"
                        id="Outline"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="#666"
                      >
                        <path d="m21 6h-6.586l-1.159-1.159 3.745-2.341-4-2.5h-2v4.586l-1.414 1.414h-6.586a3 3 0 0 0 -3 3v15h24v-15a3 3 0 0 0 -3-3zm0 2a1 1 0 0 1 1 1v1h-3.586l-2-2zm-18 0h4.586l-2 2h-3.586v-1a1 1 0 0 1 1-1zm10 14h-2v-3a1 1 0 0 1 2 0zm2 0v-3a3 3 0 0 0 -6 0v3h-7v-10h4.414l5.586-5.586 5.586 5.586h4.414v10zm-11-8h3v2h-3zm0 4h3v2h-3zm13-4h3v2h-3zm0 4h3v2h-3zm-3-6a2 2 0 1 1 -2-2 2 2 0 0 1 2 2z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="w-full mt-4 border-b mb-6 flex-row py-2 px-4 flex">
                    <Field
                      type="text"
                      name={`education.${index}.year`}
                      id={`education.${index}.year`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.year}
                      placeholder="Year"
                      className="w-full outline-none"
                    />
                    <div className="mr-0 ml-auto my-auto">
                      <svg
                        xmlns="http://www.w3-org/2000/svg"
                        id="Outline"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="#666"
                      >
                        <path d="M19,2H18V1a1,1,0,0,0-2,0V2H8V1A1,1,0,0,0,6,1V2H5A5.006,5.006,0,0,0,0,7V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V7A5.006,5.006,0,0,0,19,2ZM2,7A3,3,0,0,1,5,4H19a3,3,0,0,1,3,3V8H2ZM19,22H5a3,3,0,0,1-3-3V10H22v9A3,3,0,0,1,19,22Z"></path>
                        <circle cx="12" cy="15" r="1.5"></circle>
                        <circle cx="7" cy="15" r="1.5"></circle>
                        <circle cx="17" cy="15" r="1.5"></circle>
                      </svg>
                    </div>
                  </div>
                  <div className="w-full mt-4 border-b mb-6 flex-row py-2 px-4 flex">
                    <Field
                      type="text"
                      name={`education.${index}.title`}
                      id={`education.${index}.title`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      placeholder="Title"
                      className=" w-full outline-none"
                    />
                    <div className="mr-0 ml-auto my-auto">
                      <svg
                        xmlns="http://www.w3-org/2000/svg"
                        id="Outline"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="#666"
                      >
                        <path d="m14.12 1.627a3.9 3.9 0 0 0 -4.24 0l-9.88 6.373 5 3.225v8.794l.32.408c.207.263 2.153 2.573 6.68 2.573s6.473-2.31 6.68-2.573l.32-.408v-8.794l2-1.29v10.065h3v-12zm-2.614 2.521a.9.9 0 0 1 .988 0l5.971 3.852-5.971 3.851a.893.893 0 0 1 -.988 0l-5.971-3.851zm4.494 14.71a6.408 6.408 0 0 1 -4 1.142 6.421 6.421 0 0 1 -4-1.139v-5.7l1.88 1.213a3.9 3.9 0 0 0 4.24 0l1.88-1.214z"></path>
                      </svg>
                    </div>
                  </div>
                  <button
                    onClick={() => removeEducationField(index)}
                    className="font-medium mt-4 ml-4 mb-6 flex-row py-2 px-4 flex bg-red-700 text-white w-fit hover:bg-red-600"
                  >
                    Remove
                    <div className="mr-0 ml-auto my-auto pl-4">
                      <svg
                        xmlns="http://www.w3-org/2000/svg"
                        id="Outline"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="white"
                      >
                        <path d="M23,3H18V2.5A2.5,2.5,0,0,0,15.5,0h-7A2.5,2.5,0,0,0,6,2.5V3H1V6H3V21a3,3,0,0,0,3,3H18a3,3,0,0,0,3-3V6h2ZM18,21H6V6H18Z"></path>
                        <rect x="8" y="9" width="3" height="9"></rect>
                        <rect x="13" y="9" width="3" height="9"></rect>
                      </svg>
                    </div>
                  </button>
                </div>
              ))}
              <button
                className="w-full text-lime-600 hover:underline rounded-[6px] flex-row flex px-4 py-1"
                type="button"
                onClick={addEducationField}
              >
                Add Education
              </button>
              <button
                type="submit"
                className="w-full bg-lime-600 text-white rounded-[6px] shadow mt-8 mb-4 py-3 text-[19px] font-medium cursor-pointer"
              >
                Sign up
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUpComponent;
