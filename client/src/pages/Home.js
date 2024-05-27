import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../helpers/axios.config";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import ListingProperty from "../components/ListingProperty";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [listingsImage, setListingsImage] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const getListings = async () => {
      try {
        const res = await axios.get("/listing/getListings");
        setListings(res.data.rows);
        if (res.data.rows && Array.isArray(res.data.rows)) {
          const images = res.data.rows
            .map((row) => row.image_urls[0]) // Get the first image URL from each row
            .filter((url) => typeof url === "string" && url.startsWith("http")); // Filter out invalid URLs
          console.log({ images }); // Log the filtered images array
          setListingsImage(images);
        } else {
          console.log("Data structure is invalid:", res.data.rows);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getListings();
  }, []);
  useEffect(() => {
    console.log({ listingsImage });
  }, [listingsImage]);
  useEffect(() => {
    console.log({ listings });
  }, [listings]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem", // 6 * 0.25rem (1.5rem)
          padding: "7rem 0.75rem", // 28 * 0.25rem and 3 * 0.25rem
          maxWidth: "90rem", // 6xl
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            color: "#334155", // text-slate-700
            fontWeight: "bold",
            fontSize: "1.875rem", // text-3xl
            lineHeight: "2.25rem", // text-3xl
            "@media (minWidth: 1024px)": {
              // lg:text-6xl
              fontSize: "3.75rem",
              lineHeight: "1",
            },
          }}
        >
          Buy the <span style={{ color: "#64748b" }}>right</span> house
          <br />
          At a <span style={{ color: "#64748b" }}>fair</span> price
        </h1>
        <div
          style={{
            color: "#9ca3af", // text-gray-400
            fontSize: "0.75rem", // text-xs
            lineHeight: "1rem", // text-xs
            "@media (minWidth: 640px)": {
              // sm:text-sm
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
            },
          }}
        >
          Bootstap Estate is where you can buy houses at a price you feel
          confortable.
          <br />A wide variety of houses for you to find what better suits your
          needs.
        </div>
        <Link
          to={"/search"}
          style={{
            fontSize: "0.75rem", // text-xs
            lineHeight: "1rem", // text-xs
            color: "#1e40af", // text-blue-800
            fontWeight: "bold",
            textDecoration: "none",
            "@media (minWidth: 640px)": {
              // sm:text-sm
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
            },
            ":hover": {
              textDecoration: "underline",
            },
          }}
        >
          Find your house...
        </Link>
      </div>

      <Swiper navigation>
        {listingsImage &&
          listingsImage.length > 0 &&
          listingsImage.map((image) => (
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

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        <div>
          <div>
            <h2>Newest Properties</h2>
            <Link to={"/search"}>Search more properties</Link>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {listings.map((listing) => {
              return (
                <ListingProperty listing={listing} key={listing.property_id} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
