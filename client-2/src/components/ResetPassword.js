import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { hideAlert, resetPassword } from "../features/authSlice";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import LockOpenIcon from "@mui/icons-material/LockOpen";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPassword = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading, showAlert, alertText } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      resetPassword({
        password,
        token: query.get("token"),
        email: query.get("email"),
        navigate,
      })
    );
    setTimeout(() => {
      dispatch(hideAlert());
    }, 2000);
  };

  return (
    <Wrapper>
      <div className="form-container">
        <Form className="form">
          {showAlert && <p className="alerting">{alertText}</p>}
          <div className="icon-container">
            <LockOpenIcon fontSize="large" className="icon" />
          </div>
          <Form.Control
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password!"
          ></Form.Control>
          <Button
            disabled={isLoading}
            variant="success"
            type="submit"
            onClick={handleSubmit}
          >
            Reset Password
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

  .form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 300px;
  }

  .icon-container {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }

  .form input {
    margin-bottom: 15px;
  }

  .disabled {
    cursor: not-allowed;
  }

  .alerting {
    font-size: 20px;
  }

  .form-container {
    border: none;
    padding: 20px;
    background-color: white;
    border-radius: 2px;
    box-shadow: 2px 2px 2px #9f9f9f;
  }
`;

export default ResetPassword;
