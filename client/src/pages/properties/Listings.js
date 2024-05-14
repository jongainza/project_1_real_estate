import React, { useState, useEffect } from "react";
import axios from "../../helpers/axios.config";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "antd";

export default function Listings() {
  const user = useSelector((state) => state.user);
  const _token = user._token;
  console.log({ _token });
  const [listings, setListings] = useState([]);
  const [listingsError, setListingsError] = useState(false);
  useEffect(() => {
    async function getListings() {
      try {
        const response = await axios.get("/listing/get", {
          headers: {
            Authorization: `Bearer ${_token}`, // Pass token in request headers
          },
        });
        console.log({ response: response.data.data });
        // const data = await response.data.data.json();
        setListings(response.data.data);
        // console.log({ listings });
        // console.log({ response });
      } catch (e) {
        setListingsError(true);
        console.log({ e });
      }
    }
    getListings();
  }, []);

  useEffect(() => {
    console.log({ listings });
  }, [listings]);
  return (
    <div
      style={{
        padding: "3em",
        maxWidth: "90vw",
        margin: "0 auto",
        display: "flex ",
        flexDirection: "column",
        alignItems: "center",
        gap: "2em",
      }}
    >
      <h1 style={{ textAlign: "center", padding: "1em" }}>Your Listings</h1>
      <p style={{ color: "red" }}>
        {listingsError ? "Error getting your listings" : ""}
      </p>
      {listings &&
        listings.length > 0 &&
        listings.map((listing) => (
          <div
            key={listing.property_id}
            style={{
              width: "75%",
              padding: "1em",
              maxWidth: "90vw",
              margin: "0 auto",
              display: "flex ",
              alignItems: "center",
              gap: "1em",
              justifyContent: "space-between",
              placeItems: "center",
              borderRadius: "10px",
              border: "1px solid black",
            }}
          >
            <Link to={`/listing/${listing.property_id}`}>
              <img
                src={listing.image_urls[0]}
                alt="property image"
                style={{ height: 75, width: 75, objectFit: "contain" }}
              />
            </Link>
            <Link to={`/listing/${listing.property_id}`}>
              <p>{listing.title}</p>
            </Link>
            <div
              style={{
                display: "flex ",
                flexDirection: "column",
                gap: "1em",
              }}
            >
              <Button type="primary" size="small" href="/update-listing">
                Update
              </Button>
              <Button
                type="primary"
                size="small"
                href="/delete-listing"
                danger="true"
              >
                Delete
              </Button>{" "}
            </div>
          </div>
        ))}
    </div>
  );
}
