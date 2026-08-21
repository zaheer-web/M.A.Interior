import React from "react";

const ImageLightbox = ({ image, close }) => {
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">

      <button
        onClick={close}
        className="absolute top-6 right-8 text-white text-3xl"
      >
        ✕
      </button>

      <div className="max-w-4xl p-4">
        <img src={image.src} className="w-full rounded-lg" />

        <h2 className="text-white text-center mt-4 text-xl">
          {image.title}
        </h2>
      </div>

    </div>
  );
};

export default ImageLightbox;