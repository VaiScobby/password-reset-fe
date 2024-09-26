import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userServices from "../services/userServices";
import "./Verify.css";

const Verify = () => {
  const { key } = useParams();
  const [loader, setLoader] = useState(true);
  const [state, setState] = useState("Please wait...");

  const navigate = useNavigate();

  
  useEffect(() => {
    
    userServices
      .verify(key)
      .then((response) => {
        const message = response.data.message;
        setLoader(false);
        setState(message);
        setTimeout(() => {
          setState(`${message}.`);
          setTimeout(() => {
            setState(`${message}..`);
            setTimeout(() => {
              setState(`${message}...`);
              setTimeout(() => {
                setState(`${message}....`);
                setTimeout(() => {
                  setState(`${message}.....`);
                  navigate(`/reset/${key}`);
                }, 1000);
              }, 1000);
            }, 1000);
          }, 1000);
        }, 1000);
      })
      .catch((e) => {
        const message = e.response.data.message;
        setLoader(false);
        setState(message);
      });
  }, []);
  return (
    <center>
      <h1>{state}</h1>
      {loader && <div className="loader"></div>}
    </center>
  );
};

export default Verify;
