import "./Hero.css";
import CountUp from "react-countup";
import { motion } from "framer-motion";

import Chatbot from "../Chatbot/Chatbot";
import Searchbar from "../SearchBar/SearchBar";

const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        {/* left side */}
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <div className="orange-circle" />
            <motion.h1
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 2,
                type: "ease-in",
              }}
            >
              Discover <br />
              Your Ideal Farmland
              <br /> & Fresh Harvest
            </motion.h1>
          </div>
          <div className="flexColStart secondaryText flexhero-des">
            <span>Discover Properties Tailored to Your Needs</span>
            <span>Say Goodbye to the Stress of Finding the Perfect Farm</span>
          </div>

          <Searchbar />

          <div className="flexCenter stats">
            <div className="flexColCenter stat">
              <span>
                <CountUp start={50} end={90} duration={4} /> <span>+</span>
              </span>
              <span className="secondaryText">Acres of Farmland Sold</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp start={50} end={80} duration={4} /> <span>+</span>
              </span>
              <span className="secondaryText">Satisfied Farmers & Buyers</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp end={30} /> <span>kg+</span>
              </span>
              <span className="secondaryText">Organic Products Delivered</span>
            </div>
          </div>
        </div>

        {/* right side */}

        <div className="flexCenter hero-right">
          <motion.div
            initial={{ x: "7rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 2,
              type: "ease-in",
            }}
            className="image-container"
          >
            <img src="./farm.jpg" alt="houses" />
          </motion.div>
          <Chatbot />
        </div>
      </div>
    </section>
  );
};

export default Hero;
