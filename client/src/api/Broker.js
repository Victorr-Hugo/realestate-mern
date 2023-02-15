import axios from "axios";

export const getBrokersRequest = async () =>
  await axios.get("https://realestate-mern.onrender.com/api/brokers");
export const getBrokerRequest = async (id) =>
  await axios.get("https://realestate-mern.onrender.com/api/brokers/" + id);

export const signupBrokerRequest = async (values) => {
  try {
    const form = new FormData();
    for (let key in values) {
      if (key === "education" && Array.isArray(values[key])) {
        values[key].forEach((educationItem, index) => {
          for (let educationKey in educationItem) {
            form.append(
              `education[${index}].${educationKey}`,
              educationItem[educationKey]
            );
          }
        });
      } else {
        form.append(key, values[key]);
      }
    }
    return await axios.post(
      "https://realestate-mern.onrender.com/api/brokers/signup",
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export const signinBrokerRequest = async (broker) => {
  const form = new FormData();
  for (let key in broker) {
    form.append(key, broker[key]);
  }
  return await axios.post(
    "https://realestate-mern.onrender.com/api/brokers/signin",
    form,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
