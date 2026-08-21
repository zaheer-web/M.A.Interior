import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const LocationSection = () => {

const address = "25, Avas Vikas, Civil Lines, Moradabad 244001";

return (

<section className="relative py-28 bg-black text-white overflow-hidden">

{/* Glow background */}

<div className="absolute -top-20 -left-20 w-96 h-96 bg-yellow-500/20 blur-[140px] rounded-full"></div>
<div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/20 blur-[140px] rounded-full"></div>

<div className="relative max-w-7xl mx-auto px-6">

{/* Heading */}

<motion.div
initial={{opacity:0,y:40}}
whileInView={{opacity:1,y:0}}
transition={{duration:0.7}}
className="text-center mb-20"
>

<h2 className="text-4xl md:text-5xl font-extrabold">

Our <span className="text-yellow-500">Location</span>

</h2>

<p className="text-gray-400 mt-6 max-w-xl mx-auto">

Visit our office and meet our team to discuss your project.

</p>

</motion.div>


{/* Layout */}

<div className="grid lg:grid-cols-2 gap-12 items-center">


{/* MAP */}

<motion.div
initial={{opacity:0,scale:0.95}}
whileInView={{opacity:1,scale:1}}
transition={{duration:0.8}}
className="rounded-3xl overflow-hidden border border-white/10 shadow-xl"
>

<iframe
src="https://maps.google.com/maps?q=25%20Avas%20Vikas%20Civil%20Lines%20Moradabad%20244001&t=&z=15&ie=UTF8&iwloc=&output=embed"
className="w-full h-[400px] md:h-[520px] border-0 grayscale hover:grayscale-0 transition duration-700"
loading="lazy"
title="Moradabad Office Location"
/>

</motion.div>


{/* ADDRESS CARD */}

<motion.div
initial={{opacity:0,x:60}}
whileInView={{opacity:1,x:0}}
transition={{duration:0.7}}
className="p-10 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl"
>

<div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 mb-8">

<MapPin size={28}/>

</div>


<h3 className="text-2xl font-semibold mb-4">

Architects & Associates

</h3>


<p className="text-gray-400 leading-relaxed mb-6">

25, Avas Vikas  
Civil Lines  
Moradabad – 244001  
Uttar Pradesh, India

</p>


<a
href="https://www.google.com/maps/search/?api=1&query=25+Avas+Vikas+Civil+Lines+Moradabad+244001"
target="_blank"
rel="noreferrer"
className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-lg font-semibold transition"
>

Open in Google Maps

</a>

</motion.div>

</div>

</div>

</section>

)

}

export default LocationSection;