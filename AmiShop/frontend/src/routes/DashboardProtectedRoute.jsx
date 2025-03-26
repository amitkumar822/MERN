import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const DashboardProtectedRoute = ({allowedRoles}) => {
  const user = useSelector((state) => state?.user?.user);

  localStorage.getItem("")

  if (!allowedRoles.includes(user?.role)) {
    // Redirect if the user does not have the required role
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // Ren  der login page if not logged in
};

export default DashboardProtectedRoute;
