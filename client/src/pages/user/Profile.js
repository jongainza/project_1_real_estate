import React from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div
      style={{
        padding: "3em",
        maxWidth: "90vw",
        margin: "0 auto",
        display: "flex ",
        flexDirection: "column",
        alignItems: "center",
        gap: "1em",
      }}
    >
      <h1 style={{ textAlign: "center", padding: "1em" }}>Profile</h1>
      <img
        src={user.currentUser.photo}
        alt="profile"
        className="rounded-circle"
        style={{
          width: "75px",
          height: "75px",
          borderRadius: "50%" /* Set 50% for a perfect circle */,
          objectFit: "cover" /* Maintain aspect ratio */,
          align: "center",
          marginBottom: "1em",
        }}
      />
      <h3>Name: {user.currentUser.username}</h3>
      <h3>Email: {user.currentUser.email}</h3>
      <Button
        variant="outline-warning"
        size="sm"
        onClick={() => {
          navigate("/update-profile");
        }}
      >
        Update User
      </Button>{" "}
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => {
          navigate("/delete");
        }}
      >
        Delete User
      </Button>{" "}
    </div>
  );
};

export default Profile;
