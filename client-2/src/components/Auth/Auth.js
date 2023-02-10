import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { displayAlert, login, alert, register } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { MdLogin } from "react-icons/md";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [userData, setUserData] = useState(initialState);
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const { isLoading, alertText, alertType } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    if (isLogin) {
      dispatch(login({ userData, navigate }));
    } else {
      dispatch(register({ userData, navigate }));
    }

    dispatch(alert());

    setUserData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const toggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Wrapper>
      <Form>
        <p className="form-header">
          {!isLogin ? "Sign Up" : "Sign In"} <MdLogin />
        </p>
        {isLoading && (
          <Spinner className="mb-2 mt-2" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {alertText && <Alert variant={alertType}>{alertText}</Alert>}
        {!isLogin && (
          <>
            <Form.Group className="form-group">
              <Form.Control
                value={userData.firstName}
                type={"text"}
                placeholder="First Name"
                onChange={(e) =>
                  setUserData({ ...userData, firstName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Control
                value={userData.lastName}
                type={"text"}
                placeholder="Last Name"
                onChange={(e) =>
                  setUserData({ ...userData, lastName: e.target.value })
                }
              />
            </Form.Group>
          </>
        )}
        <Form.Group className="form-group">
          <Form.Control
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            type={"email"}
            placeholder="Email"
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Control
            value={userData.password}
            type={"password"}
            placeholder="Password"
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
        </Form.Group>
        {!isLogin && (
          <Form.Group className="form-group">
            <Form.Control
              value={userData.confirmPassword}
              type={"password"}
              placeholder="Confirm Password"
              onChange={(e) =>
                setUserData({ ...userData, confirmPassword: e.target.value })
              }
            />
          </Form.Group>
        )}
        <Button
          className={`submit-btn`}
          disabled={isLoading}
          type="submit"
          variant="success"
          onClick={handleSubmit}
        >
          {isLogin ? "Login" : "Register"}
        </Button>
        <div className="toggle-content">
          <p>
            {isLogin
              ? "Don't have an account yet? "
              : "Already have an account? "}
          </p>
          <button type="button" className="toggle-btn" onClick={toggle}>
            {isLogin ? "register" : "login"}
          </button>
        </div>
        {isLogin && (
          <Link className="forgot-password" to="/forgot-password">
            Forgot your password?
          </Link>
        )}
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 68vh;

  form {
    background-color: #c9e1f5;
    width: 350px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 3px 3px 3px #a8a8a8;
  }

  .form-group {
    margin: 10px 0;
    width: 100%;
  }

  .form-group input {
    width: 100%;
    padding: 10px;
    font-size: 20px;
  }

  .submit-btn {
    width: 100%;
    margin-top: 5px;
  }

  .toggle-content {
    display: flex;
    align-items: center;
  }

  .toggle-content p {
    margin-top: 15px;
  }

  .toggle-btn {
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    margin-left: 5px;
    color: #4a5fab;
    font-weight: bold;
    text-transform: capitalize;
  }

  .form-header {
    font-size: 25px;
    margin: 0;
  }

  .btn-danger {
    background: #c15959;
    color: white;
  }

  .forgot-password {
    text-decoration: none;
    color: #33467b;
  }

  .disabled {
    background-color: yellow;
    cursor: not-allowed;
  }
`;

export default Auth;
