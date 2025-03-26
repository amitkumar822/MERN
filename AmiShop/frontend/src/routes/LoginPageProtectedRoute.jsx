import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const LoginPageProtectedRoute = () => {
  const user = useSelector((state) => state?.user?.user);

  if (user) {
    // ✅ If logged in, redirect to dashboard (if admin) or home
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />; // Ren  der login page if not logged in
};

export default LoginPageProtectedRoute;
