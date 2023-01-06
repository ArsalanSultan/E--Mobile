import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { productReducer, productDetailReducer } from './reducers/productReducers';
import { authReducer, forgotPasswordReducer, userReducer } from './reducers/authReducers';
import { cartReducer } from './reducers/cartReducers';

const reducer =  combineReducers({
     products: productReducer,
     productDetail: productDetailReducer,
     auth: authReducer,
     user: userReducer,
     forgotPassword: forgotPasswordReducer,
     cart: cartReducer
})

let iniitailState = {
     cart:{
          cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
          shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {}
          
     },
    
}

const middleware =[thunk];

const store = createStore(reducer, iniitailState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;