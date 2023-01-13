import axios from "axios";
import React, { useEffect, useState } from "react";

// react-bootstrap components
import { Card, Table, Container, Row, Col, Form } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; 
import Swal from "sweetalert2";
// import notification

import { toast, ToastContainer } from "react-toastify";
function Orders() {
  //const order status
  const [orderStatus, setOrderStatus] = useState("");
  const [allOrders, setAllOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // get all orders

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setIsLoading(true);
    // if (isLoading) {
    //   toast.promise("Getting data");
    // }
    axios
      .get("http://localhost:5001/api/v1/admin/orders/", {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        //const { data } = res;
        setAllOrders(res.data.orders);
        console.log("Orderss", res.data.orders);
      }).then(()=>setIsLoading(false))
      .catch((err) => {
        console.log(err);
      });
  }, [isLoading]);


  const Notification = (title, text, icon) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: "OK",
    });
  };


  
  const handleDeleteAlert = (id) => {
    confirmAlert({
      title: "Delete",
      message: "Are you sure to delete this user.",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDelete(id),
        },
        {
          label: "No",
         onClick: () => history.goBack,
        },
      ],
    });
  };

  const handleDelete = (id) => {
    

    const token = localStorage.getItem("accessToken");
    axios.delete(`http://localhost:5001/api/v1/admin/order/${id}`, {
        headers: {
          token: `Bearer ${token}`,
        },
      })

      .then((res) => {
        Notification("Deleted", res.data.message, "success");
        setIsLoading(true);
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Orders</Card.Title>
                <p className="card-category">All Orders Details </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    
                    <tr>
                      <th className="border-0">Customer ID</th>
                      <th className="border-0">Customer Name</th>
                      <th className="border-0">Customer Address</th>
                      <th className="border-0">Product ID</th>
                      <th className="border-0">Product Name</th>
                      <th className="border-0">Order Date</th>
                      <th className="border-0">Quantity</th>
                      <th className="border-0">Payment Method</th>
                      <th className="border-0">Order Status</th>
                      <th className="border-0">Action</th>
                      <th className="border-0">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                  {allOrders.map((item)=>(
                    <tr key={item._id}>
                      <td>{item.user?._id}</td>
                      <td>{item.user?.name}</td>
                      <td>{item.shippingInfo?.address}</td>
                      <td>{item.orderItems[0]?._id}</td>
                      <td>{item.orderItems[0]?.name}</td>
                      <td>{String(item.createdAt).substring(0, 10)}</td>
                      <td>{item.orderItems[0]?.quantity}</td>
                      <td>COD</td>
                      <td>{item.orderStatus}</td>
                      <td>
                        {" "}
                        <Form.Select
                          className="form-control"
                          onChange={(e) => setOrderStatus(e.target.value)}
                          defaultValue={orderStatus}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Packing">Packing</option>
                          <option value="On the way">On the way</option>
                          <option value="Delivered">Delivered</option>
                        </Form.Select>
                      </td>
                      <button type="button" class="btn btn-default btn-sm" onClick={() => handleDeleteAlert(item._id)}>
          <span class="glyphicon glyphicon-trash"></span> Delete 
        </button>
                    </tr>
                  ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </>
  );
}

export default Orders;
