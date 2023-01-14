import React, { useEffect, useState } from "react";
import axios from 'axios'

// react-bootstrap components
import { Card, Table, Container, Row, Col, Form } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; 
import Swal from "sweetalert2";


function CustomersList() {
  const [user, setUser] = useState([])

  const [isloading, setIsloading] = useState(true);

  const token = localStorage.getItem('accessToken');

  const config = {
    headers: {
      token: `Bearer ${token}`,
    },
  };
   useEffect(() => {
     
    axios.get('http://localhost:5001/api/v1/admin/users',config).then((res)=>setUser(res.data.users)).then(()=> setIsloading(false))
     
   }, [isloading])

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
    console.log(id);

    const token = localStorage.getItem("accessToken");
    axios
      // .delete(`http://localhost:5001/api/v1/admin/product/${id}`)

      .delete(`http://localhost:5001/api/v1/admin/user/${id}`, {
        headers: {
          token: `Bearer ${token}`,
        },
      })

      .then((res) => {
        Notification("Deleted", res.data.message, "success");
        setIsloading(true);
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                   { user.map((item) => (
                    <tr>
                      <td>{item._id}</td>
                      <td>{item.name}</td>
                      <td>{String(item.createdAt).substring(0, 10)}</td>
                      <td>{item.role}</td>
                      {/* <button type="button" class="btn btn-default btn-sm">
          <span class="glyphicon glyphicon-pencil"></span> Edit 
        </button> */}
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
      </Container>
    </>
  );
}

export default CustomersList;
