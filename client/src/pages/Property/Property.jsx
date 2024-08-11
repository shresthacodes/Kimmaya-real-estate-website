import React, { useState, useContext } from "react";
import "./Property.css";
import { useQuery, useMutation } from "react-query";
import { useLocation } from "react-router-dom";
import { getProperty, removeBooking } from "../../utils/api";
import { PuffLoader } from "react-spinners";

import { MdLocationPin } from "react-icons/md";
import { FaTrain, FaRoad, FaCity } from "react-icons/fa";
import Map from "../../components/Map/Map";
import { useAuth0 } from "@auth0/auth0-react";
import useAuthCheck from "../../hooks/useAuthCheck";
import BookingModal from "../../components/BookingModal/BookingModal";
import Heart from "../../components/Heart/Heart";
import { toast } from "react-toastify";
import UserDetailContext from "../../components/Context/UserDetailContext";

const Property = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").splice(-1)[0];
  const { data, isLoading, isError, refetch } = useQuery(["property", id], () =>
    getProperty(id)
  );

  const [modalOpened, setModalOpened] = useState(false);
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();
  const {
    userDetails: { token, bookings },
    setUserDetails,
  } = useContext(UserDetailContext);

  const isBooked = bookings?.map((booking) => booking.id).includes(id);

  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
    mutationFn: () => removeBooking(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((booking) => booking?.id !== id),
      }));

      toast.success("Booking cancelled", { position: "bottom-right" });
    },
    onError: () => {
      toast.error("Failed to cancel booking", { position: "bottom-right" });
    },
  });

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
          <Heart id={id} />
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

            {isBooked ? (
              <>
                <button
                  className="button"
                  onClick={() => cancelBooking()}
                  disabled={cancelling}
                >
                  {cancelling ? "Cancelling..." : "Cancel Booking"}
                </button>
                <span>
                  Your visit is booked for date:{" "}
                  {bookings?.find((booking) => booking?.id === id)?.date}
                </span>
              </>
            ) : (
              <button
                className="button"
                onClick={() => {
                  validateLogin() && setModalOpened(true);
                }}
              >
                Book your Visit
              </button>
            )}

            <BookingModal
              opened={modalOpened}
              setOpened={setModalOpened}
              propertyId={id}
              email={user?.email}
            />
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
