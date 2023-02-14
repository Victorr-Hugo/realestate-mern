import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  getBrokerRequest,
  getBrokersRequest,
  signinBrokerRequest,
  signupBrokerRequest,
} from "../api/Broker";

const brokerContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { broker: action.payload };
    case "LOGOUT":
      return { broker: null };
    default:
      return state;
  }
};

export const useBrokers = () => {
  const context = useContext(brokerContext);
  if (!context) throw new Error("Brokers Provider is missing");
  return context;
};

export const BrokerProvider = ({ children }) => {
  const [broker, setBroker] = useState({});
  const [brokers, setBrokers] = useState([]);
  const [state, dispatch] = useReducer(authReducer, {
    broker: null,
  });

  const brokerId = JSON.parse(localStorage.getItem("broker"))?.broker;

  useEffect(() => {
    (async () => {
      const res = JSON.parse(localStorage.getItem("broker"));
      if (res) {
        const broker = await getBrokerRequest(res.broker);
        setBroker(broker.data);
        return res.data;
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await getBrokersRequest();
      setBrokers(res.data);
    })();
  }, []);

  const getBroker = async (id) => {
    try {
      const res = await getBrokerRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const signinBroker = async (values) => {
    try {
      const res = await signinBrokerRequest(values);
      localStorage.setItem("broker", JSON.stringify(res.data));
      dispatch({ type: "LOGIN", payload: res.data });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const signupBroker = async (values) => {
    try {
      const res = await signupBrokerRequest(values);
      localStorage.setItem("broker", JSON.stringify(res.data));
      dispatch({ type: "LOGIN", payload: res.data });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <brokerContext.Provider
      value={{
        broker,
        brokers,
        brokerId,
        signupBroker,
        signinBroker,
        getBroker,
      }}
    >
      {children}
    </brokerContext.Provider>
  );
};
