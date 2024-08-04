import React from "react";
import "./Property.css";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getProperty } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import { AiFillHeart } from "react-icons/ai";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import { FaTrain, FaRoad, FaCity } from "react-icons/fa";
import { FaShower } from "react-icons/fa";
import Map from "../../components/Map/Map";
const Property = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").splice(-1)[0];
  const { data, isLoading, isError, refetch } = useQuery(["property", id], () =>
    getProperty(id)
  );
  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while fetching the property details</span>
        </div>
      </div>
    );
  }
  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        {/* like button */}
        <div className="like">
          <AiFillHeart size={24} color="white" />
        </div>
        {/* image */}
        <img src={data?.image} alt="home image" />

        <div className="flexCenter property-details">
          {/* left side */}
          <div className="flexColStart left">
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                Rs.{data?.price}
              </span>
            </div>
            {/* facilities */}
            <div className="flexStart facilities">
              {/* railway station */}
              <div className="flexStart facility">
                <FaTrain size={20} color="#1F3E72" />
                <span>Railway Station: {data?.facilities?.railwayStation}</span>
              </div>

              {/* highway */}
              <div className="flexStart facility">
                <FaRoad size={20} color="#1F3E72" />
                <span>Highway: {data?.facilities?.highway}</span>
              </div>

              {/* city */}
              <div className="flexStart facility">
                <FaCity size={20} color="#1F3E72" />
                <span>City: {data?.facilities?.city}</span>
              </div>
            </div>

            {/* description */}
            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data?.description}
            </span>
            {/* location */}
            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {data?.address} {data?.city} {data?.country}
              </span>
            </div>
            <button className="button">Book your Visit</button>
          </div>
          {/* right side */}
          <div className="map">
            <Map
              address={data?.address}
              city={data?.city}
              country={data?.country}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
