import React from 'react'
import BeforeAfter from '../Home/BeforeAfter'
// import InteriorGallery from '../Home/InteriorGallery'
import ParallaxSection from '../Home/ParallaxSection'
import Interior from './Interior'

export default function After() {
  return (
    <>
      <ParallaxSection/>
      <Interior/>
      {/* <InteriorGallery/> */}

      <BeforeAfter/>
    </>
  )
}
