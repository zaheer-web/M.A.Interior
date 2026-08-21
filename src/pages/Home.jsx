import React from 'react'
import Hero from '../Home/Hero'
import About from '../Home/About'

import WhyChoose from '../Home/WhyChoose'
import OurService from '../Home/OurService'
import OurClient from '../Home/OurClient'

import Process from '../Home/Process'
import Consultant from '../Home/Consultant'
import After from './After'
import TeamMember from '../Home/TeamMember'



function Home() {
  return (
    <div className='overflow-x-hidden'>
       <Hero/>
       <About/>
       <WhyChoose/>
       <TeamMember/>
       <OurService/>
       <OurClient/>
       <After/>
       {/* <Process/> */}
       <Consultant/>
    </div>
  )
}

export default Home
