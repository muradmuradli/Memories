import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createComment, getAllComments } from "../../features/commentSlice";
import { useParams } from "react-router-dom";

const Comments = () => {
  const { comments } = useSelector((state) => state.comments);
  const dispatch = useDispatch();
  const { postId } = useParams();

  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createComment({ postId, message }));
    setMessage("");
  };

  useEffect(() => {
    dispatch(getAllComments({ postId }));
  }, []);

  return (
    <Wrapper>
      <p className="comment-count">Total Comments (5)</p>
      <Form className="form">
        <Form.Group
          className="form-group mb-3"
          controlId="exampleForm.ControlTextarea1"
        >
          <img
            height="50"
            src="https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg"
          ></img>
          <Form.Control
            placeholder="Add a comment"
            as="textarea"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>
        <Button
          onClick={handleSubmit}
          className="submit-btn"
          type="submit"
          variant="outline-primary"
        >
          Post Comment
        </Button>
      </Form>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #f3f3f3;
  margin: 30px;
  box-shadow: 3px 3px 3px #bababa;
  padding: 20px;

  .form-group {
    display: flex;
  }

  .form-group img {
    border-radius: 50%;
    margin-right: 10px;
  }

  .submit-btn {
    margin-left: 60px;
  }
`;

export default Comments;
