import React, { useState } from "react";

// react-bootstrap components
import { Card, Table, Container, Row, Col, Form } from "react-bootstrap";

function Payments() {
  // payment status state hooks
  const options = ["Pending", "Done"];
  const [paymentStatus, setPaymentStatus] = useState(options[0]);

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
                      <th className="border-0">Payment Status</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Ahmed</td>
                      <td>Oppo F15 pro</td>
                      <td>14-12-2022</td>
                      <td>{paymentStatus}</td>
                      <td>
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

export default Payments;
