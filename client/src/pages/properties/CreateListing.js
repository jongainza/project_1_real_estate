import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import axios from "../../helpers/axios.config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function CreateListing() {
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [photos, setPhotos] = useState([]);
  const { _token } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    _token,
    title: "",
    info: "",
    street: "",
    number: "",
    city: "",
    state: "",
    country: "",
    zip_code: "",
    bedrooms: 0,
    bathrooms: 0,
    garage: false,
    price: "",
    images: [],
  });
  //   console.log({ photos });
  //   console.log({ formData });
  const navigate = useNavigate();
  // Function to convert a File object to a data URL
  const fileToDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (photos.length >= 6 && photos.length <= 12) {
      try {
        const imageUrls = await Promise.all(photos.map(fileToDataURL));
        console.log("Image URLs:", imageUrls);

        // setFormData((prevFormData) => ({
        //   ...prevFormData,
        //   images: imageUrls,
        // }));
        const updatedFormData = {
          ...formData,
          images: imageUrls,
        };
        console.log("Updated FormData:", updatedFormData);

        console.log({ formData });
        const response = await axios.post("/listing/create", updatedFormData);
        if (response.status === 201) {
          console.log("LISTING CREATED");
          navigate("/listings");
        } else {
          throw new Error(response.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("Please upload between 6 and 12 photos.");
    }
  };
  return (
    <div>
      <h1 style={{ textAlign: "center", padding: 30 }}>Create Listing</h1>
      <form
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
        onSubmit={handleSubmit}
      >
        <div style={{ display: "flex", flexDirection: "row", gap: 16 }}>
          <input
            type="text"
            placeholder="Title"
            id="title"
            style={{ border: "solid", padding: 3, borderRadius: 8 }}
            required
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
          />
          <textarea
            type="text"
            placeholder="Info"
            id="info"
            style={{ border: "solid", padding: 3, borderRadius: 8 }}
            required
            onChange={(e) => {
              setFormData({ ...formData, info: e.target.value });
            }}
          />
        </div>
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 16,
            padding: 20,
          }}
        >
          <input
            type="text"
            placeholder="Street"
            id="Street"
            style={{ border: "solid", padding: 3, borderRadius: 8 }}
            required
            onChange={(e) => {
              setFormData({ ...formData, street: e.target.value });
            }}
          />
          <input
            type="number"
            placeholder="Street number"
            id="number"
            style={{ border: "solid", padding: 3, borderRadius: 8 }}
            required
            onChange={(e) => {
              const nNumber = parseInt(e.target.value);
              setFormData({ ...formData, number: nNumber });
            }}
          />
          <input
            type="text"
            placeholder="City"
            id="city"
            style={{ border: "solid", padding: 3, borderRadius: 8 }}
            required
            onChange={(e) => {
              setFormData({ ...formData, city: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="State"
            id="state"
            style={{ border: "solid", padding: 3, borderRadius: 8 }}
            required
            onChange={(e) => {
              setFormData({ ...formData, state: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Country"
            id="country"
            style={{ border: "solid", padding: 3, borderRadius: 8 }}
            required
            onChange={(e) => {
              setFormData({ ...formData, country: e.target.value });
            }}
          />
          <input
            type="number"
            placeholder="Zip Code"
            id="zip_code"
            style={{ border: "solid", padding: 3, borderRadius: 8 }}
            required
            onChange={(e) => {
              const zipCode = parseInt(e.target.value);
              setFormData({ ...formData, zip_code: zipCode });
            }}
          />
        </div>
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 16,
            padding: 20,
          }}
        >
          <div style={{ display: "flex", gap: 16 }}>
            <label htmlFor="bedrooms">Number of Bedrooms: {bedrooms}</label>
            <input
              type="range"
              min="0"
              max="25"
              value={bedrooms}
              onChange={(e) => {
                setBedrooms(parseInt(e.target.value));
                setFormData({ ...formData, bedrooms: bedrooms });
              }}
              step="1"
              id="bedrooms"
              required
            />
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <label htmlFor="bathrooms">Number of Bathrooms: {bathrooms}</label>
            <input
              type="range"
              min="0"
              max="25"
              value={bathrooms}
              onChange={(e) => {
                setBathrooms(parseInt(e.target.value));

                setFormData({ ...formData, bathrooms: bathrooms });
              }}
              step="1"
              id="bathrooms"
              required
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, padding: 20 }}>
          <label htmlFor="garage">Garage </label>
          <input
            type="checkbox"
            id="garage"
            onChange={(e) => {
              setFormData({ ...formData, garage: e.target.checked });
            }}
          />
        </div>

        <CurrencyInput
          placeholder="Asking Price"
          prefix="$"
          decimalsLimit={2}
          onChange={(e) => {
            // Remove commas from the formatted value
            const cleanedValue = e.target.value.replace(/,/g, "");

            // Remove non-numeric characters and parse to a float
            const numericValue = parseFloat(
              cleanedValue.replace(/[^0-9.-]+/g, "")
            );

            // Update the state with the parsed numeric value
            setFormData({ ...formData, price: numericValue });
          }}
          style={{ border: "solid", padding: 3, borderRadius: 8 }}
          required
        />
        <div style={{ display: "flex", gap: 16, padding: 20 }}>
          <input
            // onChange={(e) => {
            //   const newPhotos = [...photos, ...e.target.files];
            //   if (newPhotos.length <= 12) {
            //     setPhotos(newPhotos);
            //   }
            // }}
            type="file"
            id="images"
            accept="image/*"
            multiple
            style={{ border: "solid", padding: 3, borderRadius: 8 }}
          />
          <button
            style={{ padding: 3, borderRadius: 8 }}
            onClick={(e) => {
              e.preventDefault();
              const newPhotos = [
                ...photos,
                ...document.getElementById("images").files,
              ];
              if (newPhotos.length <= 12) {
                setPhotos(newPhotos);
              }
            }}
          >
            Upload
          </button>
        </div>
        <button type="submit" style={{ padding: 3, borderRadius: 8 }}>
          CREATE
        </button>
      </form>
    </div>
  );
}
