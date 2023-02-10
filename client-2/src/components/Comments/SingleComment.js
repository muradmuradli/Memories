import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { likeComment } from "../../features/commentSlice";
import styled from "styled-components";

const SingleComment = ({
  comment,
  replyMode,
  setReplyMode,
  handleDelete,
  com,
}) => {
  const { userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLike = async () => {
    dispatch(likeComment({ _id: comment._id, com }));
  };

  return (
    <Wrapper className="comment-body">
      <img
        height="50"
        src="https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg"
      ></img>
      <div className="comment-content">
        <h1 className="comment-user">{comment.name}</h1>
        <p>{comment.message}</p>
        <div className="comment-funcs">
          <div className="like">
            <button onClick={handleLike} className="like-btn">
              <ThumbUpIcon /> {comment.likes.length}
            </button>
          </div>
          <div className="dot"></div>
          <button
            type="button"
            onClick={(e) => setReplyMode(!replyMode)}
            className="reply-btn"
          >
            Reply
          </button>
          {userId === comment.createdBy && <div className="dot"></div>}
          {userId === comment.createdBy && (
            <button
              className="delete-btn"
              type="button"
              variant="outline-primary"
              onClick={handleDelete}
            >
              <DeleteIcon />
            </button>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default SingleComment;
