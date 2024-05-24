import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import axios from "../../helpers/axios.config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  getStorage,
} from "@firebase/storage";
import { app } from "../../firebase";
import { Button, ConfigProvider, Flex, Space } from "antd";

export default function CreateListing() {
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [photos, setPhotos] = useState([]);
  const { _token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false); // State to track whether images are being uploaded
  const [error, setError] = useState(""); // State for error message

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
  // Function to handle image deletion
  const handleDeleteImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1); // Remove the image at the specified index
    setFormData({ ...formData, images: newImages });
  };

  const handleImageUpload = async () => {
    setUploading(true);
    console.log({ photos });
    if (photos.length > 0 && photos.length <= 12) {
      const promises = [];
      for (let i = 0; i < photos.length; i++) {
        promises.push(storeImage(photos[i]));
      }
      await Promise.all(promises);
      setUploading(false);
    }
  };

  const storeImage = async (photo) => {
    const storage = getStorage(app);
    const photoName = photo.name;
    const storageRef = ref(storage, photoName);
    const uploadTask = uploadBytesResumable(storageRef, photo);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                images: [...prevFormData.images, downloadURL],
              }));
              resolve(downloadURL);
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (photos.length < 6) {
        setError("Please upload at least six images");
        return; // Prevent form submission if no images are selected
      }
      console.log({ formData });
      console.log({ bathrooms: formData.bathrooms });
      const response = await axios.post("/listing/create", formData);
      if (response.status === 201) {
        console.log("LISTING CREATED");
        navigate("/listings");
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("Error:", error);
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
                const value = parseInt(e.target.value);
                setBedrooms(value);
                setFormData({ ...formData, bedrooms: value });
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
                const value = parseInt(e.target.value);
                setBathrooms(value);
                setFormData({ ...formData, bathrooms: value });
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
            type="file"
            id="images"
            accept="image/*"
            multiple
            onChange={(e) => {
              setPhotos(e.target.files);
            }}
            style={{ border: "solid", padding: 3, borderRadius: 8 }}
          />
          <button
            style={{ padding: 3, borderRadius: 8 }}
            type="button"
            onClick={(e) => {
              handleImageUpload();
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
        {/* Display preloaded images */}
        <div>
          {formData.images.length > 0 && (
            <div
              style={{
                padding: "1em",
                maxWidth: "90vw",
                margin: "0 auto",
                display: "flex ",
                flexDirection: "column",
                alignItems: "center",
                gap: "1em",
              }}
            >
              <h4>Loaded Images</h4>
              <div
                style={{
                  padding: "1em",
                  maxWidth: "90vw",
                  margin: "0 auto",
                  display: "flex ",
                  gap: "2em",
                }}
              >
                {formData.images.map((image, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1em",
                    }}
                  >
                    <img
                      src={image}
                      alt={`Image ${index}`}
                      width={100}
                      height={100}
                    />
                    <Button
                      type="primary"
                      size="small"
                      onClick={() => handleDeleteImage(index)}
                      danger="true"
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Error message */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          type="submit"
          style={{ padding: 3, borderRadius: 8 }}
          disabled={uploading}
        >
          {uploading ? "UPLOADING..." : "CREATE"}
        </button>
      </form>
    </div>
  );
}
