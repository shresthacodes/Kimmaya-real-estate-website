import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { createResidency } from "../../utils/api";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import "./AddPropertyModal.css";

const AddPropertyForm = ({ userEmail, token }) => {
  const [property, setProperty] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    address: "",
    city: "",
    facilities: [],
    userEmail: userEmail,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({
      ...prev,
      [name]: name === "price" ? parseInt(value) || "" : value,
    }));
  };

  const handleFacilitiesChange = (e) => {
    const facilities = e.target.value.split(",").map((item) => item.trim());
    setProperty((prev) => ({ ...prev, facilities }));
  };

  const handleImageChange = (e) => {
    const uploadWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "domlafuvw",
        uploadPreset: "Kimmaya",
        sources: ["local"],
        showAdvancedOptions: false,
        cropping: false,
        multiple: false,
        theme: "minimal",
      },
      (error, result) => {
        if (result.event === "success") {
          setProperty((prev) => ({
            ...prev,
            image: result.info.secure_url,
          }));
          toast.success("Image uploaded successfully!", {
            position: "bottom-right",
          });
        }
      }
    );

    uploadWidget.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createResidency(property, token);
      toast.success("Property added successfully!", {
        position: "bottom-right",
      });

      // Reset the form after submission
      setProperty({
        title: "",
        description: "",
        price: "",
        image: "",
        address: "",
        city: "",
        facilities: [],
        userEmail: userEmail,
      });
    } catch (error) {
      console.error("Error adding property:", error);
      toast.error("Failed to add property. Please try again.", {
        position: "bottom-right",
      });
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={property.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={property.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={property.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={property.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={property.city}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Facilities (comma-separated)</Form.Label>
          <Form.Control
            type="text"
            value={property.facilities.join(", ")}
            onChange={handleFacilitiesChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Button variant="secondary" onClick={handleImageChange}>
            Upload Image
          </Button>
          {property.image && (
            <CloudinaryContext cloudName="YOUR_CLOUD_NAME">
              <Image publicId={property.image}>
                <Transformation width="200" crop="scale" />
              </Image>
            </CloudinaryContext>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Property
        </Button>
      </Form>
    </Container>
  );
};

export default AddPropertyForm;
