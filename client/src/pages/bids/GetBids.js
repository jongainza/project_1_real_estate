import React, { useEffect, useState } from "react";
import axios from "../../helpers/axios.config";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function GetBids({ property_id }) {
  const { currentUser, _token } = useSelector((state) => state.user);
  const [bids, setBids] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await axios.get(`/bid/get/${property_id}`, {
          headers: {
            Authorization: `Bearer ${_token}`,
          },
        });
        console.log({ response });
        const bidsData = response.data.data?.bid;
        console.log({ bidsData });
        if (bidsData) {
          setBids(bidsData);
          console.log({ bids });
        }
      } catch (e) {
        setError(e.message);
      }
    };

    fetchBids();
  }, [property_id, _token]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h4>Bids for Property ID: {property_id}</h4>
      {bids.length > 0 ? (
        <ul>
          {bids.map((bid) => (
            <li key={bid.bid_id}>
              <Link to={`/bid/${bid.bid_id}`}>Bid Amount: ${bid.amount}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bids available yet.</p>
      )}
    </div>
  );
}
