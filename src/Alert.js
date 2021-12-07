import React from "react";
import { useEffect } from "react";
const Alert = ({ alert, showAlert, list }) => {
  useEffect(() => {
    const newTimeout = setTimeout(showAlert, 3000);
    return () => {
      clearTimeout(newTimeout);
    };
  }, [list, showAlert]);
  const { type, msg } = alert;
  return (
    <div className="container">
      <p className={`alert alert-${type}`}>{msg}</p>
    </div>
  );
};

export default Alert;
