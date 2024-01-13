import React, { useState, useEffect } from "react";
import "../Registration/Registration.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BgLogin from "../../Assets/BgLogin.jpg";
import password from "../../Assets/password.svg";
import emailIcon from "../../Assets/email.svg";
import user from "../../Assets/user.svg";
import { NavLink, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addRegisterData } from "../Registration/ReducerRegistration";

const Registration = () => {
  const { registerData } = useSelector((state) => state.register);

  

  // const { isLoggin } = useSelector((state) => state.login);
  const isLog = localStorage.getItem('isLoggin');
  const isLoggin = JSON.parse(isLog);

  const dispatch = useDispatch();

  const [name, setname] = useState("");
  const [nameErr, setnameErr] = useState();
  const [email, setemail] = useState("");
  const [emailErr, setemailErr] = useState();
  const [pass, setpass] = useState("");
  const [passErr, setpassErr] = useState();
  const [confirmpass, setconfirmpass] = useState("");
  const [confirmpassErr, setconfirmpassErr] = useState();
  const [userArr, setuserArr] = useState([]); 
  const [isExist, setisExist] = useState();
  const [goLogin, setgoLogin] = useState(false);


  useEffect(() => {
    let getLocalRegData = localStorage.getItem("registerData");
    let getRegData = JSON.parse(getLocalRegData);
    if(getRegData===null){
      localStorage.setItem("registerData", JSON.stringify(userArr));
    }
    else{
      setuserArr(getRegData);
    }
  }, [])

  const onChangeName = (e) => {
    const pattern = /^[a-zA-z]{2,10}$/;
    setname(e.target.value);
    if (pattern.test(e.target.value)) {
      setnameErr("");
    } else if (e.target.value === "") {
      setnameErr("Please enter name");
    } else {
      setnameErr("Sorry name is not valid.");
    }
  };

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
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    setpass(e.target.value);
    if (pattern.test(e.target.value)) {
      setpassErr("");
    } else if (e.target.value === "") {
      setpassErr("Please enter password");
    } else {
      setpassErr("Please enter strong password");
    }
  };

  const onchangeConfirmPass = (e) => {
    setconfirmpass(e.target.value);
    if (e.target.value === pass) {
      setconfirmpassErr("");
    } else if (e.target.value === "") {
      setconfirmpassErr("Please enter confirm password");
    } else {
      setconfirmpassErr("Confirm password & password are not same");
    }
  };

  function userExists(email) {
    return userArr.some(function (el) {
      return el.email === email;
    });
  }

  const onclickSignUp = (e) => {
    e.preventDefault();
    if (name === "") {
      return setnameErr("Please enter name");
    }
    if (email === "") {
      return setemailErr("Please enter email");
    }
    if (pass === "") {
      return setpassErr("Please enter password");
    }
    if (confirmpass === "") {
      return setconfirmpassErr("Please enter confirm password");
    }

    let registerData = {

      id:  userArr.length + 1,
      name: name,
      email: email,
      password: pass,
      confirmPassword: confirmpass,
    };

    if (
      nameErr === "" &&
      emailErr === "" &&
      passErr === "" &&
      confirmpassErr === ""
    ) {
      if (userExists(email)) {
        setisExist("Email is already existing");
      } else {

        let temp = [...userArr];
        temp.push(registerData);
        setuserArr(temp);

        // console.log("userArr", userArr);

        setgoLogin(true);
        setisExist("");
        setname("");
        setemail("");
        setpass("");
        setconfirmpass("");
      }
    }
  };

  useEffect(() => {
    // dispatch(addRegisterData(userArr));

    localStorage.setItem("registerData", JSON.stringify(userArr));


  }, [userArr]);

  return (
    <>
      {isLoggin ? (
        <Navigate to={"/"} />
      ) : goLogin ? (
        <Navigate to={"/login"} />
      ) : (
        <div
          className="main-login"
          style={{ backgroundImage: `url(${BgLogin})`, minHeight: "100vh" }}
        >
          <div className="head-reg text-white d-flex justify-content-between px-md-5 px-4 py-3">
            <div className="logo">
              <NavLink to='/' className="logoImg fs-2 text-red fw-bolder my-custom-a">AlmaBetter</NavLink>
            </div>
            <div className="head-login-btn">
              <div>
                <NavLink
                  to="/login"
                  className="btn btn-danger my-bg-red px-md-4 mt-md-2"
                >
                  Sign In
                </NavLink>
              </div>
            </div>
          </div>
          <div className="form  pt-2">
            <Container
              className="d-flex justify-content-center align-items-center"
              fluid
            >
              <Row className="my-bg-light text-white p-4">
                <Col xs={12}>
                  <div className="head fs-3 text-center py-3">Sign Up</div>
                  <form
                    className="form  px-2"
                    onSubmit={onclickSignUp}
                    autoComplete="off"
                  >
                    <div className="email  pt-1">
                      <input
                        type="text"
                        className="my-input text-white fw-light ps-5 w-100"
                        placeholder="Name"
                        name="Name"
                        onChange={onChangeName}
                        value={name}
                        autoFocus
                      />
                      <div className="emailIcon">
                        <img src={user} alt="" height="20" width="20" />
                      </div>
                    </div>
                    <div className="errBox text-red">{nameErr}</div>

                    <div className="email">
                      <input
                        type="text"
                        className="my-input text-white fw-light ps-5 w-100"
                        placeholder="Email"
                        name="Email"
                        onChange={onChangeEmail}
                        value={email}
                      />
                      <div className="emailIcon">
                        <img src={emailIcon} alt="" height="20" width="20" />
                      </div>
                    </div>
                    <div className="errBox text-red">{emailErr}</div>

                    <div className="email">
                      <input
                        type="password"
                        className="my-input text-white fw-light ps-5 w-100"
                        placeholder="Password"
                        name="Password"
                        onChange={onchangePass}
                        value={pass}
                      />
                      <div className="emailIcon">
                        <img src={password} alt="" height="22" width="22" />
                      </div>
                    </div>
                    <div className="errBox text-red">{passErr}</div>

                    <div className="password">
                      <input
                        type="password"
                        className="my-input text-white fw-light ps-5 w-100"
                        placeholder="Confirm Password"
                        name="ConfirmPassword"
                        onChange={onchangeConfirmPass}
                        value={confirmpass}
                      />
                      <div className="passIcon">
                        <img src={password} alt="" height="22" width="22" />
                      </div>
                    </div>
                    <div className="errBox text-red  mb-1">
                      {confirmpassErr}
                    </div>

                    <div className="sign-in-btn pt-2 pb-1">
                      <input
                        type="submit"
                        className="btn btn-danger my-bg-red rounded-0 w-100"
                        value="Sign Up"
                      />
                    </div>
                    <div className="errBox text-red text-center pt-1">
                      {isExist}
                    </div>
                  </form>
                  <div className="forgot-pass text-center">
                    <div className="fw-light my-sp-decoration">
                      Already have an account ?
                      <NavLink to="/login" className="my-a-decoration fw-light">
                        {" "}
                        Sign In
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

export default Registration;
