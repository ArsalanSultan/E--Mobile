// google auth imports
// import { GoogleAuth, GoogleAuthProvider } from "google-auth-library";
// import { OAuth2Client } from "google-auth-library/build/src/auth/oauth2client";

// google login
import React, { useState, useEffect } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";

import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
} from "../../constants/userConstant";

const LoginWithGoogle = () => {
  // google auth
  const [profile, setProfile] = useState([]);
  const clientId =
    "53895581859-q4ldb93olkev0roao3ltsp5m6dedsu8d.apps.googleusercontent.com";
  const clientSecret = "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";
  const redirectUri = "http://localhost:3001/auth/google/callback";

  // user Register

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  // dispatch

  // useEffect(() => {
  //   const initClient = () => {
  //     gapi.client.init({
  //       clientId: clientId,
  //       scope: "",
  //     });
  //   };
  //   gapi.load("client:auth2", initClient);
  // });

  useEffect(() => {
    console.log("UseEffect", name, email, password);
  }, [name, email, password]);
  const onSuccess = async (res) => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
    console.log("success:", res.profileObj);

    // dispatch(
    //   register({
    //     name,
    //     email,
    //     password,
    //     avatar: {
    //       public_id: "sef",
    //       url: "sdf",
    //     },
    //   })
    // );

    // testing register section start

    // register user

    // const register = (name, email, password) => async (dispatch) => {
    //   try {
    //     dispatch({ type: REGISTER_USER_REQUEST });
    //     const config = {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     };

    //     const { data } = await axios.post(
    //       "api/v1/register/google/",
    //       { name, email, password },
    //       config
    //     );

    //     const { accessToken } = data;
    //     // console.log(accessToken)

    //     localStorage.setItem("accessToken", accessToken);
    //     //localStorage.setItem('user',JSON.stringify(user))

    //     dispatch({
    //       type: REGISTER_USER_SUCCESS,
    //       payload: data, //.user
    //     });
    //   } catch (error) {
    //     dispatch({
    //       type: REGISTER_USER_FAIL,
    //       payload: error.response.data.message,
    //     });
    //   }
    // };
    // dispatch(register(name, email, password));
    // testing register section end

    setProfile(res.profileObj);
    setName(res.profileObj.name);
    setEmail(res.profileObj.email);
    setPassword(res.profileObj.googleId);
    setAvatar(res.profileObj.imageUrl);
    console.log("Profile", profile);
    console.log("Profile data", name, email, password, avatar);
    await axios
      .post("http://localhost:5001/api/v1/register/google", {
        name,
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          alert.success("Logged In");
          localStorage.setItem("accessToken", res.data.accessToken);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        alert.error("Some error occured please sign up instead");
        // navigate("/register");
      });
  };

  const onFailure = (err) => {
    console.log("failed:", err);
  };
  const logOut = () => {
    setProfile(null);
  };
  return (
    <>
      {/* <div>
        <h2>React Google Login</h2>
        <br />
        <br />
        {profile ? (
          <div>
            <img src={profile.imageUrl} alt="user image" />
            <h3>User Logged in</h3>
            <p>Name: {profile.name}</p>
            <p>Email Address: {profile.email}</p>
            <br />
            <br />
            <GoogleLogout
              clientId={clientId}
              buttonText="Log out"
              onLogoutSuccess={logOut}
            />
          </div>
        ) : (
          <GoogleLogin
            clientId={clientId}
            buttonText="Sign in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            // cookiePolicy={"single_host_origin"}
            isSignedIn={false}
            className=" w-100 shadow"
          />
        )}
      </div> */}
      <GoogleLogin
        clientId={clientId}
        buttonText="Sign in with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={false}
        className=" w-100 shadow"
      />
    </>
  );
};

export default LoginWithGoogle;
