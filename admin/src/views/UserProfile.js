import React, { useState, useEffect, Children } from "react";
import { useHistory } from "react-router";
import axios from "axios";
// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  Table,
} from "react-bootstrap";

// confirmation alert import

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { cleanData } from "jquery";

function User() {
  // useHistory

  const history = useHistory();
  // Admin profile useState
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [user, setUser] = useState({});
  // console.log(user)

  // banner side useState
  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerImage, setBannerImage] = useState(null);

  // handle Profile submission
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    console.log("User data", name, email);

    const token = localStorage.getItem("accessToken");

    if (token) {
      console.log("user Token", token);
      console.log("id", id, image);
      const config = {
        headers: {
          token: `Bearer ${token}`,
        },
      };

      axios
        .put("http://localhost:5001/api/v1/me/update", config, {
          id,
          name,
          email,
          avatar: image,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // handle product image uploading
  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  // handle banner submission
  const handleBanner = (e) => {
    e.preventDefault();
    if (bannerImage && bannerTitle) {
      console.log(bannerImage, bannerTitle);
    }
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
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      // console.log(token)
      const config = {
        headers: {
          token: `Bearer ${token}`,
        },
      };

      // console.log("config ===", config)
      axios
        .get("http://localhost:5001/api/v1/me", config)
        //.then((res)=>console.log(res.data.user,'user'))
        .then((res) => {
          setUser(res.data.user);
          setName(res.data.user.name);
          setEmail(res.data.user.email);
          setId(res.data.user._id);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(user, "data");
    }
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleProfileUpdate}>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Admin Name</label>
                        <Form.Control
                          // defaultValue="Mike"
                          placeholder="User Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Admin Email</label>
                        <Form.Control
                          // defaultValue="Andrew"
                          placeholder={user?.email}
                          value={email}
                          type="email"
                        ></Form.Control>
                      </Form.Group>
                    </Col>{" "}
                  </Row>{" "}
                  <Row className="p-3">
                    <input
                      type="file"
                      name="avatar"
                      className="form-control"
                      onChange={handleImageChange}
                    />
                  </Row>
                  {/* <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Old Password</label>
                        <Form.Control
                          // defaultValue="Mike"
                          placeholder="Password"
                          type="password"
                          value={oldPassword}
                          required
                          onChange={(e) => setOldPassword(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>New Password</label>
                        <Form.Control
                          // defaultValue="Andrew"
                          placeholder="password"
                          type="password"
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>{" "}
                  </Row> */}
                  <Button
                    className="btn-fill pull-right mt-2"
                    type="submit"
                    variant="primary"
                  >
                    Update Profile
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={user.avatar?.url}
                    ></img>
                    <h5 className="title">{user?.name}</h5>
                  </a>
                  <p className="description">{user?.email}</p>
                </div>
                <p className="description text-center">
                  "Lamborghini Mercy <br></br>
                  Your chick she so thirsty <br></br>
                  I'm in that two seat Lambo"
                </p>
              </Card.Body>
              {/* <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-google-plus-square"></i>
                </Button>
              </div> */}
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Add Banner image</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleBanner}>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Enter Image title</label>
                        <Form.Control
                          placeholder="Sale"
                          type="text"
                          className="form-control"
                          required
                          value={bannerTitle}
                          onChange={(e) => setBannerTitle(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>{" "}
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Select Banner Image</label>
                        <Form.Control
                          placeholder="banner image"
                          type="file"
                          required
                          className="form-control"
                          onChange={(e) => setBannerImage(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="primary"
                  >
                    Save
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            <Container fluid>
              <Row>
                <Col md="12">
                  <Card className="strpied-tabled-with-hover">
                    <Card.Header>
                      <Card.Title as="h4">Banners</Card.Title>
                      {/* <p className="card-category">
                List of all available 
                </p> */}
                    </Card.Header>
                    <Card.Body className="table-full-width table-responsive px-0">
                      <Table className="table-hover table-striped">
                        <thead>
                          <tr>
                            <th className="border-0">ID</th>
                            <th className="border-0">Banner Name</th>
                            <th className="border-0">image</th>
                            <th className="border-0">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Sale</td>
                            <td>
                              <img
                                src="none"
                                className="img img-fluid"
                                alt="banner image"
                              />
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={() => handleDeleteAlert(1)}
                              >
                                delete
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default User;
