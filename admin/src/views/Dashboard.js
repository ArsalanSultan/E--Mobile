import React, { useEffect, useState } from "react";
import axios from "axios";
import ChartistGraph from "react-chartist";

// react-bootstrap components

import { Card, Container, Row, Col } from "react-bootstrap";

import Orders from "./Orders";

// notification
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./sharedUI/Loader";

function Dashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [lowStock, setLowStock] = useState("");
  const [isloading, setIsloading] = useState(true);

  const accessToken = localStorage.getItem("accessToken");

  // Orders status for chat

  const remaingProducts = totalProducts.length - totalOrders.length;
  console.log(remaingProducts);
  useEffect(() => {
    if (remaingProducts < 0) {
      setLowStock("Out of stock");
    }
  }, [remaingProducts]);
  // getting all products
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/v1/products")
      .then((res) => {
        setTotalProducts(res.data.products);
      })
      .catch((err) => {
        toast.error("Facing an error try again while getting products data!");
      });
  }, []);

  // get all orders

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/v1/admin/orders/", {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setTotalOrders(res.data.orders);
      })
      .catch((err) => {
        toast.error("Facing an error try again while getting orders data!");
      });
  }, []);

  // get all customers /users

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/v1/admin/users", {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        setTotalCustomers(res.data.users);
        setIsloading(false);
      })
      .catch((err) => {
        toast.error("Facing an error try again while getting customer data!");
      });
  }, []);
  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-single-02 text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Customers</p>
                      <Card.Title as="h4">
                        {totalCustomers ? totalCustomers.length : 0}
                      </Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                {/* <hr></hr> */}
                {/* <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
                </div> */}
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-notes text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Orders</p>
                      <Card.Title as="h4">
                        {totalOrders ? totalOrders.length : 0}
                      </Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                {/* <hr></hr> */}
                {/* <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  Last day
                </div> */}
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-app text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Products</p>
                      <Card.Title as="h4">
                        {totalProducts ? totalProducts.length : 0}
                      </Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                {/* <hr></hr> */}
                {/* <div className="stats">
                  <i className="far fa-clock-o mr-1"></i>
                  In the last hour
                </div> */}
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-credit-card text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Revenue</p>
                      <Card.Title as="h4">4554 Rs</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                {/* <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update now
                </div> */}
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          {/* <Col md="8"> */}
          {/* <Card>
              <Card.Header>
                <Card.Title as="h4">Order</Card.Title>
                <p className="card-category">24 Hours performance</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                    data={{
                      labels: [
                        "9:00AM",
                        "12:00AM",
                        "3:00PM",
                        "6:00PM",
                        "9:00PM",
                        "12:00PM",
                        "3:00AM",
                        "6:00AM",
                      ],
                      series: [
                        [287, 385, 490, 492, 554, 586, 698, 695],
                        [67, 152, 143, 240, 287, 335, 435, 437],
                        [23, 113, 67, 108, 190, 239, 307, 308],
                      ],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 800,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid: false,
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        right: 50,
                      },
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Open <i className="fas fa-circle text-danger"></i>
                  Click <i className="fas fa-circle text-warning"></i>
                  Click Second Time
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card> */}
          {/* </Col> */}
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Orders Status</Card.Title>
                <p className="card-category">
                  Completed / Pending / total Orders
                </p>
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <ChartistGraph
                    data={{
                      labels: ["40%", "20%", "40%"],
                      series: [40, 20, 40],
                    }}
                    type="Pie"
                  />
                </div>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Completed <i className="fas fa-circle text-danger"></i>
                  Pending <i className="fas fa-circle text-warning"></i>
                  Total Orders
                </div>
                {/* <hr></hr> */}
                {/* <div className="stats">
                  <i className="far fa-clock"></i>
                  Campaign sent 2 days ago
                </div> */}
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            {isloading ? (
              <Loader />
            ) : (
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Stock Status </Card.Title>
                  <p className="card-category">
                    Totatal Orders / Remaining Stock
                  </p>
                  {lowStock && (
                    <div className="alert alert-danger">{lowStock}</div>
                  )}
                </Card.Header>
                <Card.Body>
                  <div
                    className="ct-chart ct-perfect-fourth"
                    id="chartPreferences"
                  >
                    <ChartistGraph
                      data={{
                        labels: [totalOrders.length, remaingProducts],
                        series: [totalOrders.length, remaingProducts],
                      }}
                      type="Pie"
                    />
                  </div>
                  <div className="legend">
                    <i className="fas fa-circle text-info"></i>
                    Total Orders <i className="fas fa-circle text-danger"></i>
                    Remaining Stock
                  </div>
                  {/* <hr></hr> */}
                  {/* <div className="stats">
                 <i className="far fa-clock"></i>
                 Campaign sent 2 days ago
               </div> */}
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
        <Row>
          {/* <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">2017 Sales</Card.Title>
                <p className="card-category">All products including Taxes</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                  <ChartistGraph
                    data={{
                      labels: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "Mai",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ],
                      series: [
                        [
                          542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756,
                          895,
                        ],
                        [
                          412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636,
                          695,
                        ],
                      ],
                    }}
                    type="Bar"
                    options={{
                      seriesBarDistance: 10,
                      axisX: {
                        showGrid: false,
                      },
                      height: "245px",
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          seriesBarDistance: 5,
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Tesla Model S <i className="fas fa-circle text-danger"></i>
                  BMW 5 Series
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-check"></i>
                  Data information certified
                </div>
              </Card.Footer>
            </Card>
          </Col> */}

          <Col md="12">
            <Orders />
          </Col>
        </Row>
        <ToastContainer autoClose={3000} theme="light" position="top-center" />
      </Container>
    </>
  );
}

export default Dashboard;
