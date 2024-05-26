import React, { useState } from "react";
import axios from "../../helpers/axios.config";
import CurrencyInput from "react-currency-input-field";
import { notification } from "antd"; // Import notification from Ant Design
import { useSelector } from "react-redux";

export default function Bid({ id }) {
  const [amount, setAmount] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const { currentUser, _token } = useSelector((state) => state.user);

  const handleOfferSubmit = async () => {
    try {
      console.log({ amount, user_id: currentUser.id });
      const res = await axios.post(`/bid/create/${id}`, {
        _token,
        amount,
        user_id: currentUser.id,
      });
      console.log({ res });
      if (res.status === 201) {
        notification.success({ message: "Offer Sent" });
        setConfirm(false);
      } else {
        notification.error({ message: "Failed to send the offer" });
      }
    } catch (e) {
      console.error(e);
      notification.error({
        message: "An error occurred while submitting the offer",
      });
    }
  };

  return (
    <div>
      <form
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
        }}
      >
        {!confirm && (
          <CurrencyInput
            placeholder="Offer Amount"
            prefix="$"
            decimalsLimit={2}
            onChange={(e) => {
              const cleanedValue = e.target.value.replace(/,/g, "");
              const numericValue = parseFloat(
                cleanedValue.replace(/[^0-9.-]+/g, "")
              );
              if (!confirm) {
                if (!isNaN(numericValue)) {
                  setAmount(numericValue);
                } else {
                  setAmount(0); // Default to 0 if the input is not a valid number
                }
              }
            }}
            style={{
              display: "flex",
              border: "solid",
              padding: 3,
              borderRadius: 8,
            }}
            required
          />
        )}
        {amount > 0 && !confirm && (
          <div>
            <button
              type="button"
              onClick={() => setConfirm(true)}
              style={{
                backgroundColor: "rgba(255, 99, 71, 0.2)",
                color: "blue",
                borderRadius: "0.375rem",
                textTransform: "uppercase",
                padding: "0.25rem",
                cursor: "pointer",
              }}
              onMouseOver={(e) => (e.target.style.opacity = 0.95)}
              onMouseOut={(e) => (e.target.style.opacity = 1)}
            >
              Submit your offer for $ {amount}
            </button>
          </div>
        )}
        {confirm && (
          <div>
            <button
              type="button"
              onClick={handleOfferSubmit}
              style={{
                backgroundColor: "rgba(255, 99, 71)",
                color: "blue",
                borderRadius: "0.375rem",
                textTransform: "uppercase",
                padding: "0.25rem",
                cursor: "pointer",
              }}
              onMouseOver={(e) => (e.target.style.opacity = 0.95)}
              onMouseOut={(e) => (e.target.style.opacity = 1)}
            >
              Confirm your offer for <b>${amount}</b>
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
