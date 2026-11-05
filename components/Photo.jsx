// Photo.js
import React from "react";

const Photo = () => {
  return (
    <img
      src="/Photo.png" // Ensure your image is located at 'public/Photo.png'
      alt="Shivani Kaiche"
      className="object-cover w-full h-full rounded-full z-10"
    />
  );
};

export default Photo;
