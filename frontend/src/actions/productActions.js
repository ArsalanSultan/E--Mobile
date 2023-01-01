import {ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS,ALL_PRODUCT_FAIL,PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,PRODUCT_DETAIL_FAIL,CLEAR_ERRORS} from '../constants/productConstant'
import axios from 'axios';
                        //
export const getProducts=(keyword='',currentPage = 1,price,brand)=>async(dispatch)=>{
    try {       
        dispatch({type: ALL_PRODUCT_REQUEST}) 
              let link= `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`
             if(brand){
                link= `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&brand=${brand}`
             }  
        const { data }=await axios.get(link);
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getProductDetail=(id)=>async(dispatch)=>{
    try {
        dispatch({type: PRODUCT_DETAIL_REQUEST })
        const { data }=await axios.get(`/api/v1/product/${id}`);
        dispatch({
            type: PRODUCT_DETAIL_SUCCESS,
            payload:data.product
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}


// clear errors
export const clearErrors =async (dispatch)=>{
    dispatch({
        type: CLEAR_ERRORS
    })
}