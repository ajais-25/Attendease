// src/components/Button.js
import React from "react";

export function Button({ variant = "primary", onClick, children }) {
  const buttonClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-700",
    secondary: "bg-gray-300 text-gray-800 hover:bg-gray-400",
    danger: "bg-red-500 text-white hover:bg-red-700",
  };

  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 rounded-lg transition-colors ${buttonClasses[variant]}`}
    >
      {children}
    </button>
  );
}
