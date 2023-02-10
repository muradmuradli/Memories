import axios from "axios";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Verify = () => {
  const query = useQuery();

  const verifyToken = async () => {
    try {
      const { data } = await axios.post(
        `https://memories-backend-fxqu.onrender.com/auth/verify-email`,
        {
          verificationToken: query.get("token"),
          email: query.get("email"),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verifyToken();
    console.log("dick");
  }, []);

  return (
    <Wrapper>
      <div>
        <h2>Account verified!</h2>
        <Link to="/auth">Please login</Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 64.8vh;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  div a {
    text-decoration: none;
    color: #5c78b9;
    font-size: 20px;
    transition: all 0.1s ease-in-out;
  }

  div a:hover {
    transform: scale(1.1);
  }
`;

export default Verify;
