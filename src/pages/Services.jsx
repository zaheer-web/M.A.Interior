import React from 'react'
import ServiceHero from '../Services/ServiceHero'
import ServicesIntro from '../Services/ServicesIntro'
import ServicesGrid from '../Services/ServicesGrid'
import ServiceShowcase from '../Services/ServiceShowcase'
import ServiceProcess from '../Services/ServiceProcess'

function Services() {
  return (
    <>
    <div className='overflow-x-hidden'>
    <ServiceHero/>
    <ServicesIntro/>
    <ServicesGrid/>
    <ServiceShowcase/>
    <ServiceProcess/>
    </div>
    
    </>
  )
}

export default Services
