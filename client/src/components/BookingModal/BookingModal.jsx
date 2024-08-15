import React, { useContext, useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useMutation } from "react-query";
import { bookVisit } from "../../utils/api.js";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import UserDetailContext from "../../Context/UserDetailContext.js";

const BookingModal = ({ opened, setOpened, email, propertyId }) => {
  const [value, setValue] = useState(null);
  const {
    userDetails: { token, bookings },
    setUserDetails,
  } = useContext(UserDetailContext);

  useEffect(() => {
    // Read bookings from local storage and set the state
    const savedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setUserDetails((prev) => ({
      ...prev,
      bookings: savedBookings,
    }));
  }, [setUserDetails]);

  const handleBookingSuccess = () => {
    toast.success("You have booked your visit", {
      position: "bottom-right",
    });

    const newBooking = {
      id: propertyId,
      date: dayjs(value).format("DD/MM/YYYY"),
    };

    const updatedBookings = [...(bookings || []), newBooking];
    localStorage.setItem("bookings", JSON.stringify(updatedBookings)); // Save to local storage

    setUserDetails((prev) => ({
      ...prev,
      bookings: updatedBookings,
    }));
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(value, propertyId, email, token),
    onSuccess: () => handleBookingSuccess(),
    onError: ({ response }) => toast.error(response.data.message),
    onSettled: () => setOpened(false),
  });

  return (
    <Modal show={opened} onHide={() => setOpened(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Select your date of visit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          className="d-flex flex-column align-items-center"
          style={{ gap: "1rem" }}
        >
          <input
            type="date"
            value={value ? dayjs(value).format("YYYY-MM-DD") : ""}
            onChange={(e) => setValue(e.target.value)}
            min={dayjs().format("YYYY-MM-DD")}
            className="form-control"
          />
          <Button
            disabled={!value || isLoading}
            onClick={() => mutate()}
            variant="primary"
          >
            Book visit
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default BookingModal;
