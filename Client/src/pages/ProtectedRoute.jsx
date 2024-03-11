import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    // If not logged in or the user role is not included in allowedRoles, navigate to "/"
    if (!(isLoggedIn && allowedRoles.includes(user?.role))) {
      navigate("/");
    }
  }, [isLoggedIn, user, allowedRoles, navigate]);

  // If user is logged in and has the right role, render the children, otherwise nothing
  // The useEffect will take care of navigation if conditions are not met
  console.log(allowedRoles,user.role)
  return isLoggedIn && allowedRoles.includes(user?.role) ? children : null;
}

export default ProtectedRoute;
