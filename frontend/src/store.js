import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { productReducer, productDetailReducer } from './reducers/productReducers';
import { authReducer, forgotPasswordReducer, userReducer } from './reducers/authReducers';

const reducer =  combineReducers({
     products: productReducer,
     productDetail: productDetailReducer,
     auth: authReducer,
     user: userReducer,
     forgotPassword: forgotPasswordReducer
})

let iniitailState = {}

const middleware =[thunk];

const store = createStore(reducer, iniitailState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;