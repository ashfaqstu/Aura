import "./Home.css"
import { Link } from "../router/Link.jsx"



export default function Home() {
  return (
    <>
    <circle className="circles absolute top-0 left-0 w-96 h-96 bg-blue-50 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></circle>
    <circle className="circles absolute bottom-0 left-0 w-50 h-50 bg-sky-300 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></circle>
    <div className="home blur-2xl "/>
    
  
   <div className=" h-screen flex items justify-center items-center ">
     <h1 className="text-[150px] font-space text-blue-300">AURA</h1>
     
   </div>
   
   </>
  )
}

