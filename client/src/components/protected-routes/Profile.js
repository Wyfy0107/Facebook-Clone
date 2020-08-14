import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import { GET_USER_POSTS, ADD_POST } from "../../graphQL/Operation";
import { useLazyQuery, useMutation } from "@apollo/client";
import PostLayout from "../post-layout/PostLayout";

const PostSection = styled.div`
  background: #242526;
  width: 30vw;
  margin: auto;
  position: relative;
  top: 2rem;
  border-radius: 10px;
  padding: 0.5rem;
`;

const PostInput = styled.input`
  border-radius: 10px;
  outline: none;
  width: 15rem;
  height: 3rem;
  margin: 0.5rem;
`;

function Profile({ setAuth }) {
  const [userEmail, setUserEmail] = useState(null);
  const [postContent, setPostContent] = useState(null);
  //prettier-ignore
  const [getUserPosts,{ loading, error, data,  },] = useLazyQuery(GET_USER_POSTS);
  const [addPost] = useMutation(ADD_POST);

  useEffect(() => {
    getUserProfile();
    if (userEmail) {
      getUserPosts({ variables: { email: userEmail } });
    }
  }, [userEmail]);

  const getUserProfile = () => {
    axios
      .get("/api/profile")
      .then(res => {
        setUserEmail(res.data.email);
      })
      .catch(err => {
        setAuth(false);
        alert("please login again");
      });
  };

  const add = () => {
    if (!postContent) {
      alert("please fill posts");
    } else {
      addPost({ variables: { email: userEmail, content: postContent } });
    }
  };

  // const logOut = () => {
  //   setAuth(false);
  //   axios
  //     .post("/logout")
  //     .then(res => console.log(res))
  //     .catch(err => console.log(err));
  // };
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.log(error);
  }

  return (
    <div>
      <Nav
        style={{
          background: "#242526",
          height: "8vh",
          alignItems: "center",
          fontSize: "1.5rem",
        }}
        className='justify-content-center'
        activeKey='/home'
      >
        <Nav.Item>
          <Nav.Link href='/home'>Posts</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='link-1'>Profile</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='link-2'>Market Place</Nav.Link>
        </Nav.Item>
      </Nav>

      <div
        style={{
          display: "flex",
          flexFlow: "column",
          justifyContent: "space-around",
        }}
      >
        <div>
          <PostSection>
            <PostInput onChange={e => setPostContent(e.target.value)} />
            <br />
            <Button onClick={add}>Post</Button>
          </PostSection>
        </div>

        <div style={{ position: "relative", top: "6rem" }}>
          <PostLayout email={userEmail} data={data} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
