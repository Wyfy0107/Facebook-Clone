import React, { useState, useEffect } from "react";
import { GET_ALL_POSTS } from "../../graphQL/Operation";
import { useQuery } from "@apollo/client";
import styled from "styled-components";

const PostWrapper = styled.div`
  display: flex;
  flex-flow: column;
  background: #242526;
  width: 25vw;
  margin: 1rem auto 1rem;
  border-radius: 10px;
  padding: 5px;
`;

function NewsFeed() {
  const [posts, setPosts] = useState(null);
  const { data, error, loading } = useQuery(GET_ALL_POSTS);

  useEffect(() => {
    if (data) {
      console.log(data.posts);
      setPosts(data.posts);
    }
  }, [data]);

  if (error) {
    console.log(error);
  }
  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ marginTop: "3rem" }}>
      {posts &&
        posts.map(post => (
          <PostWrapper key={post.id}>
            <h4>{post.email}</h4>
            <p>{post.content}</p>
          </PostWrapper>
        ))}
    </div>
  );
}

export default NewsFeed;
