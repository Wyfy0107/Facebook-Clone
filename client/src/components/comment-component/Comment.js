import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ADD_COMMENT } from "../../graphQL/Operation";
import { useMutation } from "@apollo/client";
import Button from "react-bootstrap/Button";
import axios from "axios";

const CommentSection = styled.div`
  display: flex;
  flex-flow: column;
`;

const CommentWrapper = styled.div`
  margin: 5px;
  background: #3a3b3c;
  border-radius: 10px;
`;

const Input = styled.input`
  width: 50%;
  margin: auto;
`;

function Comment({ commentList, postId }) {
  const [comment, setComment] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [comList, setComList] = useState(null);
  //mutation
  const [addComment, { data: newComment }] = useMutation(ADD_COMMENT);

  useEffect(() => {
    setComList(commentList);
    getUserProfile();
    if (newComment && comList) {
      const copyComment = [...comList];
      const newCom = {
        email: newComment.addComment.email,
        comment: newComment.addComment.comment,
      };
      copyComment.push(newCom);
      setComList(copyComment);
    }
  }, [userEmail, newComment]);

  const sendComment = () => {
    addComment({
      variables: { id: postId, email: userEmail, comment: comment },
      fetchPolicy: "no-cache",
    });
  };
  const getUserProfile = () => {
    axios
      .get("/api/profile")
      .then(res => {
        setUserEmail(res.data.email);
      })
      .catch(err => {
        alert("please login again");
      });
  };

  return (
    <CommentSection>
      <div>
        <Input type='text' onChange={e => setComment(e.target.value)} />
        <Button onClick={sendComment} size='sm' style={{ margin: "5px" }}>
          Add
        </Button>
      </div>
      {comList &&
        comList.map((comment, index) => (
          <CommentWrapper key={index}>
            {comment.email}
            <br />
            {comment.comment}
          </CommentWrapper>
        ))}
    </CommentSection>
  );
}

export default Comment;
