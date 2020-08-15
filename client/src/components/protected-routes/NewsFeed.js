import React, { useState, useEffect } from "react";
import { GET_ALL_POSTS } from "../../graphQL/Operation";
import { useQuery } from "@apollo/client";
import NewsFeedPost from "./NewsFeedPost";

function NewsFeed() {
  const [posts, setPosts] = useState(null);
  const { data, error, loading } = useQuery(GET_ALL_POSTS, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (data) {
      setPosts(data.posts);
    }
  }, [data]);

  if (error) {
    console.log(error);
  }
  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ marginTop: "3rem" }}>
      {posts && posts.map(post => <NewsFeedPost key={post.id} post={post} />)}
    </div>
  );
}

export default NewsFeed;
