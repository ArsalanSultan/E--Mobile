import React from "react";

// react-bootstrap components
import { Card, Table, Container, Row, Col, Form } from "react-bootstrap";

function CustomersList() {
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
                      <th className="border-0">Sign up date</th>
                      <th className="border-0">Total Orders</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Ahmed</td>
                      <td>14-12-2022</td>
                      <td>43</td>
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

export default CustomersList;
