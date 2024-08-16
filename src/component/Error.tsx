import React from "react";
import { useRouteError } from "react-router-dom";

interface RouteError {
  data: string;
  error: {
    columnNumber: number;
    fileName: string;
    lineNumber: number;
    message: string;
    stack: string;
  };
  internal: boolean;
  status: number;
  statusText: string;
}

const Error = () => {
  const error = useRouteError() as RouteError;
  return (
    <>
      Oops!! Something went wrong
      <div>
        {error.status} : {error.statusText}
      </div>
    </>
  );
};

export default Error;
