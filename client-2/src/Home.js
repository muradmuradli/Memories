import React, { useEffect } from "react";
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "./features/postSlice";
import Navbar from "./components/Navbar/Navbar";
import Paginate from "./components/Pagination";

const Home = () => {
  const { currentPost, likePost, page } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentPost, dispatch, likePost, page]);

  return (
    <Wrapper>
      <Paginate />
      <div className="content">
        <Posts />
        <Form />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .content {
    display: flex;
  }

  @media only screen and (max-width: 375px) {
    .content {
      display: flex;
      flex-direction: column-reverse;
      background-color: red;
      padding: 0;
    }
  }
`;

export default Home;
