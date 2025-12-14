import React from "react";
import Lottie from "lottie-react";
import loader from "../assets/lotties/loading.json";

const Loading = () => {
  return (
    <div
      className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        dark:bg-black/40 bg-white/20
        
      "
    >
      <div>
        <Lottie animationData={loader} loop className="w-36 sm:w-52 md:w-64" />
      </div>
    </div>
  );
};

export default Loading;
