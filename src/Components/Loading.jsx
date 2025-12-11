import React from "react";
import Lottie from "lottie-react";
import loader from "../assets/lotties/loading.json";

const Loading = () => {
  return (
    <div
      className="flex justify-center items-center min-h-screen bg-[#111A2B] dark:bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#f8f4ff_60%,_#f0e8ff_100%)]
"
    >
      <Lottie
        animationData={loader}
        loop={true}
        className="w-36 sm:w-52 md:w-64 lg:w-72 xl:w-64"
      />
    </div>
  );
};

export default Loading;
