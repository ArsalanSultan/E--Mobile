import { useEffect } from 'react';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import Header from './components/Layouts/Header'
import Footer from './components/Layouts/Footer'
import Home from './components/Home'
import ProductDetail from './components/product/ProductDetail';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import './App.css';
import { loadUser } from './actions/userActions';
import store from './store'

function App() {
useEffect(()=>{
         store.dispatch(loadUser())
},[])

  return (
    <Router>
    <>
    <Header />
      <Routes> 
      <Route path="/" element={<Home />} exact />
      <Route path="/search/:keyword" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetail />} exact />
      <Route path="/login" element={<Login />} exact />
      <Route path="/register" element={<Register />} exact />
      <Route path ='/me' element={<Profile />} exact/>
    </Routes>
    <Footer />
    </>
    </Router>
  );
}

export default App;
