import React, { useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import useAxios from "../../hooks/useAxios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  console.log(sessionId);

  const axiosInstance = useAxios();
  const lastSessionRef = useRef(null);

  useEffect(() => {
    if (lastSessionRef.current == sessionId) {
      return; // already called for this session
    }

    lastSessionRef.current = sessionId;

    axiosInstance
      .post(`/success-payment?session_id=${sessionId}`)
      .then((res) => {
        console.log(res.data);
      });
  }, [axiosInstance, sessionId]);
  return <div>Success Payment</div>;
};

export default PaymentSuccess;
