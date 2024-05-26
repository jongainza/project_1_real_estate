import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../helpers/axios.config";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { useSelector } from "react-redux";

import {
  FaCopy,
  FaBath,
  FaBed,
  FaMapMarkerAlt,
  FaParking,
} from "react-icons/fa";
import Bid from "../bids/Bid.js";
export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const { id } = useParams(); // Get the listing ID from the URL
  const [offer, setOffer] = useState(false);
  const { currentUser, _token } = useSelector((state) => state.user);

  useEffect(() => {
    const getListing = async () => {
      try {
        console.log({ _token });
        setLoading(true);
        const res = await axios.get(`/listing/findListing/${id}`);
        console.log({ res });
        const data = res.data;
        if (data.name === "error") {
          setLoading(false);
          setError(true);
          return;
        }
        setLoading(false);
        setListing(data);
        setError(false);
      } catch (e) {
        setListing(null);
        setError(true);
        setLoading(false);
      }
    };
    getListing();
  }, [id]);

  return (
    <div>
      {loading && (
        <p style={{ textAlign: "center", color: "blue" }}>Loading...</p>
      )}
      {error && (
        <p style={{ textAlign: "center", color: "red" }}>
          There was an error loading the listing.
        </p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.images.map((image) => (
              <SwiperSlide key={image}>
                <div
                  style={{
                    height: "550px",
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            style={{
              position: "fixed",
              top: "13%",
              right: "3%",
              zIndex: 10,
              border: "1px solid",
              borderRadius: "50%",
              width: "3rem",
              height: "3rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f1f5f9",
              cursor: "pointer",
            }}
          >
            <FaCopy
              style={{ color: "#64748b" }}
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p
              style={{
                position: "fixed",
                top: "20%",
                right: "10%",
                zIndex: 10,
                borderRadius: "50%",
                width: "3rem",
                height: "3rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f1f5f9",
                cursor: "pointer",
              }}
            >
              Link copied!
            </p>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "64rem",
              margin: "1.75rem auto",
              padding: "0.75rem",
              gap: "1rem",
            }}
          >
            <p style={{ fontSize: "2rem", fontWeight: 600 }}>
              {listing.title} - ${listing.price.toLocaleString("en-US")}
            </p>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "1.5rem",
                gap: "0.5rem",
                color: "#64748b",
                fontSize: "0.875rem",
              }}
            >
              <FaMapMarkerAlt style={{ color: "#15803d" }} />
              {listing.number} {listing.street} {listing.city}
            </p>
            <p>
              {listing.zip_code}{" "}
              <span
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: "#000000",
                }}
              >
                {listing.city}
              </span>{" "}
              {listing.state}
            </p>
            <p>{listing.country}</p>
            <p style={{ color: "#1e293b" }}>
              <span style={{ fontWeight: 600, color: "#000000" }}>
                Description -{" "}
              </span>
              {listing.info}
            </p>
            <ul
              style={{
                color: "#065f46",
                fontWeight: 600,
                fontSize: "0.875rem",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  whiteSpace: "nowrap",
                }}
              >
                <FaBed style={{ fontSize: "1.125rem" }} />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  whiteSpace: "nowrap",
                }}
              >
                <FaBath style={{ fontSize: "1.125rem" }} />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  whiteSpace: "nowrap",
                }}
              >
                <FaParking style={{ fontSize: "1.125rem" }} />
                {listing.garage ? "Parking spot" : "No Parking"}
              </li>
            </ul>
            {currentUser && listing.user_id === currentUser.id && !offer && (
              <button
                onClick={() => setOffer(true)}
                style={{
                  backgroundColor: "#334155",
                  color: "white",
                  borderRadius: "0.375rem",
                  textTransform: "uppercase",
                  padding: "0.75rem",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => (e.target.style.opacity = 0.95)}
                onMouseOut={(e) => (e.target.style.opacity = 1)}
              >
                Make an Offer
              </button>
            )}
            {offer && <Bid id={id} />}
          </div>
        </div>
      )}
    </div>
  );
}
