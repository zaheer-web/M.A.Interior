import React, { useState } from "react";
import GalleryHero from "../Gallery/GalleryHero";

import GalleryGrid from "../Gallery/GalleryGrid";
import CTASection from "../Gallery/CTASection";

function Gallery() {

  const [category, setCategory] = useState("All");

  return (
    <>
      <GalleryHero />

      

      <GalleryGrid/>

      <CTASection />
    </>
  );
}

export default Gallery;