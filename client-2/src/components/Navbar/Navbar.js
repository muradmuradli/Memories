import React from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import { FiLogIn } from "react-icons/fi";
import { useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { logout } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";

const Navbar = () => {
  const { name, userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Link className="navbar-link" to="/">
        <div className="left">
          <img
            src="https://icon-library.com/images/ios-7-photos-icon/ios-7-photos-icon-23.jpg"
            alt="memories"
          />
          <p>
            Memories <span>App</span>
          </p>
        </div>
      </Link>
      {!name ? (
        <div className="right">
          <Button>
            <Link to="/auth">
              <FiLogIn /> Sign In
            </Link>
          </Button>
        </div>
      ) : (
        <div className="user-info">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item className="dropdown-item" href="#/action-2">
                <CgProfile className="dropdown-item-icon" /> User Profile
              </Dropdown.Item>
              <Dropdown.Item
                className="dropdown-item"
                onClick={() => dispatch(logout())}
              >
                <BiLogOut className="dropdown-item-icon" /> Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #fffdfd;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  margin: 20px auto;
  height: 70px;
  box-shadow: 5px 5px 5px #b0b0b0;

  .navbar-link {
    text-decoration: none;
    color: #3b3b3b;
    transition: all 0.5ms ease-in-out;
  }

  .left {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
  }

  p {
    font-size: 40px;
    margin-top: 12px;
  }

  p span {
    font-weight: bold;
    color: #7a809e;
  }

  img {
    border-radius: 5px;
    height: 50px;
    margin-right: 10px;
  }

  .right,
  .user-info {
    margin-right: 15px;
  }

  .right a {
    color: white;
    text-decoration: none;
  }

  .dropdown-item {
    display: flex;
    align-items: center;
  }

  .dropdown-item-icon {
    margin-right: 5px;
  }
`;

export default Navbar;
