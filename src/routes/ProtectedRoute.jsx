import { Outlet, Navigate } from "react-router-dom";

// wrap around logged-in user only routes to protect them
function ProtectedRoute({ redirectPath = "/pna", children }) {
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(currentUserString);

  if (!currentUser) {
    return <Navigate to={redirectPath} replace />;
  }
  // works for both nested and standalone routes
  return children ? children : <Outlet />;
}
export default ProtectedRoute;
