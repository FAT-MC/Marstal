import React from "react";

export function Page({
  children
}) {
  return (
    <div className="p-Page__container">
      {children}
    </div>
  )
}