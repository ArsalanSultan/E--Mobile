import { Fragment, useEffect,useState } from "react";
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
import Orders from "./components/orders/Orders";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import LoginWithGoogle from "./components/user/LoginWithGoogle";
import Payment from "./components/cart/Payment";
import axios from 'axios'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js'
function App() {

   const [stripeApiKey,setStripeApiKey] = useState('')
   //console.log(stripeApiKey)

  useEffect(() => {
    store.dispatch(loadUser());
    
    async function getStripeApiKey(){
      const { data } = await axios.get('/api/v1/stripeapi')
      setStripeApiKey(data.stripeApiKey )
    }
    getStripeApiKey()
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

          {/* orders */}
          <Route path="/orders/me" element={<Orders />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} exact />
          
          {stripeApiKey && 
         
              
              <Route path="/payment" element={ 
              <Elements stripe={loadStripe(stripeApiKey)}>
              <Payment />
            </Elements>
            } exact />
             
    

          }
            
          <Route path="/google" element={<LoginWithGoogle />} />
        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;
