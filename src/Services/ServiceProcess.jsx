import React from "react";
import { motion } from "framer-motion";
import { FaLightbulb, FaDraftingCompass, FaCube, FaBuilding } from "react-icons/fa";

const steps = [
{
title: "Concept & Idea",
desc: "Understanding client vision and developing innovative architectural concepts.",
icon: <FaLightbulb />
},
{
title: "Planning & Strategy",
desc: "Detailed planning with functional layouts and aesthetic balance.",
icon: <FaDraftingCompass />
},
{
title: "3D Visualization",
desc: "Photorealistic visualization helping clients experience the design.",
icon: <FaCube />
},
{
title: "Execution",
desc: "Turning ideas into reality with precision and design excellence.",
icon: <FaBuilding />
}
];

const ServiceProcess = () => {
return (

<section className="py-20 md:py-32 bg-[#0c0c0c] text-white relative">

<div className="max-w-6xl mx-auto px-4 sm:px-6 relative">

<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 md:mb-28">
Our <span className="text-yellow-400">Design Process</span>
</h2>

{/* Mobile Vertical Timeline */}
<div className="absolute left-6 top-0 h-full w-[2px] bg-white/10 md:hidden">
<motion.div
initial={{ height: 0 }}
whileInView={{ height: "100%" }}
transition={{ duration: 2 }}
className="w-full bg-yellow-400"
/>
</div>


{/* Layout */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 md:gap-y-32 md:gap-x-40 relative">

{/* STEP 1 */}
<div className="flex md:justify-end justify-start relative pl-14 md:pl-0">

<div className="absolute left-5 top-6 w-3 h-3 bg-yellow-400 rounded-full md:hidden"></div>

<Card step={steps[0]} number="01"/>

</div>

{/* STEP 2 */}
<div className="flex md:justify-start justify-start relative pl-14 md:pl-0">

<div className="absolute left-5 top-6 w-3 h-3 bg-yellow-400 rounded-full md:hidden"></div>

<Card step={steps[1]} number="02"/>

</div>

{/* STEP 3 */}
<div className="flex md:justify-end justify-start relative pl-14 md:pl-0">

<div className="absolute left-5 top-6 w-3 h-3 bg-yellow-400 rounded-full md:hidden"></div>

<Card step={steps[2]} number="03"/>

</div>

{/* STEP 4 */}
<div className="flex md:justify-start justify-start relative pl-14 md:pl-0">

<div className="absolute left-5 top-6 w-3 h-3 bg-yellow-400 rounded-full md:hidden"></div>

<Card step={steps[3]} number="04"/>

</div>


{/* SVG CONNECTORS (Desktop Only) */}
<svg
className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block"
viewBox="0 0 1000 700"
fill="none"
>

{/* 1 → 2 */}
<motion.path
d="M425 120 C420 120 420 120 580 120"
stroke="#facc15"
strokeWidth="3"
strokeLinecap="round"
initial={{ pathLength: 0 }}
whileInView={{ pathLength: 1 }}
transition={{ duration: 1 }}
/>

{/* 2 ↓ 3 */}
<motion.path
d="M700 300 C700 460 350 260 300 425"
stroke="#facc15"
strokeWidth="3"
strokeLinecap="round"
initial={{ pathLength: 0 }}
whileInView={{ pathLength: 1 }}
transition={{ duration: 1.2, delay:0.5 }}
/>

{/* 3 → 4 */}
<motion.path
d="M420 580 L580 580"
stroke="#facc15"
strokeWidth="3"
strokeLinecap="round"
initial={{ pathLength: 0 }}
whileInView={{ pathLength: 1 }}
transition={{ duration: 1, delay: 1 }}
/>

</svg>

</div>

</div>

</section>

);
};

const Card = ({step,number}) => {
return(

<motion.div
initial={{opacity:0,y:50}}
whileInView={{opacity:1,y:0}}
transition={{duration:0.6}}
viewport={{once:true}}
className="w-full max-w-[260px] bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 sm:p-8 text-center shadow-xl hover:scale-105 transition"
>

<div className="text-3xl sm:text-4xl text-yellow-400 mb-4 sm:mb-5 flex justify-center">
{step.icon}
</div>

<div className="text-4xl sm:text-5xl font-bold text-yellow-500 mb-2 sm:mb-3">
{number}
</div>

<h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
{step.title}
</h3>

<p className="text-gray-300 text-xs sm:text-sm">
{step.desc}
</p>

</motion.div>

)
}

export default ServiceProcess;