import React from "react";
import "./GetStarted.css";
const GetStarted = () => {
  return (
    <div id="get-started" className="g-wrapper">
      <div className="paddings innerWidth g-container">
        <div className="flexColCenter inner-container">
          <span className="primaryText">Get started with Kimmaya</span>
          <span className="secondaryText">
          Subscribe to get the latest updates on new farmland listings and property opportunities!
            <br />
            Find your residence soon
          </span>
          <button className="button" href>
            <a href="mailto:kimmayafarms@gmail.com">Get Started</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
