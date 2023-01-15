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

// import pagination
import Pagination from "react-paginate";

// pagination css

import "./AllProducts.css";

function AllProducts() {
  const [data, setData] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const history = useHistory();

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
  const currentData = allProducts.slice(start, end);

  // getting all products
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/v1/products")
      .then((data) => {
        // console.log(data.data.products);
        setData(data.data);
        setAllProducts(data.data.products);

        setIsloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
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

    const token = localStorage.getItem("accessToken");
    axios
      .delete(`http://localhost:5001/api/v1/admin/product/${id}`, {
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
                      {/* <th className="border-0">Colors</th> */}
                      <th className="border-0">Price</th>
                      {/* <th className="border-0">Image</th> */}
                      <th className="border-0">Details</th>
                      <th className="border-0">Stock</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isloading ? (
                      <Loader />
                    ) : allProducts.length == 0 ? (
                      <h2 className="alert alert-danger w-75 mx-auto">
                        No product To show Please Add one
                      </h2>
                    ) : (
                      currentData.map((da) => (
                        <tr key={da._id}>
                          <td>{da._id}</td>
                          <td>{da.name}</td>
                          <td>{da.brand}</td>
                          {/* <td>{da.productColor}</td> */}
                          <td>{da.price}</td>
                          <td>{da.description}</td>
                          <td>{da.stock}</td>
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
            <Col md="8" className="text-center mx-auto">
              <Pagination
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={Math.ceil(allProducts.length / perPage)}
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
      </Container>
    </>
  );
}

export default AllProducts;
