import React, { Fragment, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Loader from "../Layouts/Loader";
import MetaData from "../Layouts/MetaData";

import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "../../actions/userActions";
import { useAlert } from "react-alert";
import LoginWithGoogle from "./LoginWithGoogle";

// react icons
import { FaUserCheck } from "react-icons/fa";
const Login = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );
  // redirect to shipping page
  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError);
    }
    if (isAuthenticated) {
      alert.success("Logged In");
      navigate(redirect);
    }
  }, [dispatch, alert, error, navigate, isAuthenticated, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Login"} />

          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-3">Login</h1>
                <div className="form-group">
                  <label for="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label for="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Link to="/password/forgot" className="float-right mb-4">
                  Forgot Password?
                </Link>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  LOGIN
                </button>

                <div className="row mt-3">
                  <div className="col-md-6 col-12 ">
                    <span className="card shadow">
                      <Link to="/register" className="text-center p-2 mt-1 ">
                        <FaUserCheck className="mb-1 lead" />
                        <span className="p-2">Sign Up</span>
                      </Link>
                    </span>
                  </div>

                  <div className="col-md-6 col-12 mt-md-0 mt-2 ">
                    <LoginWithGoogle />
                  </div>

                  {/* <div
                    className="col-md-6 col-12 mt-md-0 mt-2 border shadow text-center p-2   mx-md-0"
                    style={{ cursor: "pointer" }}
                    onClick={() => <LoginWithGoogle />}
                  >
                    <img
                      src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                      alt="google icon"
                      className="img-fluid"
                      style={{ width: "35px" }}
                    />
                    <span>Sign In with google</span>
                  </div> */}
                </div>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
