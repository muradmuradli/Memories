import React from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Profile = () => {
  return (
    <Wrapper>
      <div className="image">
        <img src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"></img>
      </div>
      <div className="info">
        <p className="info-name">Murad Muradli</p>
        <Form>
          <Form.Control placeholder="New name"></Form.Control>
        </Form>
        <p className="info-email">mmuradmuradlii@gmail.com</p>
        <Form>
          <Form.Control placeholder="New email"></Form.Control>
        </Form>
        <p className="info-password">Password</p>
        <Form>
          <Form.Control placeholder="New password"></Form.Control>
        </Form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  display: flex;
  height: 64.8vh;

  .image {
    flex: 1;
  }

  .info {
    flex: 1;
  }
`;

export default Profile;
