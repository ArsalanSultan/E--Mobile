import React, { useEffect, useState } from "react";

// react-bootstrap components
import { Card, Table, Container, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
// confirmation alert import

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Loader from "./sharedUI/Loader";
// alert notification
import Swal from "sweetalert2";

function AllProducts() {
  const [data, setData] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const history = useHistory();
  const url = "http://localhost:5000/v1/admin/products";
  // useEffect

  useEffect(() => {
    console.log("Data is here");
    axios
      .get(`${url}/list`)
      .then((data) => {
        setData(data.data);
        setIsloading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    if (!isloading) {
      console.log(data);
    }
  }, [isloading]);

  // toast notification
  const Notification = (title, text, icon) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: "OK",
    });
  };

  // handle deletion confirmation
  const handleDeleteAlert = (id) => {
    confirmAlert({
      title: "Delete",
      message: "Are you sure to do this.",
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

  // handle delete
  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete(`${url}/delete/${id}`)
      .then((res) => {
        Notification("Deleted", res.data.message, "success");
        setIsloading(true);
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
                <Card.Title as="h4">List of products</Card.Title>
                {/* <p className="card-category">
                List of all available 
                </p> */}
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Product ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Brand</th>
                      <th className="border-0">Colors</th>
                      <th className="border-0">Price</th>
                      <th className="border-0">Image</th>
                      <th className="border-0">Details</th>
                      <th className="border-0">Stock</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isloading ? (
                      <span className="mx-auto">
                        <Loader />
                      </span>
                    ) : data.products.length == 0 ? (
                      <h2 className="alert alert-danger w-75 mx-auto">
                        No product To show Please Add one
                      </h2>
                    ) : (
                      data.products.map((da) => (
                        <tr key={da._id}>
                          <td>{da.productId}</td>
                          <td>{da.productName}</td>
                          <td>{da.productBrand}</td>
                          <td>{da.productColor}</td>
                          <td>{da.productPrice}</td>
                          <td>
                            {
                              <img
                                src={`${da.productImage}`}
                                alt={`${da.productImage}`}
                              />
                            }
                          </td>
                          <td>{da.productDetails}</td>
                          <td>{da.productStock}</td>
                          <td>
                            <Link to={`product/update/${da._id}`}>
                              <button className="btn btn-primary mx-1 my-s-1">
                                Edit
                              </button>
                            </Link>
                            <button
                              className="btn btn-danger mx-1"
                              onClick={() => handleDeleteAlert(da._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
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

export default AllProducts;
