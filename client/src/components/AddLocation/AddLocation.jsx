import React, { useState } from "react";
import useCountries from "../../hooks/useCountries";
import Map from "../Map/Map";
import "./AddLocation.css"; // Add this CSS file for custom styling

const AddLocation = ({ propertyDetails, setPropertyDetails, nextStep }) => {
  const { getAll } = useCountries();
  const [formValues, setFormValues] = useState({
    country: propertyDetails?.country || "",
    city: propertyDetails?.city || "",
    address: propertyDetails?.address || "",
  });

  const [errors, setErrors] = useState({});

  const validateString = (value) => {
    if (!value.trim()) {
      return "This field is required";
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    Object.keys(formValues).forEach((key) => {
      const error = validateString(formValues[key]);
      if (error) {
        validationErrors[key] = error;
      }
    });

    if (Object.keys(validationErrors).length === 0) {
      setPropertyDetails((prev) => ({
        ...prev,
        ...formValues,
      }));
      nextStep();
    } else {
      setErrors(validationErrors);
    }
  };

  const { country, city, address } = formValues;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-container">
        <div className="input-group">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            name="country"
            value={country}
            onChange={handleChange}
            required
          >
            <option value="">Select a country</option>
            {getAll().map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && (
            <span className="error-text">{errors.country}</span>
          )}
        </div>

        <div className="input-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={city}
            onChange={handleChange}
            required
          />
          {errors.city && <span className="error-text">{errors.city}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={handleChange}
            required
          />
          {errors.address && (
            <span className="error-text">{errors.address}</span>
          )}
        </div>

        <div className="map-container">
          <Map address={address} city={city} country={country} />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit">Next Step</button>
      </div>
    </form>
  );
};

export default AddLocation;
