import React, { useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import useProperties from "../../hooks/useProperties.jsx";
import { createResidency } from "../../utils/api";
import UserDetailContext from "../../components/Context/UserDetailContext";
import "./Facilities.css"; // Add this CSS file for custom styling

const Facilities = ({
  prevStep,
  propertyDetails,
  setPropertyDetails,
  setOpened,
  setActiveStep,
}) => {
  const [formValues, setFormValues] = useState({
    bedrooms: propertyDetails.facilities.bedrooms,
    parkings: propertyDetails.facilities.parkings,
    bathrooms: propertyDetails.facilities.bathrooms,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formValues);
    if (Object.keys(errors).length === 0) {
      setPropertyDetails((prev) => ({
        ...prev,
        facilities: formValues,
      }));
      mutate();
    } else {
      // Handle form validation errors
      Object.values(errors).forEach((error) => toast.error(error));
    }
  };

  const validateForm = (values) => {
    const errors = {};
    if (values.bedrooms < 1) errors.bedrooms = "Must have at least one room";
    if (values.bathrooms < 1)
      errors.bathrooms = "Must have at least one bathroom";
    return errors;
  };

  const { user } = useAuth0();
  const {
    userDetails: { token },
  } = useContext(UserDetailContext);
  const { refetch: refetchProperties } = useProperties();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      createResidency(
        {
          ...propertyDetails,
          facilities: formValues,
        },
        token
      ),
    onError: ({ response }) =>
      toast.error(response.data.message, { position: "bottom-right" }),
    onSettled: () => {
      toast.success("Added Successfully", { position: "bottom-right" });
      setPropertyDetails({
        title: "",
        description: "",
        price: 0,
        country: "",
        city: "",
        address: "",
        image: null,
        facilities: {
          bedrooms: 0,
          parkings: 0,
          bathrooms: 0,
        },
        userEmail: user?.email,
      });
      setOpened(false);
      setActiveStep(0);
      refetchProperties();
    },
  });

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="bedrooms">No of Bedrooms</label>
          <input
            type="number"
            id="bedrooms"
            name="bedrooms"
            value={formValues.bedrooms}
            min={1}
            required
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="parkings">No of Parkings</label>
          <input
            type="number"
            id="parkings"
            name="parkings"
            value={formValues.parkings}
            min={0}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="bathrooms">No of Bathrooms</label>
          <input
            type="number"
            id="bathrooms"
            name="bathrooms"
            value={formValues.bathrooms}
            min={1}
            required
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={prevStep} disabled={isLoading}>
            Back
          </button>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting" : "Add Property"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Facilities;
