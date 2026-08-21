import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
import { MapPin, Phone, Mail } from "lucide-react";

const Option = [
"I am looking invest",
"I am looking for residential space",
"I am looking for office space",
"I am looking for house space",
"I am looking for work"
];

const ContactForm = () => {

const [loading,setLoading] = useState(false)

const [formData,setFormData] = useState({
firstName:"",
lastName:"",
email:"",
phone:"",
subject:"",
message:""
})

const handleChange = (e)=>{
setFormData({
...formData,
[e.target.name]:e.target.value
})
}

const validateForm = ()=>{

if(!formData.firstName.trim())
return toast.error("First name is required")

if(!formData.lastName.trim())
return toast.error("Last name is required")

if(!formData.email)
return toast.error("Email is required")

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
if(!emailRegex.test(formData.email))
return toast.error("Invalid email format")

if(!formData.phone || formData.phone.length < 10)
return toast.error("Enter valid phone number")

if(!formData.subject)
return toast.error("Please select option")

if(!formData.message.trim())
return toast.error("Message is required")

return true
}

const handleSubmit = async (e)=>{
e.preventDefault()

const isValid = validateForm()
if(!isValid) return

try{

setLoading(true)

await axios.post(
"http://localhost:5000/api/ma-architect/contact",
formData
)

toast.success("Message sent successfully")

setFormData({
firstName:"",
lastName:"",
email:"",
phone:"",
subject:"",
message:""
})

}catch(err){

toast.error("Something went wrong")

}finally{
setLoading(false)
}
}

return (

<section className="relative py-28 bg-black text-white overflow-hidden">

<div className="absolute -top-20 -left-20 w-96 h-96 bg-yellow-500/20 blur-[140px] rounded-full"></div>
<div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/20 blur-[140px] rounded-full"></div>

<div className="relative max-w-7xl mx-auto px-6">

<div className="grid lg:grid-cols-2 gap-14 items-center">

<motion.div
initial={{opacity:0,x:-60}}
whileInView={{opacity:1,x:0}}
transition={{duration:0.7}}
>

<h2 className="text-4xl md:text-5xl font-extrabold mb-6">
Let's <span className="text-yellow-500">Talk</span>
</h2>

<p className="text-gray-400 mb-10 leading-relaxed max-w-lg">
Have a project in mind? We'd love to hear from you.
Send us a message and our team will get back to you shortly.
</p>

<div className="space-y-6">

<div className="flex items-center gap-4">
<div className="p-3 rounded-lg bg-white/5 border border-white/10 text-yellow-500">
<MapPin size={20}/>
</div>
<p className="text-gray-300">
25,Avas Vikas, Civil Lines, Moradabad-244001
</p>
</div>

<div className="flex items-center gap-4">
<div className="p-3 rounded-lg bg-white/5 border border-white/10 text-yellow-500">
<Phone size={20}/>
</div>
<p className="text-gray-300">
+91-9411096122
</p>
</div>

<div className="flex items-center gap-4">
<div className="p-3 rounded-lg bg-white/5 border border-white/10 text-yellow-500">
<Mail size={20}/>
</div>
<p className="text-gray-300">
contact@yourcompany.com
</p>
</div>

</div>

</motion.div>

<motion.form
onSubmit={handleSubmit}
initial={{opacity:0,x:60}}
whileInView={{opacity:1,x:0}}
transition={{duration:0.7}}
className="relative p-10 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl space-y-6"
>

<div className="grid md:grid-cols-2 gap-5">

<input
name="firstName"
value={formData.firstName}
onChange={handleChange}
placeholder="First Name"
className="bg-white/5 border border-white/10 p-4 rounded-lg w-full text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
/>

<input
name="lastName"
value={formData.lastName}
onChange={handleChange}
placeholder="Last Name"
className="bg-white/5 border border-white/10 p-4 rounded-lg w-full text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
/>

<div>

<PhoneInput
country={"in"}
value={formData.phone}
onChange={(phone)=>setFormData({...formData,phone})}
inputStyle={{
width:"100%",
height:"56px",
borderRadius:"10px",
background:"rgba(255,255,255,0.05)",
color:"white",
border:"1px solid rgba(255,255,255,0.1)"
}}
buttonStyle={{
background:"rgba(255,255,255,0.05)",
border:"1px solid rgba(255,255,255,0.1)"
}}
dropdownStyle={{color:"black"}}
/>

</div>

<input
name="email"
value={formData.email}
onChange={handleChange}
placeholder="Email Address"
className="bg-white/5 border border-white/10 p-4 rounded-lg w-full text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
/>

<select
name="subject"
value={formData.subject}
onChange={handleChange}
className="bg-white/5 border border-white/10 p-4 rounded-lg w-full md:col-span-2 text-white focus:outline-none focus:border-yellow-500"
>

<option value="" className="text-black">Select Option</option>

{Option.map((opt,index)=>(
<option key={index} value={opt} className="text-black">
{opt}
</option>
))}

</select>

</div>

<textarea
name="message"
value={formData.message}
onChange={handleChange}
placeholder="What's on your mind?"
rows="5"
className="bg-white/5 border border-white/10 p-4 rounded-lg w-full text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
/>

<button
type="submit"
disabled={loading}
className="bg-yellow-500 hover:bg-yellow-600 text-black py-4 w-full rounded-lg font-semibold transition"
>

{loading ? "Sending..." : "Send Message"}

</button>

</motion.form>

</div>

</div>

</section>

)

}

export default ContactForm