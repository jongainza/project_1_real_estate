import React from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div>
      <h1>Profile</h1>
      <img
        src={user.currentUser.photo}
        alt="profile"
        className="rounded-circle"
        style={{
          height: "4rem",
          width: "4rem",
          objectFit: "cover",
          border: "3px solid black",
        }}
      />
      <h3>Name: {user.currentUser.username}</h3>
      <h3>Email: {user.currentUser.email}</h3>
      <Button variant="outline-warning" size="sm">
        Edit User
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
