import React, { useState } from "react";

// react-bootstrap components
import { Card, Table, Container, Row, Col, Form } from "react-bootstrap";

function Orders() {
  //const order status
  const [orderStatus, setOrderStatus] = useState("");
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
                      <th className="border-0">Payment Status</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Ahmed</td>
                      <td>Address Here</td>
                      <td>P123</td>
                      <td>Oppo F15 pro</td>
                      <td>14-12-2022</td>
                      <td>1</td>
                      <td>COD</td>
                      <td>{orderStatus}</td>
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
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Orders;
