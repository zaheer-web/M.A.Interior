import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Link } from "react-router-dom";

// Yaha apni images import karo (path apne folder structure ke hisab se adjust karo)
import im1 from "../img/im1.png";
import im2 from "../img/3D Visualization/n34.jpeg";
import im3 from "../img/Landscape/na13.jpeg";
import im4 from "../img/Urban/n36.jpeg";
import im5 from "../img/architecture/n44.jpeg";
import im6 from "../img/new/n33.jpeg";

const projects = [
{


img:im1
},
{

img:im2
},
{

img:im3
},
{

img:im4
},
{

img:im5
},
{

img:im6
}
];

function OurWork(){

const [index,setIndex] = useState(null);

const next = ()=> setIndex((index+1)%projects.length);
const prev = ()=> setIndex((index-1+projects.length)%projects.length);

return(

<>

{/* FEATURED PROJECT */}

<section className="relative h-[80vh] flex items-center justify-center text-white overflow-hidden">

<img
src={projects[0].img}
className="absolute inset-0 w-full h-full object-cover"
/>

<div className="absolute inset-0 bg-black/70"></div>

<motion.div
initial={{opacity:0,y:40}}
whileInView={{opacity:1,y:0}}
transition={{duration:0.8}}
className="relative text-center max-w-3xl px-6"
>

<p className="text-yellow-500 uppercase tracking-[4px] mb-4">
Featured Project
</p>




<button
onClick={()=>setIndex(0)}
className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
>
View Project
</button>

</motion.div>

</section>


{/* PORTFOLIO GRID */}

<section className="py-24 bg-black text-white">

<div className="max-w-7xl mx-auto px-6">

<div className="text-center mb-16">

<p className="text-yellow-500 uppercase tracking-[4px] mb-4">
Our Portfolio
</p>

<h2 className="text-4xl md:text-5xl font-bold">
Selected <span className="text-yellow-500">Projects</span>
</h2>

</div>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

{projects.map((project,i)=>(

<motion.div
key={i}
initial={{opacity:0,y:40}}
whileInView={{opacity:1,y:0}}
transition={{delay:i*0.1}}
className="relative group overflow-hidden cursor-pointer"
onClick={()=>setIndex(i)}
>

<img
src={project.img}
className="w-full h-[380px] object-cover group-hover:scale-110 transition duration-700"
/>

<div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-6">

<div>

<h3 className="text-xl font-semibold">
{project.title}
</h3>

<p className="text-yellow-500 text-sm">
{project.location}
</p>

</div>

</div>

</motion.div>

))}

</div>

</div>

</section>


{/* LIGHTBOX */}

<AnimatePresence>

{index!==null &&(

<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
exit={{opacity:0}}
className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
>

<button
onClick={()=>setIndex(null)}
className="absolute top-8 right-8 text-white"
>
<X size={32}/>
</button>

<button
onClick={prev}
className="absolute left-6 text-white"
>
<ChevronLeft size={40}/>
</button>

<motion.div
initial={{scale:0.9,opacity:0}}
animate={{scale:1,opacity:1}}
className="max-w-5xl text-center"
>

<img
src={projects[index].img}
className="max-h-[75vh] mx-auto rounded-xl mb-6"
/>

<h3 className="text-2xl font-bold">
{projects[index].title}
</h3>

<p className="text-yellow-500 mb-2">
{projects[index].location}
</p>

<p className="text-gray-300 max-w-xl mx-auto">
{projects[index].desc}
</p>

</motion.div>

<button
onClick={next}
className="absolute right-6 text-white"
>
<ChevronRight size={40}/>
</button>

</motion.div>

)}

</AnimatePresence>


{/* CTA */}

<section
className="relative py-32 text-center text-white bg-cover bg-center"
style={{
backgroundImage:`url(${im1})`
}}
>

<div className="absolute inset-0 bg-black/80"></div>

<motion.div
initial={{opacity:0,y:40}}
whileInView={{opacity:1,y:0}}
transition={{duration:0.7}}
className="relative z-10 max-w-2xl mx-auto px-6"
>

<h2 className="text-4xl md:text-5xl font-bold mb-6">
Start Your Dream Project
</h2>

<p className="text-gray-300 mb-8">
We design modern architecture and interiors that combine beauty,
functionality and innovation.
</p>

<Link to="/contact-form">

<button className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
Start Your Project
</button>

</Link>

</motion.div>

</section>

</>

);

}

export default OurWork;