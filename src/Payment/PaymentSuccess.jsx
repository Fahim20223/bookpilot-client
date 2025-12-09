import axios from "axios";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router";

const PaymentSuccess = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  useEffect(() => {
    axios.post(`${import.meta.env.VITE_API_URL}/payment-success`, {
      sessionId,
    });
  }, [sessionId]);
  return (
    <div>
      <h1>Payment Successful</h1>
    </div>
  );
};

export default PaymentSuccess;
