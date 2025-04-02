import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import AuthProvider from "./AuthProvider";
import useInitializeLocalStorage from "./useInitializeLocalStorage";
import LoginForm from "./LoginForm";
import PrivateRoute from "./PrivateRoute";
import BuyerPage from "./BuyerPage";
import SellerPage from "./SellerPage";

function App() {
  useInitializeLocalStorage();

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginForm />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute allowedRole="buyer" />}>
            <Route path="/buyer" element={<BuyerPage />} />
          </Route>

          <Route element={<PrivateRoute allowedRole="seller" />}>
            <Route path="/seller" element={<SellerPage />} />
          </Route>

          {/* Redirect unhandled routes */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
