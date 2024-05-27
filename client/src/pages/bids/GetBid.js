import React, { useEffect, useState } from "react";
import axios from "../../helpers/axios.config";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function GetBid() {
  let { bid_id } = useParams();
  const [bid, setBid] = useState(null);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user);
  const _token = user._token;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBid = async () => {
      try {
        console.log({ user });
        bid_id = parseInt(bid_id);
        console.log({ bid_id });
        //   const bid = await axios.get(`/bid/get/${data.property_id}`, {
        //     headers: {
        //       Authorization: `Bearer ${_token}`,
        //     },
        //   });
        const response = await axios.get(`/bid/bid/${bid_id}`, {
          headers: {
            Authorization: `Bearer ${_token}`,
          },
        });
        console.log({ res1: response });

        setBid(response.data.bid.bid);
      } catch (e) {
        setError(e.message);
      }
    };

    fetchBid();
  }, [bid_id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!bid) {
    return <div>Loading...</div>;
  }
  const bidDate = new Date(bid.bid_date).toLocaleDateString();

  const handleDelete = async (id) => {
    try {
      console.log({ id });
      const response = await axios.post(`/bid/deleteBid/${id}`, { _token });
      if (response.status === 204) {
        console.log("bid deleted successfully");
        navigate("/");
      } else {
        throw new Error(response.statusText);
      }
    } catch (e) {
      return e;
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
      <h4>Bid Details</h4>
      <div>
        <p>Bid ID: {bid.bid_id}</p>
        <p>Amount: ${bid.amount}</p>
      </div>
      <div>
        <p>Bid Date: {bidDate}</p>
        {bid.state === "active" ? (
          <p>
            Bid State: <span style={{ color: "green" }}>{bid.state}</span>
          </p>
        ) : (
          <p>
            Bid State: <span style={{ color: "green" }}>{bid.state}</span>
          </p>
        )}
      </div>

      {bid.user_id === user.currentUser.id && (
        // onClick={() => }
        <button
          onClick={() => {
            handleDelete(parseInt(bid_id));
          }}
          style={{
            backgroundColor: "#334155",
            color: "white",
            borderRadius: "0.375rem",
            textTransform: "uppercase",
            padding: "0.25rem",
            cursor: "pointer",
          }}
          onMouseOver={(e) => (e.target.style.opacity = 0.95)}
          onMouseOut={(e) => (e.target.style.opacity = 1)}
        >
          Delete Bid
        </button>
      )}
    </div>
  );
}
