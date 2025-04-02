import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PrivateRoute = ({ allowedRole }: { allowedRole: "buyer" | "seller" }) => {
  const { userRole } = useAuth();
  const location = useLocation();

  if (!userRole) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (userRole !== allowedRole) {
    return <Navigate to={`/${userRole}`} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
