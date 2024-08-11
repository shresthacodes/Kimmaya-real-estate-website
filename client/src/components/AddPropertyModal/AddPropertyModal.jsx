import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { FaTrain, FaRoad, FaCity } from "react-icons/fa";
import "./AddPropertyModal.css";

const AddPropertyModal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [railwayStation, setRailwayStation] = useState("");
  const [highway, setHighway] = useState("");
  const [cityDistance, setCityDistance] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the form data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("address", address);
    formData.append("city", city);
    formData.append(
      "facilities",
      JSON.stringify({
        railwayStation,
        highway,
        city: cityDistance,
      })
    );
    formData.append("userEmail", userEmail);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post("/property/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setSuccess("Property successfully added!");
      setError(null);
      // Clear form fields after successful submission
      setTitle("");
      setDescription("");
      setPrice("");
      setImage(null);
      setAddress("");
      setCity("");
      setRailwayStation("");
      setHighway("");
      setCityDistance("");
      setUserEmail("");
    } catch (error) {
      console.error("Error adding property:", error);
      setError("Error adding property. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <Container className="my-4">
      <h2>Add New Property</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit} className="property-form">
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="facilities">
          <Form.Label>Facilities</Form.Label>
          <div className="facilities">
            <div className="facility">
              <FaTrain size={20} color="#1F3E72" />
              <Form.Control
                type="text"
                placeholder="Distance to Railway Station"
                value={railwayStation}
                onChange={(e) => setRailwayStation(e.target.value)}
                required
              />
            </div>
            <div className="facility">
              <FaRoad size={20} color="#1F3E72" />
              <Form.Control
                type="text"
                placeholder="Distance to Highway"
                value={highway}
                onChange={(e) => setHighway(e.target.value)}
                required
              />
            </div>
            <div className="facility">
              <FaCity size={20} color="#1F3E72" />
              <Form.Control
                type="text"
                placeholder="Distance to City"
                value={cityDistance}
                onChange={(e) => setCityDistance(e.target.value)}
                required
              />
            </div>
          </div>
        </Form.Group>

        <Form.Group controlId="userEmail">
          <Form.Label>Your Email</Form.Label>
          <Form.Control
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Button className="button" variant="primary" type="submit">
          Add Property
        </Button>
      </Form>
    </Container>
  );
};

export default AddPropertyModal;
