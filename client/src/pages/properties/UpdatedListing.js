import React, { useState, useEffect } from "react";
import CurrencyInput from "react-currency-input-field";
import axios from "../../helpers/axios.config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // Import useParams hook
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  getStorage,
} from "@firebase/storage";
import { app } from "../../firebase";
import { Button } from "antd";

export default function UpdateListing() {
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const { id } = useParams(); // Get the listing ID from the URL
  const [listingData, setListingData] = useState(null); // State to store existing listing data
  const [photos, setPhotos] = useState([]);
  const { _token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
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

  useEffect(() => {
    async function fetchListingData() {
      try {
        const response = await axios.get(`/listing/findlisting/${id}`, {
          headers: {
            Authorization: `Bearer ${_token}`, // Pass token in request headers
          },
        });
        if (response.status === 200) {
          setListingData(response.data); // Set fetched listing data
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchListingData(); // Fetch listing data when the component mounts
  }, [id, _token]);

  useEffect(() => {
    // Populate form data with fetched listing data
    if (listingData) {
      setFormData({
        _token,
        title: listingData.title,
        info: listingData.info,
        street: listingData.street,
        number: listingData.number,
        city: listingData.city,
        state: listingData.state,
        country: listingData.country,
        zip_code: listingData.zip_code,
        bedrooms: listingData.bedrooms,
        bathrooms: listingData.bathrooms,
        garage: listingData.garage,
        price: listingData.price,
        images: listingData.images,
      });
      setBedrooms(listingData.bedrooms);
      setBathrooms(listingData.bathrooms);
    }
  }, [listingData, _token]);

  // Function to handle image deletion
  const handleDeleteImage = async (index) => {
    const imageToDelete = formData.images[index];
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });

    try {
      await axios.post(
        `/listing/deleteimage/${id}`,
        { imageUrl: imageToDelete },
        {
          headers: {
            Authorization: `Bearer ${_token}`, // Pass token in request headers
          },
        }
      );
    } catch (error) {
      setError("Image deletion failed. Please try again.");
      console.error(error);
    }
  };

  const handleImageUpload = async () => {
    setUploading(true);
    setError(""); // Clear previous errors

    if (photos.length > 0 && photos.length <= 12) {
      try {
        const promises = Array.from(photos).map((photo) => storeImage(photo));
        const uploadedImages = await Promise.all(promises);
        setFormData((prevFormData) => ({
          ...prevFormData,
          images: [...prevFormData.images, ...uploadedImages],
        }));
        setUploading(false);
      } catch (error) {
        setError("Image upload failed. Please try again.");
        setUploading(false);
      }
    } else {
      setError("Please select up to 12 images.");
      setUploading(false);
    }
  };

  const storeImage = async (photo) => {
    const storage = getStorage(app);
    const photoName = `${Date.now()}_${photo.name}`;
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
      const response = await axios.put(`/listing/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${_token}`, // Pass token in request headers
        },
      });
      if (response.status === 200) {
        navigate(`/listing/${id}`);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Listing update failed. Please try again.");
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", padding: 30 }}>Update Listing</h1>
      {listingData ? (
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
              value={formData.title}
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
              value={formData.info}
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
              value={formData.street}
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
              value={formData.number}
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
              value={formData.city}
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
              value={formData.state}
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
              value={formData.country}
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
              value={formData.zip_code}
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
              <label htmlFor="bathrooms">
                Number of Bathrooms: {bathrooms}
              </label>
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
              checked={formData.garage}
              onChange={(e) => {
                setFormData({ ...formData, garage: e.target.checked });
              }}
            />
          </div>

          <CurrencyInput
            placeholder="Asking Price"
            prefix="$"
            decimalsLimit={2}
            value={formData.price}
            onValueChange={(value) => {
              const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ""));
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
                e.preventDefault();
                handleImageUpload();
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
                  display: "flex",
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
                    display: "flex",
                    gap: "2em",
                    flexWrap: "wrap",
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
                        danger={true}
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
            {uploading ? "UPLOADING..." : "UPDATE"}
          </button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
