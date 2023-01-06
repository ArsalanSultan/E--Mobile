import axios from "axios";
import React, { useState, useEffect } from "react";
// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";

// toaster alert
import { ToastContainer, toast } from "react-toastify";

// cloudinary import
//import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import Swal from "sweetalert2";

function AddProduct() {
  // useState hook for form data management
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);

  // api url
  const url = "http://localhost:5001/api/v1/admin/product";

  // setting tokken
  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");
  //   axios
  //     .get("http://localhost:5001/api/v1/me", {
  //       headers: {
  //         token:
  //           `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       const { accessToken } = res.data;
  //       localStorage.setItem("accessToken", accessToken);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

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
    console.log(name, brand, price, stock, image, description);
    // getting token
    const token = localStorage.getItem("accessToken");
    axios
      .post(
        `${url}/new`,
        {
          name,
          brand,
          price,
          stock,
          image,
          seller: "EAhmed",
          description,
        },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        Saved();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // handle product image uploading
  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(e.target.files[0]);
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
                        <label>Product Name</label>
                        <Form.Control
                          placeholder="Samsung A55s"
                          type="text"
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
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
                          name="brand"
                          value={brand}
                          onChange={(e) => setBrand(e.target.value)}
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
                          name="price"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
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
                          name="stock"
                          value={stock}
                          onChange={(e) => setStock(e.target.value)}
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
                          name="image"
                          placeholder="Please select product image"
                          // value={image}
                          onChange={handleImageChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="12">
                      <Form.Group>
                        <label>Details</label>
                        <Form.Control
                          placeholder="Link Here"
                          type="text"
                          name="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
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

export default AddProduct