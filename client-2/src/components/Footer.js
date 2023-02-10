import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiFillInstagram } from "react-icons/ai";
import { BsTwitter, BsPinterest, BsFacebook } from "react-icons/bs";

const Footer = () => {
  return (
    <Wrapper>
      <div className="icons">
        <a href="#" style={{ color: "#dd7777" }}>
          <AiFillInstagram />
        </a>
        <a href="#" style={{ color: "#c3e881" }}>
          <BsTwitter />
        </a>
        <a href="#" style={{ color: "#7cb0c3" }}>
          <BsPinterest />
        </a>
        <a href="#" style={{ color: "#e581e8" }}>
          <BsFacebook />
        </a>
      </div>
      <div className="about">
        <Link>Home</Link>
        <Link>Services</Link>
        <Link>About</Link>
        <Link>Terms</Link>
        <Link>Privacy Policy</Link>
      </div>
      <p>Murad Web Design &copy; 2022</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: fit-content;
  background: #444444;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  font-size: 18px;
  margin-top: 20px;

  .icons {
    margin-top: 10px;
    display: flex;
  }

  .icons a {
    font-size: 25px;
    margin: 0 15px;
    color: #f3f3f3;
    transition: all 0.2s ease-in-out;
  }

  .icons a:hover {
    transform: scale(1.5);
  }

  .about {
    margin: 10px 0;
    display: flex;
  }

  .about a {
    text-decoration: none;
    color: white;
    margin: 0 15px;
    transition: all 0.2s ease-in-out;
  }

  .about a:hover {
    transform: scale(1.1);
  }

  p {
    font-size: 16px;
    color: #b6b6b6;
  }
`;

export default Footer;
