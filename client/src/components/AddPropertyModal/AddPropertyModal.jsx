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
    imageUrl: "",
    address: "",
    city: "",
    facilities: {
      railwayStation: "",
      highway: "",
      city: "",
    },
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
    const { name, value } = e.target;
    setProperty((prev) => ({
      ...prev,
      facilities: {
        ...prev.facilities,
        [name]: value,
      },
    }));
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

    // Prioritize uploaded image over URL if both are provided
    const imageToSave = property.image || property.imageUrl;

    try {
      await createResidency({ ...property, image: imageToSave }, token);
      toast.success("Property added successfully!", {
        position: "bottom-right",
      });

      // Reset the form after submission
      setProperty({
        title: "",
        description: "",
        price: "",
        image: "",
        imageUrl: "",
        address: "",
        city: "",
        facilities: {
          railwayStation: "",
          highway: "",
          city: "",
        },
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

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Railway Station</Form.Label>
              <Form.Control
                type="text"
                name="railwayStation"
                value={property.facilities.railwayStation}
                onChange={handleFacilitiesChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Highway</Form.Label>
              <Form.Control
                type="text"
                name="highway"
                value={property.facilities.highway}
                onChange={handleFacilitiesChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={property.facilities.city}
                onChange={handleFacilitiesChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Image Upload</Form.Label>
          <Button variant="secondary" onClick={handleImageChange}>
            Upload Image
          </Button>
          {property.image && (
            <CloudinaryContext cloudName="domlafuvw">
              <Image publicId={property.image}>
                <Transformation width="200" crop="scale" />
              </Image>
            </CloudinaryContext>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Or Enter Image URL</Form.Label>
          <Form.Control
            type="text"
            name="imageUrl"
            value={property.imageUrl}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Property
        </Button>
      </Form>
    </Container>
  );
};

export default AddPropertyForm;
