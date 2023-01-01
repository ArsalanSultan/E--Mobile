import axios from "axios";
import React, { useState } from "react";
// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";

// toaster alert
import { ToastContainer, toast } from "react-toastify";

import Swal from "sweetalert2";
import { AlertNotify } from "./sharedUI/AlertNotify";

function AddProduct() {
  // useState hook for form data management
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productColor, setProductColor] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [productImage, setProductImage] = useState("");

  // api url
  const url = "http://localhost:5000/v1/admin/products";

  // toast notification
  const Saved = () => {
    Swal.fire({
      title: "Product Saved",
      text: "Do you want to continue",
      icon: "success",
      confirmButtonText: "OK",
    });
  };
  // form submission handling function

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${url}/new`, {
        productId,
        productName,
        productBrand,
        productColor,
        productPrice,
        productStock,
        productImage,
        productDetails,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(
    //   productId,
    //   productName,
    //   brandName,
    //   productColor,
    //   productPrice,
    //   productStock,
    //   productImage,
    //   productDetails
    // );
    Saved();
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Add New Product</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Product ID</label>
                        <Form.Control
                          placeholder="12"
                          type="text"
                          name="productId"
                          value={productId}
                          onChange={(e) => setProductId(e.target.value)}
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>{" "}
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Product Name</label>
                        <Form.Control
                          placeholder="Samsung A55s"
                          type="text"
                          name="productName"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Brand Name</label>
                        <Form.Control
                          placeholder="Samsung"
                          type="text"
                          name="brandName"
                          value={productBrand}
                          onChange={(e) => setProductBrand(e.target.value)}
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Colors</label>
                        <Form.Control
                          placeholder="Red Golden Black"
                          type="text"
                          name="productColor"
                          value={productColor}
                          onChange={(e) => setProductColor(e.target.value)}
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Price</label>
                        <Form.Control
                          placeholder="45000"
                          type="Number"
                          name="productPrice"
                          value={productPrice}
                          onChange={(e) => setProductPrice(e.target.value)}
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>{" "}
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Available Stock</label>
                        <Form.Control
                          placeholder="450"
                          type="Number"
                          name="productStock"
                          value={productStock}
                          onChange={(e) => setProductStock(e.target.value)}
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="12">
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Select Product Image</Form.Label>
                        <Form.Control
                          type="file"
                          className="form-control"
                          name="productImage"
                          placeholder="Please select product image"
                          value={productImage}
                          onChange={(e) => setProductImage(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="12">
                      <Form.Group>
                        <label>Details</label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Ram 3, Camera: 14MP"
                          type="text"
                          name="productDetails"
                          value={productDetails}
                          onChange={(e) => setProductDetails(e.target.value)}
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right mt-2"
                    type="submit"
                    variant="primary"
                    // onClick={handleSubmit}
                  >
                    Add Product
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
}

export default AddProduct;
