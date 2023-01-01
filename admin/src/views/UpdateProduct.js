import React, { useState, useEffect } from "react";
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

  // loading state
  const [isloading, setIsloading] = useState(true);
  // state hook to store data for the provided product id
  const [data, setData] = useState({});
  // useHistory
  const history = useHistory();
  const params = useParams();

  // API url
  const url = "http://localhost:5000/v1/admin/products";
  // Product Id from the url
  const pid = params.id;

  // toast notification
  const Saved = () => {
    Swal.fire({
      title: "Product Saved",
      text: "Do you want to continue",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  // useEffect hook to get the data from the given id

  useEffect(() => {
    axios
      .get(`${url}/find/${pid}`)
      .then((res) => {
        console.log(res.data);
        const { message, data } = res.data;
        setData(res.data.data);
        console.log(data);
        setIsloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect hook to set the form values like before

  useEffect(() => {
    if (!isloading) {
      setName(data.name);
      setBrand(data.brand);
      setPrice(data.price);
      setStock(data.stock);
      setDescription(data.description);
    }
  }, [isloading]);
  // form submission handling function
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(name, brand, price, description, stock, image);

    Saved();
    setSuccess("Form Submitted Successfully");
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Update Product</Card.Title>
              </Card.Header>
              <Card.Body>
                {isloading === true ? (
                  <>
                    <Loader />
                  </>
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
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
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
                            as="textarea"
                            rows={3}
                            placeholder="Ram 3, Camera: 14MP"
                            type="text"
                            name="productDetails"
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
        </Row>
      </Container>
    </>
  );
}

export default UpdateProduct;
