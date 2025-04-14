import { FaLocationArrow } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import MagicButton from "./MagicButton";

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10" id="contact">
      {/* background grid */}
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-50 "
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          Ready to ace <span className="text-purple">your</span> final year 
          project with expert guidance?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Contact us today to discuss your project ideas, technical requirements, 
          or get help with your ongoing final year project.
        </p>
        
        {/* Button Container */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <a href="mailto:innofuze.tech@gmail.com">
            <MagicButton
              title="Get project support"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
          
          <a 
            href="https://www.youtube.com/@InnoSchool-aj" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <MagicButton
              title="Watch us on YouTube"
              icon={<FaYoutube />}
              position="right"
            />
          </a>
        </div>
      </div>
      
      <div className="flex mt-16 md:flex-row flex-col justify-center items-center">
        {/* <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © 2024 Inno Fuze | Expert Final Year Project Support
        </p> */}
      </div>
    </footer>
  );
};

export default Footer;