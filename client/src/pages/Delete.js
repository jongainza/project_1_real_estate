import React, { useEffect } from "react";
import axios from "../helpers/axios.config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUserData } from "../redux/user/userSlice";

function Delete() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const _token = user._token;
  const id = user.currentUser.id;
  const values = { _token, id };
  const dispatch = useDispatch();

  useEffect(() => {
    async function deleteUser() {
      try {
        const response = await axios.post("/user/delete", values);
        if (response.status === 204) {
          dispatch(clearUserData());

          console.log("User deleted successfully");
          navigate("/");
        } else {
          throw new Error(response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    deleteUser(); // Call the deleteUser function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  // Since the component is now a functional component, you need to return null or JSX
  return null; // or return <></> if you want an empty fragment
}

export default Delete;
