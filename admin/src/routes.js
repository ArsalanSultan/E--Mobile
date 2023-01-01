/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Login from "views/Login.js";
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import AddProduct from "views/AddProduct.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Notifications from "views/Notifications.js";
import AllProducts from "views/AllProducts";
import Payments from "views/Payments";
import Orders from "views/Orders";
import CustomersList from "views/CustomersList";
import UpdateProduct from "views/UpdateProduct";

const dashboardRoutes = [
  {
    path: "/login",
    name: "Login",
    icon: "nc-icon nc-chart-pie-35",
    component: Login,
    showInSideBar: false,
    layout: "/unauth",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    showInSideBar: true,
    layout: "/admin",
  },

  {
    path: "/products",
    name: "All Products",
    icon: "nc-icon nc-app",
    component: AllProducts,
    showInSideBar: true,
    layout: "/admin",
    exact: true,
  },
  // {
  //   path: "/table",
  //   name: "List",
  //   icon: "nc-icon nc-notes",
  //   component: TableList,
  //   showInSideBar: true,
  //   layout: "/admin",
  // },
  {
    path: "/add/product",
    name: "Add Product",
    icon: "nc-icon nc-simple-add",
    component: AddProduct,
    showInSideBar: true,
    layout: "/admin",
  },
  {
    path: "/product/update/:id",
    name: "Update Product",
    icon: "nc-icon nc-simple-add",
    component: UpdateProduct,
    showInSideBar: false,
    layout: "/admin",
  },
  {
    path: "/Payments",
    name: "Payments",
    icon: "nc-icon nc-credit-card",
    component: Payments,
    showInSideBar: true,
    layout: "/admin",
  },
  {
    path: "/Orders",
    name: "Orders",
    icon: "nc-icon nc-notes",
    component: Orders,
    showInSideBar: true,
    layout: "/admin",
  },
  {
    path: "/CustomersList",
    name: "Customers List",
    icon: "nc-icon nc-single-02",
    component: CustomersList,
    showInSideBar: true,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "Profile Setting",
    icon: "nc-icon nc-settings-gear-64",
    component: UserProfile,
    showInSideBar: true,
    layout: "/admin",
  },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-paper-2",
  //   component: Typography,
  //   showInSideBar: true,
  //   layout: "/admin",
  // },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-atom",
    component: Icons,
    showInSideBar: true,
    layout: "/admin",
  },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   showInSideBar: true,
  //   component: Notifications,
  //   layout: "/admin",
  // },
];

export default dashboardRoutes;
