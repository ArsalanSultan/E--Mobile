import React, { useEffect, useState } from "react";
import axios from 'axios'

// react-bootstrap components
import { Card, Table, Container, Row, Col, Form } from "react-bootstrap";


function CustomersList() {
  const [user, setUser] = useState([])


  const token = localStorage.getItem('accessToken');

  const config = {
    headers: {
      token: `Bearer ${token}`,
    },
  };
   useEffect(() => {
     
    axios.get('http://localhost:5001/api/v1/admin/users',config).then((res)=>setUser(res.data.users))
     
   }, [])
   
   

   //.then((res)=>console.log(res.data.users,'data'))

   //console.log(user,'users')

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Customer</Card.Title>
                <p className="card-category">Details about customers </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Customer ID</th>
                      <th className="border-0">Customer Name</th>
                      <th className="border-0">Sign up date</th>
                      <th className="border-0">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                   { user.map((item) => (
                    <tr>
                      <td>{item._id}</td>
                      <td>{item.name}</td>
                      <td>{String(item.createdAt).substring(0, 10)}</td>
                      <td>{item.role}</td>
                    </tr>
                    ))}
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
