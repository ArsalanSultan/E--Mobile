import React, { Fragment, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Loader from "../Layouts/Loader";
import MetaData from "../Layouts/MetaData";

import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "../../actions/userActions";
import { useAlert } from "react-alert";

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
                <div className="text-center">
                  <span className="display-5">Sign In with Google:</span>

                  <span className="" style={{ cursor: "pointer" }}>
                    <img
                      src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                      className="img-fluid"
                      style={{ width: "40px" }}
                      alt="Google Icon"
                    />
                  </span>
                  <hr className="w-75 border border" />
                </div>
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

                <Link to="/register" className="float-right mt-3">
                  New User?
                </Link>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
