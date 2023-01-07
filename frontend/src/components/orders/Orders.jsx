import React from "react";
import Table from "react-bootstrap/Table";

const Orders = () => {
  return (
    <div className="container">
      <div className="card shadow  mt-4 ">
        <div className="card-title">
          <h2 className="text-center pt-2">Your Orders List</h2>
        </div>
        <div className="card-body px-3">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product Name</th>
                <th>Order Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>12-5-22</td>
                <td>pending</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
