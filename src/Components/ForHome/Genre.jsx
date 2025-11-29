import React from "react";

const Genre = ({ genre, bgColor }) => {
  return (
    <div
      className={`w-40 h-40 rounded-xl flex items-center justify-center text-white font-semibold text-lg cursor-pointer transition transform hover:scale-105 shadow-lg`}
      style={{ backgroundColor: bgColor || "#1f2937" }}
    >
      {genre}
    </div>
  );
};
export default Genre;
