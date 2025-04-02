import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PrivateRoute = () => {
  const { userRole } = useAuth();

  
  if (!userRole) {
    return <Navigate to="/login" />;
  }

  
  return <Outlet />;
};

export default PrivateRoute;
