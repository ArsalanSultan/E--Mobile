import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";

// reuseable notification component
import Swal from "sweetalert2";
import axios from "axios";
import Loader from "./sharedUI/Loader";

function UpdateProduct() {
  // useState hook for form data management
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");

  const [error, setError] = useState("");

  // loading state
  const [isloading, setIsloading] = useState(false);
  // state hook to store data for the provided product id
  const [data, setData] = useState([]);
  // useHistory
  const history = useHistory();
  const params = useParams();
  // Product Id from the url
  const pid = params.id;

  // API url
  const url = "http://localhost:5001/api/v1/admin/product";

  const SetFormData = () => {
    setName(data.product.name);
    setBrand(data.product.brand);
    setPrice(data.product.price);
    setStock(data.product.stock);
    setDescription(data.product.description);
    setError("");
  };
  // getting user data and setting it in the form on load
  useEffect(() => {
    setIsloading(true);
    axios
      .get(`http://localhost:5001/api/v1/product/${pid}`)
      .then((res) => {
        setError("");
        setData(res.data);
        console.log(res.data);
        SetFormData();
        setIsloading(false);
      })
      .catch((err) => {
        setError(
          "Some Erorr occered while auto filling the form, Please fill the form by clicking here" ||
            err
        );
        setIsloading(false);
      });
  }, []);

  // toast notification
  const Updated = () => {
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
      .put(
        `${url}/${pid}`,
        {
          name,
          brand,
          price,
          stock,
          image,
          seller: "EMobile",
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
        Updated();
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
          {isloading ? (
            <Loader />
          ) : (
            <Col md="12">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Update Product</Card.Title>
                  {error && (
                    <span className="alert alert-danger">
                      {error}
                      <span
                        onClick={SetFormData}
                        style={{ cursor: "pointer", color: "blue" }}
                      >
                        {" "}
                        Refresh
                      </span>{" "}
                    </span>
                  )}
                </Card.Header>
                <Card.Body>
                  {isloading ? (
                    <Loader />
                  ) : (
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
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="12">
                          <Form.Group>
                            <label>Description</label>
                            <Form.Control
                              placeholder="Ram 3, Camera: 14MP"
                              type="text"
                              name="Link Here"
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
                        Update Product
                      </Button>
                      <button
                        className="btn btn-light mt-2 mx-2"
                        onClick={history.goBack}
                        type="button"
                      >
                        Back
                      </button>
                      <div className="clearfix"></div>
                    </Form>
                  )}
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
}

export default UpdateProduct;
