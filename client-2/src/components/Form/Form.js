import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  setCurrentPost,
  updatePost,
} from "../../features/postSlice";
import Search from "../Search/Search";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FaPagelines } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { displayAlert } from "../../features/postSlice";

const FormComponent = () => {
  const dispatch = useDispatch();
  const { isLoading, currentPost, alertText, alertType, showAlert } =
    useSelector((state) => state.posts);
  const { userId } = useSelector((state) => state.auth);

  const inputRef = useRef(null);

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  useEffect(() => {
    if (currentPost) {
      setPostData(currentPost);
    }
  }, [currentPost]);

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postData.title || !postData.message || !postData.tags) {
      dispatch(displayAlert());
      return;
    }

    if (currentPost) {
      dispatch(updatePost({ postData }));
    } else {
      dispatch(createPost({ postData }));
    }
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: null,
    });

    inputRef.current.value = "";
    dispatch(setCurrentPost(null));
  };

  return (
    <Wrapper>
      <Search />
      {userId ? (
        <Form className="wrapper-form">
          <p className="form-title">
            Creating a <span>Memory</span> <FaPagelines />
          </p>
          <div className="form-loading">
            {showAlert && <Alert variant={alertType}>{alertText}</Alert>}
          </div>
          <Form.Group>
            <Form.Control
              value={postData.title}
              name="title"
              type={"text"}
              placeholder="Title"
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control
              value={postData.message}
              name="message"
              type={"text"}
              placeholder="Message"
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control
              value={postData.tags}
              name="tags"
              type={"text"}
              placeholder="Tags"
              onChange={(e) =>
                setPostData({ ...postData, tags: e.target.value.split(",") })
              }
            ></Form.Control>
          </Form.Group>
          <Form.Control
            ref={inputRef}
            size="sm"
            name="selectedFile"
            type="file"
            onChange={(e) =>
              setPostData({ ...postData, selectedFile: e.target.files[0] })
            }
          />
          <Button className="btn" onClick={handleSubmit}>
            Submit <IoCreate className="icon" />
          </Button>
        </Form>
      ) : (
        <div className="infoo">
          <p>Please log in to create a post</p>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 2;
  height: 70%;
  margin-right: 20px;
  margin-bottom: 20px;
  font-size: 15px;

  .infoo {
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f3f3f3;
    margin-top: 5px;
    box-shadow: 5px 5px 5px 5px #979797;
  }

  .infoo p {
    margin-top: 13px;
  }

  .wrapper-form {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 15px;
    background-color: #f3f3f3;
    margin-top: 10px;
    box-shadow: 5px 5px 5px 5px #979797;
    font-size: 15px;
  }

  .wrapper-form input {
    margin: 10px 0;
  }

  .wrapper-form input[type="text"] {
    padding: 10px;
  }

  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn .icon {
    margin-left: 5px;
    font-size: 18px;
  }

  .form-title {
    text-align: center;
    font-size: 25px;
  }

  .form-title span {
    font-weight: bold;
    color: #4d77c5;
  }

  .form-loading {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media only screen and (max-width: 375px) {
    display: flex;
    justify-content: center;
    align-items: center;

    .wrapper-form {
      margin: 0;
      width: 100%;
    }
  }
`;

export default FormComponent;
