import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUserData } from "../../redux/user/userSlice";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Perform cleanup operations before navigating
    const logout = () => {
      // Remove the token and the photo
      dispatch(clearUserData());

      // Navigate to the desired route
      navigate("/");
    };

    // Call the logout function
    logout();
  }, [navigate]);

  return null;
}

export default Logout;
