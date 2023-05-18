import React from "react";
import "./Page.css";

export function Page({
  children
}) {
  return (
    <div className="p-Page__container">
      {children}
    </div>
  )
}