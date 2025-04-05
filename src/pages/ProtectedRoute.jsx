import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";
//to prevent anAuthorized access
function ProtectedRoute({ children }) {
  const { iSAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!iSAuthenticated) navigate("/");
    },
    [iSAuthenticated, navigate]
  );
  return iSAuthenticated ? children : null;
}

export default ProtectedRoute;
