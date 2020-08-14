import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DELETE_POST, UPDATE_LIKE, GET_LIKE } from "../../graphQL/Operation";
import { useMutation, useQuery } from "@apollo/client";
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

function Post({ post, posts, email, setPosts }) {
  const [deletePost] = useMutation(DELETE_POST);
  const { data: likeNumber } = useQuery(GET_LIKE, {
    variables: { id: post.id },
  });
  const [updateLike] = useMutation(UPDATE_LIKE);

  const [likes, setLikes] = useState(null);

  useEffect(() => {
    if (likeNumber) {
      console.log(likeNumber);
      setLikes(likeNumber.likes[0].likes);
    }
  }, [likeNumber]);

  const del = id => {
    const copy = [...posts];
    let deletedPostIndex = copy.findIndex(post => post.id === id);
    copy.splice(deletedPostIndex, 1);
    setPosts(copy);
  };

  const likeHandler = (id, amount) => {
    setLikes(likes => likes + 1);
  };

  return (
    <div>
      <PostWrapper key={post.id}>
        <h4>{email}</h4>
        <p>{post.content}</p>
        <div
          style={{
            display: "flex",
            flexFlow: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            size='sm'
            style={{ width: "20%" }}
            onClick={() => {
              deletePost({ variables: { id: post.id } });
              del(post.id);
            }}
          >
            Delete
          </Button>
          <p>{likes} likes</p>
          <Button size='sm' style={{ width: "20%" }} onClick={likeHandler}>
            Like
          </Button>
        </div>
      </PostWrapper>
    </div>
  );
}

export default Post;
