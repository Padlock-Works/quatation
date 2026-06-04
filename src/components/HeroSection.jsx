import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
            Professional Web 
            <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
                {" "}Quotation Toolkit
            </span>            
        </h1>
        <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
            Streamline your web development business with our professional quotation and pricing tool. 
            Draft accurate quotes, discover client needs, and close more deals with transparent pricing.
        </p>
        <div className="flex justify-center my-10">
            <a href="#quotation-tool" className="bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-4 mx-3 rounded-md text-white">
                Start Estimating
            </a>
            <a href="#workflow" className="py-3 px-4 mx-3 rounded-md border text-white">
                Our Process
            </a>
        </div>
        <div className="flex mt-10 justify-center">
            <video autoPlay loop muted className="rounded-lg w-1/2 border border-orange-700 shadow-orange-400 mx-2 my-4">
            <source src={video1} type="video/mp4"/>
            </video>
            <video autoPlay loop muted className="rounded-lg w-1/2 border border-orange-700 shadow-orange-400 mx-2 my-4">
            <source src={video2} type="video/mp4"/>
            </video>
        </div>
    </div>
  )
}

export default HeroSection
