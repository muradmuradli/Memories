import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  getAllComments,
  replyToComment,
} from "../../features/commentSlice";
import SingleComment from "./SingleComment";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import ResponseComment from "./ResponseComment";

const Comment = ({ comment }) => {
  const [replyMode, setReplyMode] = useState(false);
  const [reply, setReply] = useState("");
  const { userId } = useSelector((state) => state.auth);
  const { postId } = useParams();
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteComment({ postId, commentId: comment._id }));
  };

  const handleReply = (e) => {
    e.preventDefault();
    dispatch(replyToComment({ postId, commentId: comment._id, reply }));
    setReply("");
    setReplyMode(false);
  };

  return (
    <Wrapper>
      <div className="comment">
        <SingleComment
          comment={comment}
          replyMode={replyMode}
          handleDelete={handleDelete}
          setReplyMode={setReplyMode}
          com="comment"
        />
        {replyMode && (
          <Form className="form-reply">
            <Form.Group
              className="form-group mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Reply..."
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Button
              className="form-reply-btn"
              onClick={handleReply}
              type="submit"
              variant="outline-primary"
            >
              Reply
            </Button>
          </Form>
        )}
        <div className="replies">
          {comment.responses?.map((reply, index) => (
            <div key={index} className="reply">
              <DoubleArrowIcon className="reply-icon" />
              <ResponseComment comment={comment} reply={reply} />
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 50px;

  .comment {
    display: flex;
    flex-direction: column;
    margin: 50px 0;
  }

  .comment-body {
    display: flex;
  }

  .comment img {
    border-radius: 50%;
    margin-right: 10px;
  }

  .comment-user {
    font-size: 18px;
    font-weight: bold;
  }

  .comment-funcs {
    display: flex;
    align-items: center;
  }

  .like-btn {
    border: none;
    color: #54a0ed;
    transition: all 0.1s ease-in-out;
  }

  .like-btn:hover {
    color: #2b88e6;
    transform: scale(1.1);
  }

  .like {
    display: flex;
    align-items: center;
  }

  .like span {
    margin-left: 5px;
    color: black;
  }

  .dot {
    display: flex;
    text-align: center;
    justify-content: center;
    border: 1px solid black;
    border-radius: 50%;
    height: 5px;
    width: 5px;
    background-color: black;
    margin: 0 15px;
  }

  .reply-btn {
    border: none;
    font-size: 16px;
    transition: all 0.1s ease-in-out;
  }

  .reply-btn:hover {
    transform: scale(1.04);
  }

  .comment-count {
    margin-bottom: 15px;
  }

  .form-reply {
    margin-top: 10px;
    margin-left: 100px;
  }

  .delete-btn {
    border: none;
    color: #ee4343;
    transition: all 0.1s ease-in-out;
  }

  .delete-btn:hover {
    color: #ee1515;
    transform: scale(1.1);
  }

  .replies {
    margin-left: 100px;
  }

  .reply {
    margin: 30px 0;
    display: flex;
  }

  .reply-icon {
    margin-right: 20px;
    margin-top: 11px;
  }
`;

export default Comment;
