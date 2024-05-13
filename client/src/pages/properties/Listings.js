import React, { useState, useEffect } from "react";
import axios from "../../helpers/axios.config";

export default function Listings() {
  const [listgsError, setListingsError] = useState(false);
  useEffect(() => {
    async function getListings() {
      try {
        const response = await axios.get("/listing/get");
        console.log({ response });
      } catch (e) {
        setListingsError(true);
        console.log({ e });
      }
    }
    getListings();
  }, []);
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
        {listgsError ? "Error getting your listings" : ""}
      </p>
    </div>
  );
}
