import React, { useState, useEffect } from "react";
import "../Login/Login.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BgLogin from "../../Assets/BgLogin.jpg";
import password from "../../Assets/password.svg";
import emailIcon from "../../Assets/email.svg";
import { NavLink, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { setIsLoggin } from "../Login/ReducerLogin";

const Login = () => {
  // const { isLoggin } = useSelector((state) => state.login);
  const isLog = localStorage.getItem("isLoggin");
  const isLoggin = JSON.parse(isLog);

  // const { registerData } = useSelector((state) => state.register);
  let registrationData = localStorage.getItem("registerData");
  let registerData = JSON.parse(registrationData);
  // const dispatch = useDispatch();

  const [email, setemail] = useState("");
  const [emailErr, setemailErr] = useState("");
  const [pass, setpass] = useState("");
  const [passErr, setpassErr] = useState("");
  const [loginErr, setloginErr] = useState("");

  const onChangeEmail = (e) => {
    const pattern = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    setemail(e.target.value);
    if (pattern.test(e.target.value)) {
      setemailErr("");
    } else if (e.target.value === "") {
      setemailErr("Please enter email");
    } else {
      setemailErr("Sorry email is not valid.");
    }
  };
  const onchangePass = (e) => {
    if (e.target.value === "") {
      setpassErr("Please enter password");
      setpass("");
    } else {
      setpass(e.target.value);
      setpassErr("");
    }
  };

  const onClickSignIn = (e) => {
    e.preventDefault();

    if (email === "") {
      return setemailErr("Please enter email");
    }
    if (pass === "") {
      return setpassErr("Please enter password");
    }

    const indx = registerData.findIndex((item) => item.email === email);
    if (indx < 0) {
      if (email !== "" && pass !== "") {
        setloginErr("Your email is not registered");
      } else {
        setloginErr("");
      }
    } else {
      if (
        email === registerData[indx].email &&
        pass === registerData[indx].password
      ) {
        localStorage.setItem("isLoggin", JSON.stringify(true));
        localStorage.setItem('UserId', JSON.stringify(registerData[indx].id))
        // dispatch(setIsLoggin(true));

        setemail("");
        setpass("");
        setloginErr("");
      } else {
        setloginErr("Your email and password are not correct");
      }
    }
  };

  return (
    <>
      {isLoggin ? (
        <Navigate to={"/"} />
      ) : (
        <div
          className="main-login"
          style={{ backgroundImage: `url(${BgLogin})`, minHeight: "100vh" }}
        >
          <div className="head-reg text-white d-flex justify-content-between px-md-5 px-4 py-3">
            <div className="logo">
              <NavLink
                to="/"
                className="logoImg fs-2 text-red fw-bolder my-custom-a"
              >
                AlmaBetter
              </NavLink>
            </div>
            <div className="head-login-btn">
              <div>
                <NavLink
                  to="/registration"
                  className="btn btn-danger my-bg-red px-md-4 mt-md-2"
                >
                  Sign Up
                </NavLink>
              </div>
            </div>
          </div>

          <div className="form pt-2">
            <Container
              className="d-flex justify-content-center align-items-center "
              fluid
            >
              <Row className="my-bg-light text-white p-4">
                <Col xs={12}>
                  <div className="head fs-3 text-center py-3">Sign In</div>
                  <form
                    className="form px-2"
                    onSubmit={onClickSignIn}
                    autoComplete="off"
                  >
                    <div className="email  pt-1">
                      <input
                        type="text"
                        className="my-input text-white fw-light ps-5 w-100"
                        placeholder="Email"
                        onChange={onChangeEmail}
                        value={email}
                        autoFocus
                      />
                      <div className="emailIcon">
                        <img src={emailIcon} alt="" height="20" width="20" />
                      </div>
                    </div>
                    <div className="errBox text-red">{emailErr}</div>
                    <div className="password ">
                      <input
                        type="password"
                        className="my-input text-white fw-light ps-5 w-100"
                        placeholder="Password"
                        onChange={onchangePass}
                        value={pass}
                      />
                      <div className="passIcon">
                        <img src={password} alt="" height="22" width="22" />
                      </div>
                    </div>
                    <div className="errBox mb-2 text-red">{passErr}</div>

                    <div className="rem-pass d-flex justify-content-between">
                      <div className="rem-pass d-flex">
                        <div className="rem-check">
                          <input type="checkbox" />
                        </div>
                        <div className="rem-check-lable ps-2 fw-light my-fs-sm d-flex align-items-center">
                          Remember me!
                        </div>
                      </div>
                      <div className="forgot-pass">
                        <a href="/" className="my-a-decoration fw-light">
                          Forgot Password
                        </a>
                      </div>
                    </div>
                    <div className="sign-in-btn pt-2 ">
                      <input
                        type="submit"
                        className="btn btn-danger my-bg-red rounded-0 w-100"
                        value="Sign In"
                      />
                    </div>
                    <div className="errBox text-red pt-2 text-center">
                      {loginErr}
                    </div>
                  </form>
                  <div className="forgot-pass text-center py-1">
                    <div className="fw-light my-sp-decoration">
                      Need an account ?
                      <NavLink
                        to="/registration"
                        className="my-a-decoration fw-light"
                      >
                        {" "}
                        Sign Up
                      </NavLink>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
