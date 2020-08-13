import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DELETE_POST, POST_SUBSCRIPTION } from "../../graphQL/Operation";
import { useMutation, useSubscription } from "@apollo/client";
import Button from "react-bootstrap/Button";

const PostWrapper = styled.div`
  display: flex;
  flex-flow: column;
  background: #242526;
  width: 25vw;
  margin: 1rem auto 1rem;
  border-radius: 10px;
  padding: 5px;
`;

function PostLayout({ email, data }) {
  const [deletePost] = useMutation(DELETE_POST);
  const [posts, setPosts] = useState(null);

  const { data: newPost } = useSubscription(POST_SUBSCRIPTION);

  useEffect(() => {
    if (data) {
      const { user } = data;
      const postList = [...user[0].posts];
      setPosts(postList);
    }
    if (newPost) {
      const postCopy = [...posts];
      postCopy.push(newPost.newPostAdded);
      setPosts(postCopy);
    }
  }, [data, newPost]);

  const del = id => {
    const copy = [...posts];
    let deletedPostIndex = copy.findIndex(post => post.id === id);
    copy.splice(deletedPostIndex, 1);
    setPosts(copy);
  };

  return (
    <div>
      {posts &&
        posts.map((post, index) => (
          <PostWrapper key={index}>
            <h4>{email}</h4>
            <p>{post.content}</p>
            <Button
              onClick={() => {
                deletePost({ variables: { id: post.id } });
                del(post.id);
              }}
            >
              Delete
            </Button>
          </PostWrapper>
        ))}
    </div>
  );
}

export default PostLayout;
