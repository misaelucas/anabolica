import React from "react";
import PrevImagesCarousel from "../components/PrevImagesCarousel";

const NewPage = () => {
  return (
    <div className="flex justify-center">
      <div className="flex justify-center">
        <h1 className="text-center text-4xl font-bold my-8">Image Carousel</h1>
        <PrevImagesCarousel />
      </div>
    </div>
  );
};

export default NewPage;
