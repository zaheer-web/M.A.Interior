import React from "react"
import { motion } from "framer-motion"
import { FaCouch, FaTree, FaCity } from "react-icons/fa"
import { Md3dRotation } from "react-icons/md"

// Yaha apni images import karo (path apne folder structure ke hisab se adjust karo)
import im1 from "../img/im19.jpeg"
import im2 from "../img/3D Visualization/n25.jpeg"
import im3 from "../img/Landscape/na4.jpeg"
import im4 from "../img/Urban/n35.jpeg"

const services = [
{
title: "Interior Design",
icon: <FaCouch />,
image: im1,
desc: "Interior design is not just about decoration; it's about creating a cohesive and functional space. Our philosophy is centered around using interior design as a tool to enhance the aesthetics and functionality of any space, regardless of its size. Whether it's small, compact area or a large, expansive space, we aim to make every interior lively and comfortable."
},

{
title: "3D Visualization",
icon: <Md3dRotation />,
image: im2,
desc: "3D visualization is crucial for understanding a project comprehensively. We believe it offers unique satisfaction to both clients and our team. With skilled 3D visualizers dedicated to delivering the best results, we ensure that our clients can visualize their projects with clarity and confidence."
},

{
title: "Landscape Design",
icon: <FaTree />,
image: im3,
desc: "Landscape design is the soul of our built environment. We believe that space is incomplete without thoughtful landscaping. It's the element that breathes life into architecture, making it vibrant and inviting. Our team is dedicated to creating landscapes that enhance the beauty and functionality of every project, ensuring that each building is truly alive."
},

{
title: "Urbanism",
icon: <FaCity />,
image: im4,
desc: "Urbanism is more than just city planning; it's about shaping communities. Our team specializes in Urban Design, Planning, and Regeneration, recognizing the unique skills these projects demand. We believe in the transformative power of Urbanism to benefit communities at large, driving our dedication to excellence in this field."
}

]

const ServicesGrid = () => {

return (

<section className="relative py-15 bg-[#0c0c0c] text-white overflow-hidden">

{/* Background Blur Lights */}
<div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500 opacity-20 blur-[140px]" />
<div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 opacity-20 blur-[140px]" />

<div className="max-w-7xl mx-auto px-6 space-y-32 relative z-10">

{services.map((service,index)=>{

const isReverse = index % 2 !== 0

return(

<motion.div
key={index}
initial={{opacity:0,y:80}}
whileInView={{opacity:1,y:0}}
transition={{duration:0.9,ease:"easeOut"}}
viewport={{once:true}}
className="grid md:grid-cols-2 gap-16 items-center"
>

{/* IMAGE */}

<motion.div
whileHover={{scale:1.06, rotateY:6}}
transition={{duration:0.6}}
className={`${isReverse ? "md:order-2" : ""}`}
>

<img
src={service.image}
alt=""
className="rounded-2xl shadow-2xl"
/>

</motion.div>

{/* CONTENT */}

<motion.div
initial={{opacity:0,x:isReverse?120:-120}}
whileInView={{opacity:1,x:0}}
transition={{duration:0.8}}
viewport={{once:true}}
className={`${isReverse ? "md:order-1" : ""} text-center md:text-left`}
>

{/* ICON */}

<motion.div
initial={{scale:0}}
whileInView={{scale:1}}
transition={{duration:0.6}}
className="text-4xl text-yellow-400 mb-4 flex justify-center md:justify-start"
>

{service.icon}

</motion.div>

<h2 className="text-4xl font-bold mb-6">

{service.title}

</h2>

<p className="text-gray-300 mb-6 leading-relaxed">

{service.desc}

</p>

</motion.div>

</motion.div>

)

})}

</div>

</section>

)

}

export default ServicesGrid