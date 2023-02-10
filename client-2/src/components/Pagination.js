import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changePage, getPosts, setCurrentPost } from "../features/postSlice";
import styled from "styled-components";
import Pagination from "react-bootstrap/Pagination";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";

const Wrapper = styled.div`
  .pagination {
    width: 50%;
    margin: 0 auto 8px auto;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .page-btn {
    border-radius: 0;
  }
`;

const Paginate = () => {
  const { numOfPages, page } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    dispatch(changePage(newPage));
  };

  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    dispatch(changePage(newPage));
  };

  return (
    <Wrapper>
      <Pagination className="pagination">
        <Pagination.Item className="page-btn" onClick={prevPage}>
          <FaArrowCircleLeft />
        </Pagination.Item>
        {pages.map((pageNumber) => {
          console.log(pageNumber);
          return (
            <Pagination.Item
              type="button"
              className={pageNumber === page ? "active page-btn" : "page-btn"}
              key={pageNumber}
              onClick={() => dispatch(changePage(pageNumber))}
            >
              {pageNumber}
            </Pagination.Item>
          );
        })}
        <Pagination.Item className="page-btn" onClick={nextPage}>
          <FaArrowCircleRight />
        </Pagination.Item>
      </Pagination>
    </Wrapper>
  );
};

export default Paginate;
