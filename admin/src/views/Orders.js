import axios from "axios";
import React, { useEffect, useState } from "react";

// react-bootstrap components
import { Card, Table, Container, Row, Col, Form } from "react-bootstrap";

// import pagination
import Pagination from "react-paginate";
// import notification

import { toast, ToastContainer } from "react-toastify";
import "./Order.css";
import Loader from "./sharedUI/Loader";
function Orders() {
  //const order status
  const [orderStatus, setOrderStatus] = useState("");
  const [allOrders, setAllOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  // handle page selection
  const handlePageClick = (data) => {
    const selected = data.selected;
    setCurrentPage(selected);
  };

  const start = currentPage * perPage;
  const end = start + perPage;
  const currentData = allOrders.slice(start, end);

  // get all orders

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setIsLoading(true);
    if (isLoading) {
      toast.promise("Getting data");
    }
    axios
      .get("http://localhost:5001/api/v1/admin/orders/", {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        //const { data } = res;
        setAllOrders(res.data.orders);
        console.log("all orders", res.data.orders);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  // Process update
  useEffect(() => {
    console.log(orderStatus);
  }, [orderStatus]);

  // updateProductStatus

  const updateProductStatus = (id) => {
    console.log("The product id", id, orderStatus);
    const token = localStorage.getItem("accessToken");
    if (token) {
      console.log(token);
      axios
        .put(
          `http://localhost:5001/api/v1/admin/order/${id}`,
          {
            Headers: {
              token: `Bearer ${token}`,
            },
          },
          {
            id,
            orderStatus,
          }
        )
        .then((res) => {
          console.log(res);
          toast.success("Order Status Updated!");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Some error occured while updating order status");
        });
    }
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
                      {/* <th className="border-0">Product ID</th> */}
                      <th className="border-0">Product Name</th>
                      <th className="border-0">Order Date</th>
                      <th className="border-0">Quantity</th>
                      <th className="border-0">Payment Method</th>
                      <th className="border-0">Order Status</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <Loader />
                    ) : (
                      currentData.map((item) => (
                        <tr key={item._id}>
                          <td>{item.user?._id.slice(15, 20)}</td>
                          <td>{item.user?.name}</td>
                          <td>{item.shippingInfo?.address}</td>
                          {/* <td>{item.orderItems[0]?._id.slice(15, 20)}</td> */}
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
                              <option value="Processing">Processing</option>
                              <option value="Packing">Packing</option>
                              <option value="On the way">On the way</option>
                              <option value="Delivered">Delivered</option>
                            </Form.Select>
                            <button
                              className="btn btn-danger"
                              onClick={() => updateProductStatus(item._id)}
                            >
                              Update
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
            <Col md="8" className="text-center mx-auto">
              <Pagination
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={Math.ceil(allOrders.length / perPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination "}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </Col>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </>
  );
}

export default Orders;
