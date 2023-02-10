import React from "react";
import styled from "styled-components";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import Pagination from "../Pagination";
import { Spinner } from "react-bootstrap";

const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  flex: 10;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 375px) {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    background-color: blue;
  }
`;

const Posts = () => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  return (
    <Wrapper>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {posts.map((post) => {
            return <Post post={post} key={post._id} />;
          })}
        </>
      )}
    </Wrapper>
  );
};

export default Posts;
