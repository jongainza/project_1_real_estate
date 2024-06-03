import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
export default function ListingItem({ listing }) {
  const imageStyle = {
    height: "320px",
    width: "100%",
    objectFit: "cover",
    transition: "transform 0.3s",
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
        overflow: "hidden",
        borderRadius: "8px",
        width: "100%",
        maxWidth: "330px",
      }}
    >
      <Link to={`/listing/${listing.property_id}`}>
        <img
          src={
            listing.image_urls[0] ||
            "data:image/jpeg;base64,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"
          }
          alt="listing cover"
          style={{
            ...imageStyle,
            height: "320px",
            "@media (max-width: 640px)": { height: "220px" },
          }}
        />
        <div
          style={{
            padding: "0.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            width: "100%",
          }}
        >
          <p
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#4b5563",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {listing.title}
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
        </div>
        <p
          style={{
            fontSize: "0.875rem",
            color: "#6b7280",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
          }}
        >
          {listing.info}
        </p>

        <div style={{ display: "flex", gap: "0.5rem", color: "#4b5563" }}>
          <div style={{ fontWeight: "600", fontSize: "0.75rem" }}>
            {listing.bedrooms > 1
              ? `${listing.bedrooms} beds`
              : `${listing.bedrooms} bed`}
          </div>
          <div style={{ fontWeight: "600", fontSize: "0.75rem" }}>
            {listing.bathrooms > 1
              ? `${listing.bathrooms} baths`
              : `${listing.bathrooms} bath`}
          </div>
        </div>
      </Link>
    </div>
  );
}
