import React, { useState, useEffect } from "react";
import axios from "axios";
// react-bootstrap components
import { Card, Table, Container, Row, Col, Form } from "react-bootstrap";
// import pagination
import Pagination from "react-paginate";

// pagination css
import "./Payments.css";
import Loader from "./sharedUI/Loader";

function Payments() {
  // payment status state hooks
  const options = ["Pending", "Done"];
  const [isLoading, setIsLoading] = useState(true);
  const [allOrders, setAllOrders] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState(options[0]);

  // pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  // handle page selection
  const handlePageClick = (data) => {
    const selected = data.selected;
    setCurrentPage(selected);
  };
  // pagination start end and currentData
  const start = currentPage * perPage;
  const end = start + perPage;
  const currentData = allOrders.slice(start, end);

  // get all orders

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    axios
      .get("http://localhost:5001/api/v1/admin/orders/", {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        //const { data } = res;
        setAllOrders(res.data.orders);
        console.log(res.data.orders);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [isLoading]);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Payments</Card.Title>
                <p className="card-category">Details about customers payment</p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Customer ID</th>
                      <th className="border-0">Customer Name</th>
                      <th className="border-0">Product Name</th>
                      <th className="border-0">Order Date</th>
                      <th className="border-0">Payment Amount</th>
                      {/* <th className="border-0">Action</th> */}
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
                          <td>{item.orderItems[0]?.name}</td>
                          <td>{String(item.createdAt).substring(0, 10)}</td>

                          <td>{item.orderItems[0]?.price}</td>
                          {/* <td>
                      {" "}
                      <Form.Select
                        onChange={(e) => setPaymentStatus(e.target.value)}
                        defaultValue={paymentStatus}
                        className="form-control"
                      >
                        {options.map((option, idx) => (
                          <option key={idx}>{option}</option>
                        ))}
                      </Form.Select>
                    </td> */}
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
                {!isLoading && currentData.length === 0 && (
                  <div className="alert alert-danger text-center w-50 mx-auto">
                    No Orders to display
                  </div>
                )}
              </Card.Body>
            </Card>
            {currentData.length > 0 && (
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
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Payments;
