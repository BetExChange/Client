import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import AuthProvider from "./AuthProvider";
import LoginForm from "./LoginForm";
import PrivateRoute from "./PrivateRoute";
import BuyerPage from "./BuyerPage";
import SellerPage from "./SellerPage";
import { NotificationProvider } from "./NotificationContext";
import ProductDetails from "./ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useInitializeUsers from "./useInitializeUsers";

function App() {
  useInitializeUsers();
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NotificationProvider>
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

              <Route element={<PrivateRoute allowedRole="seller" />}>
                <Route path="/product/:id" element={<ProductDetails />} />
              </Route>

              {/* Redirect unhandled routes */}
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </NotificationProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
