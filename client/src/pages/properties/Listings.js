import React, { useState, useEffect } from "react";
import axios from "../../helpers/axios.config";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "antd";

export default function Listings() {
  const user = useSelector((state) => state.user);
  const _token = user._token;
  const [listings, setListings] = useState([]);
  const [bidsStatus, setBidsStatus] = useState({});
  const [listingsError, setListingsError] = useState(false);

  useEffect(() => {
    async function getListings() {
      try {
        const response = await axios.get("/listing/get", {
          headers: {
            Authorization: `Bearer ${_token}`,
          },
        });
        const listingsData = response.data.data;
        setListings(listingsData);

        const bidsPromises = listingsData.map((listing) =>
          axios.get(`/bid/get/${listing.property_id}`, {
            headers: {
              Authorization: `Bearer ${_token}`,
            },
          })
        );

        const bidsResponses = await Promise.all(bidsPromises);
        const bidsStatusData = bidsResponses.reduce((acc, res, index) => {
          acc[listingsData[index].property_id] =
            res.data.data.bid.length > 0 ? true : false;
          return acc;
        }, {});

        setBidsStatus(bidsStatusData);
      } catch (e) {
        setListingsError(true);
      }
    }
    getListings();

    const styles = `
      @keyframes blink {
        0% { opacity: 1; }
        50% { opacity: 0; }
        100% { opacity: 1; }
      }
    `;
    document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);
  }, [_token]);

  const handleDeleteListing = async (id) => {
    try {
      const response = await axios.delete(`/listing/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${_token}`,
        },
      });
      setListings((prev) =>
        prev.filter((listing) => listing.property_id !== id)
      );
      setBidsStatus((prev) => {
        const updatedStatus = { ...prev };
        delete updatedStatus[id];
        return updatedStatus;
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div
      style={{
        padding: "3em",
        maxWidth: "90vw",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2em",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Your Listings</h1>
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
              display: "flex",
              alignItems: "center",
              gap: "1em",
              justifyContent: "space-between",
              placeItems: "center",
              borderRadius: "10px",
              border: "1px solid black",
              position: "relative",
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
                display: "flex",
                flexDirection: "column",
                gap: "1em",
              }}
            >
              <Link to={`/update-listing/${listing.property_id}`}>
                <Button type="primary" size="small">
                  Update
                </Button>
              </Link>
              <Button
                type="primary"
                size="small"
                danger="true"
                onClick={() => handleDeleteListing(listing.property_id)}
              >
                Delete
              </Button>
            </div>
            {bidsStatus[listing.property_id] && (
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "green",
                  animation: "blink 1s infinite",
                }}
              />
            )}
          </div>
        ))}
    </div>
  );
}
