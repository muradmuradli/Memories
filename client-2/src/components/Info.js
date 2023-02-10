import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import EmailIcon from "@mui/icons-material/Email";

const Info = () => {
  const { state } = useLocation();
  const { text } = state;
  return (
    <Wrapper>
      <div className="container">
        <h4>
          Check your email <EmailIcon className="icon" />
        </h4>
        <span>{text}</span>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 64.8vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;

  .container {
    background: white;
    padding: 10px;
    width: 30%;
    border: 1px solid #b1b1b1;
    border-radius: 5px;
    padding: 20px;
    box-shadow: 2px 2px 2px #b1b1b1;
  }

  .container h4 {
    display: flex;
    align-items: center;
  }

  .icon {
    margin-left: 5px;
  }
`;

export default Info;
