import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  getPosts,
  likePost,
  setCurrentPost,
  updatePost,
} from "../../../features/postSlice";
import Badge from "react-bootstrap/Badge";

const Wrapper = styled.div`
  border-radius: 10px;
  border: 1px solid #bcbcbc;
  box-shadow: 2px 2px 2px #bcbcbc;
  width: 20%;
  margin: 10px;
  height: 430px;
  overflow: hidden;
  position: relative;
  background-color: #f5f5f5;
  transition: all 0.1s ease-in-out;

  &:hover {
    transform: scale(1.02);
    cursor: pointer;
  }

  .image {
    display: flex;
    height: 200px;
  }

  .image img {
    width: 100%;
    object-fit: cover;
    filter: brightness(80%);
  }

  .dots {
    position: absolute;
    top: 10px;
    right: 10px;
    color: white;
  }

  .post-content {
    padding: 10px;
  }

  .post-tags {
    color: #8c8c8c;
    margin: 0 0 10px 0;
  }

  .post-title {
    font-size: 25px;
    margin-bottom: 10px;
  }

  .post-desc {
    margin-bottom: 10px;
    font-size: 15px;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 10px;
    position: absolute;
    bottom: 0px;
    left: 10px;
    right: 10px;
  }

  .button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    border: none;
  }

  .button .icon {
    margin-right: 5px;
  }

  .button button {
    border: none;
    cursor: pointer;
  }

  .button-like .icon {
    color: #407598;
  }

  .button-delete .icon {
    color: #f64d2b;
  }

  .dots button {
    background-color: transparent;
    border: none;
    color: white;
    cursor: pointer;
  }

  .button-like button .icon:hover,
  .button-delete button .icon:hover {
    transform: scale(1.1);
  }

  .post-title a {
    color: #343434;
    text-decoration: none;
  }

  .post-link {
    text-decoration: none;
    color: black;
  }

  .disabled {
    color: grey;
    cursor: not-allowed;
    margin-right: 5px;
  }

  .image-text {
    position: absolute;
    top: 10px;
    left: 10px;
    color: white;
    font-size: 16px;
    display: flex;
    align-items: center;
  }

  .badge {
    margin-bottom: 15px;
    margin-left: 10px;
  }
`;

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);
  const [times, setTimes] = useState(["second", "minute", "hour"]);

  const setUpdatePost = (id) => {
    dispatch(setCurrentPost(id));
  };

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === userId) ? (
        <>
          <ThumbUpIcon className={userId ? "icon" : "disabled"} />
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpIcon className={userId ? "icon" : "disabled"} />
          {post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    } else {
      return (
        <>
          <ThumbUpIcon className={userId ? "icon" : "disabled"} />
          Like
        </>
      );
    }
  };

  return (
    <Wrapper>
      <Link to={`/posts/${post._id}`} className="post-link">
        <div className="image">
          <img src={post.selectedFile} alt="freeman"></img>
          <div className="image-text">
            <p>{moment(post.createdAt).fromNow()}</p>
            {times.some((time) =>
              moment(post.createdAt).fromNow().includes(time)
            ) && (
              <Badge bg="warning" className="badge">
                New
              </Badge>
            )}
          </div>

          <div className="dots">
            <button onClick={() => setUpdatePost(post._id)}>
              <MoreHorizIcon />
            </button>
          </div>
        </div>
      </Link>

      <div className="post-content">
        <Link to={`/posts/${post._id}`} className="post-link">
          <p className="post-tags">{post.tags.map((tag) => `#${tag} `)}</p>
          <p className="post-title">{post.title.slice(0, 15)}...</p>
          <p className="post-desc">{post.message.slice(0, 100)}...</p>
        </Link>
        <div className="buttons ">
          <div className="button button-like">
            <button onClick={() => dispatch(likePost({ _id: post._id }))}>
              <Likes />
            </button>
          </div>
          <div className="button button-delete">
            <button onClick={() => dispatch(deletePost({ _id: post._id }))}>
              <DeleteIcon className={userId ? "icon" : "disabled"} />
            </button>
            Delete
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Post;
