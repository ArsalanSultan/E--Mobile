import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { myOrders } from "../../actions/orderActions";
import { clearErrors } from "../../actions/productActions";
import MetaData from "../Layouts/MetaData";
import Loader from '../Layouts/Loader'
import Table from "react-bootstrap/Table";
import { MDBDataTable } from 'mdbreact'



const Orders = () => {

  const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, orders } = useSelector(state => state.myOrders);

    useEffect(() => {
        dispatch(myOrders());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error])

   
    

    return (
        <div>
        <MetaData title={'My Orders'} />

            <h1 className="my-5">My Orders</h1>

             {loading ? <Loader /> : (
        <div className="container">
        <div className="card shadow  mt-4 ">
          <div className="card-title">
            <h2 className="text-center pt-2">Your Orders List</h2>
          </div>
          <div className="card-body px-3">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Product Quntity</th>
                  <th>Total Price</th>
                  <th>Order Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item)=>(
                <tr key={item.product}>
                  <td>{item._id}</td>
                  <td>{item?.orderItems.length}</td>
                  <td>{item.totalPrice}</td>
                  <td>{String(item.createdAt).substring(0, 10)}</td>
                  <td>{item.orderStatus}</td>
                </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
             )}
             </div>
    );



};

export default Orders;
