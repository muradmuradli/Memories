import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSinglePost } from "../features/postSlice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";
import Comment from "./Comments/Comment";
import Comments from "./Comments/Comments";

const SinglePage = () => {
  const { postId } = useParams();
  const { post, isLoading } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSinglePost({ postId }));
  }, [postId]);

  return (
    <>
      <Wrapper>
        {isLoading ? (
          <Spinner className="spin" size="lg" />
        ) : (
          <>
            <div className="img-container">
              <Image rounded src={post?.selectedFile}></Image>
            </div>
            <div className="content">
              <h1 className="title">{post?.title}</h1>
              <div className="tags">
                {post?.tags.map((tag, index) => (
                  <p key={index} className="tag">
                    #{tag}
                  </p>
                ))}
              </div>
              <p className="desc">{post?.message}</p>
            </div>
          </>
        )}
      </Wrapper>
      <Comments />
    </>
  );
};

const Wrapper = styled.div`
  .spin {
  }

  margin: 30px;
  border: 1px solid #e1e1e1;
  box-shadow: 3px 3px 3px #bababa;
  padding: 20px;
  display: flex;
  min-height: 492px;
  height: fit-content;
  background: #f3f3f3;
  justify-content: center;

  .img-container {
    height: 450px;
    flex: 1;
  }

  .img-container img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 20px;
    flex: 1;
  }

  .tags {
    display: flex;
  }

  .tags .tag {
    margin: 0 5px;
  }

  .title {
    text-align: center;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
  }

  .desc {
    margin-top: 10px;
  }
`;

export default SinglePage;
