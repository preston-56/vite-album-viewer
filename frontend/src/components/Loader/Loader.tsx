import React from "react";
import { LoaderProps } from "../interfaces/LoaderProps";
import styles from "./Loader.module.css";

const Loader: React.FC<LoaderProps> = ({
  message = "Loading...",
  size = 40,
  color = "#3498db",
  className = "",
}) => {
  return (
    <div
      className={`flex justify-center items-center ${className}`}
      aria-live="polite"
    >
      <div
        className={styles.loader}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderTopColor: color,
        }}
      ></div>
      <span className="ml-2">{message}</span>
    </div>
  );
};

export default Loader;
