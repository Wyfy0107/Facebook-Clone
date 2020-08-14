import React, { useState, useEffect } from "react";
import { POST_SUBSCRIPTION } from "../../graphQL/Operation";
import { useSubscription } from "@apollo/client";
import Post from "./Post";

function PostLayout({ email, data }) {
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

  return (
    <div>
      {posts &&
        posts.map(post => (
          <Post
            key={post.id}
            post={post}
            email={email}
            setPosts={setPosts}
            posts={posts}
          />
        ))}
    </div>
  );
}

export default PostLayout;
