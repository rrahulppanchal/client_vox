import { CircularProgress } from "@mui/joy";
import React from "react";

interface Props {}

const Loader: React.FC<Props> = () => {
  return (
    <div className="parent_loader_roud">
      <div className="loader_roud">
        <div className="dot-spinner">
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
