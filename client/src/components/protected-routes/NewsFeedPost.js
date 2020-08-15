import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GET_LIKE, UPDATE_LIKE, GET_COMMENT } from "../../graphQL/Operation";
import { useQuery, useMutation } from "@apollo/client";
import Button from "react-bootstrap/Button";
import Comment from "../comment-component/Comment";

const PostWrapper = styled.div`
  display: flex;
  flex-flow: column;
  background: #242526;
  width: 32vw;
  margin: 1rem auto 1rem;
  border-radius: 10px;
  padding: 5px;
`;

function NewsFeedPost({ post }) {
  const [likes, setLikes] = useState(0);
  const [commentArray, setComment] = useState(null);
  const [showComment, setShow] = useState(false);

  //query
  const { data: likeNumber } = useQuery(GET_LIKE, {
    variables: { id: post.id },
    fetchPolicy: "no-cache",
  });

  const { data: comments } = useQuery(GET_COMMENT, {
    variables: { id: post.id },
    fetchPolicy: "no-cache",
  });

  //mutation
  const [updateLike] = useMutation(UPDATE_LIKE);

  useEffect(() => {
    if (likeNumber) {
      setLikes(likeNumber.likes[0].likes);
    }

    if (comments && comments.commentList) {
      setComment(comments.commentList.commentList);
    }
  }, [likeNumber, comments]);

  const likeHandler = () => {
    setLikes(
      likes + 1,
      updateLike({ variables: { id: post.id, amount: likes + 1 } })
    );
  };

  return (
    <div>
      <PostWrapper key={post.id}>
        <h4>{post.email}</h4>
        <p>{post.content}</p>
        <div
          style={{
            display: "flex",
            flexFlow: "row",
            justifyContent: "space-between",
          }}
        >
          <Button size='sm' style={{ width: "20%" }} onClick={likeHandler}>
            Like
          </Button>
          <p>{likes} likes</p>
          <Button
            size='sm'
            style={{ width: "20%" }}
            onClick={() => setShow(!showComment)}
          >
            Comments
          </Button>
        </div>
        <div style={{ display: showComment ? "block" : "none" }}>
          <hr style={{ backgroundColor: "white", width: "80%" }} />
          <Comment
            postId={post.id}
            commentList={commentArray}
            style={{ height: "100%" }}
          />
        </div>
      </PostWrapper>
    </div>
  );
}

export default NewsFeedPost;
