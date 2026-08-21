import React from "react";

const categories = [
  "All",
  "Living Room",
  "Bedroom",
  "Kitchen",
  "Office",
  "Commercial",
];

const GalleryFilter = ({ category, setCategory }) => {
  return (

    <div className="flex flex-wrap justify-center gap-4 py-10">

      {categories.map((item, index) => (

        <button
          key={index}
          onClick={() => setCategory(item)}
          className={`px-6 py-2 rounded-lg border transition
          
          ${
            category === item
              ? "bg-yellow-500 text-black"
              : "bg-black text-white border-white/20"
          }
          `}
        >

          {item}

        </button>

      ))}

    </div>

  );
};

export default GalleryFilter;