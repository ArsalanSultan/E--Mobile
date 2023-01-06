import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Layouts/Header";
import Footer from "./components/Layouts/Footer";
import Home from "./components/Home";
import ProductDetail from "./components/product/ProductDetail";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";

import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import "./App.css";
import { loadUser } from "./actions/userActions";
import store from "./store";
import ProtectedRoutes from "./protectRoutes/UserProtectedRoute";
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/search/:keyword" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} exact />
          <Route path="/cart" element={<Cart />} exact />

          <Route path="/login" element={<Login />} exact />
          <Route path="/register" element={<Register />} exact />

          <Route path="/password/forgot" element={<ForgotPassword />} exact />
          <Route
            path="/password/reset/:token"
            element={<NewPassword />}
            exact
          />

          {/* protected routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/me" element={<Profile />} exact />
            <Route path="/me/update" element={<UpdateProfile />} exact />
            <Route path="/login/shipping" element={<Shipping />} exact />
            <Route path="/password/update" element={<UpdatePassword />} exact />
          </Route>
        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;
