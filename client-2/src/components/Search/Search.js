import React, { useEffect, useState } from "react";
import { getPosts } from "../../features/postSlice";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import { FaSearch } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import { TbUserSearch } from "react-icons/tb";

const Wrapper = styled.div`
  background-color: #f3f3f3;
  padding: 15px;
  box-shadow: 5px 5px 5px 5px #979797;

  .search-form {
    display: flex;
    flex-direction: column;
  }

  .search-form .form-input {
    margin: 10px 0;
  }

  .search-form input[type="text"] {
    font-size: 15px;
    padding: 10px;
  }

  .search-form button {
    margin: 10px 0;
  }

  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn .icon {
    margin-left: 5px;
  }

  .search-header {
    text-align: center;
    font-size: 25px;
    font-weight: bold;
  }

  .search-header span {
    font-weight: bold;
    color: #4d77c5;
  }
`;

const Search = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(getPosts({ title, tags }));
  };

  useEffect(() => {
    handleSubmit();
  }, [title, tags]);

  return (
    <Wrapper>
      <p className="search-header">
        <span>Sea</span>rch <TbUserSearch />
      </p>
      <Form className="search-form">
        <Form.Control
          type="text"
          className="form-input"
          placeholder="Search by title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Form.Control
          placeholder="Search by tag"
          className="form-input"
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value.split(","))}
        />
        <Button
          variant="success"
          className="btn"
          type="submit"
          onClick={handleSubmit}
        >
          Search <FaSearch className="icon" />
        </Button>
      </Form>
    </Wrapper>
  );
};

export default Search;
