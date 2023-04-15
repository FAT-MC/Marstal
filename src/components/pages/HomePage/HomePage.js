import React from "react";
import "./HomePage.css";

export function HomePage() {
  return (
    <div className="p-HomePage__container">
      {process.env.REACT_APP_VERSION}
      {process.env.NODE_ENV}
    </div>
  )
}