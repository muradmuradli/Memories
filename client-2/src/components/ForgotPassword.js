import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, alert } from "../features/authSlice";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email, navigate }));
    dispatch(alert());
  };

  return (
    <Wrapper>
      <div className="form-container">
        <h4>Recover Password</h4>
        <div className="line"></div>
        <p>Don't worry, happens to the best of us</p>
        <Form className="form">
          <Form.Label style={{ fontWeight: "bold" }}>
            Your email address
          </Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          ></Form.Control>
          <Button
            style={{ marginTop: "10px" }}
            disabled={isLoading}
            variant="success"
            onClick={handleSubmit}
          >
            Send
          </Button>
        </Form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64.8vh;

  .form-container {
    border: none;
    padding: 30px;
    background-color: white;
    border-radius: 2px;
    box-shadow: 2px 2px 2px #9f9f9f;
  }

  .form-container p {
  }

  .line {
    border-bottom: 1px solid #878787;
    margin-bottom: 15px;
  }

  .form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 300px;
  }

  .form input {
    margin-bottom: 15px;
  }
`;

export default ForgotPassword;
