import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import fetchService from "../../services/fetchService";
import { UserContext } from "../../UserProvider/UserProvider";
import { useInterval } from "../../util/useInterval";
import Comment from "../Comment/Comment";

const CommentContainer = (props) => {
  const { assignmentId } = props;
  const user = useContext(UserContext);
  const emptyComment = {
    id: null,
    text: "",
    assignmentId: assignmentId != null ? parseInt(assignmentId) : null,
    user: user.jwt,
    createdDate: null,
  };
  const [comment, setComment] = useState(emptyComment);
  const [comments, setComments] = useState([]);
  useInterval(() => {
    updateCommentTimeDisplay();
  }, 1000 * 61);
  function updateCommentTimeDisplay() {
    const commentsCopy = [...comments];
    commentsCopy.forEach(
      (comment) => (comment.createdDate = dayjs(comment.createdDate))
    );
    formatComments(commentsCopy);
  }
  function formatComments(commentsCopy) {
    commentsCopy.forEach((comment) => {
      if (typeof comment.createDate === "string") {
        comment.createDate = dayjs(comment.createDate);
      }
    });
    setComments(commentsCopy);
  }
  useEffect(() => {
    fetchService(
      `/api/comments?assignmentId=${assignmentId}`,
      "GET",
      user.jwt
    ).then((commentsData) => {
      formatComments(commentsData);
    });
  }, []);

  function updateComment(value) {
    const commentCopy = { ...comment };
    commentCopy.text = value;
    setComment(commentCopy);
  }

  function submitComment() {
    if (comment.id) {
      fetchService(
        `/api/comments/${comment.id}`,
        "PUT",
        user.jwt,
        comment
      ).then((data) => {
        const commentsCopy = [...comments];
        const i = commentsCopy.findIndex((comment) => comment.id === data.id);
        commentsCopy[i] = data;
        formatComments(commentsCopy);
        setComment(emptyComment);
      });
    } else {
      fetchService("/api/comments", "POST", user.jwt, comment).then((data) => {
        const commentsCopy = [...comments];
        commentsCopy.push(data);
        formatComments(commentsCopy);
        setComment(emptyComment);
      });
    }
  }

  function handleDeleteComment(commentId) {
    let fetchParam = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.jwt}`,
      },
      method: "DELETE",
    };
    fetch(`/api/comments/${commentId}`, fetchParam).then((data) => {
      let commentsCopy = [...comments];
      commentsCopy = commentsCopy.filter(
        (commentLocal) => commentLocal.id !== commentId
      );
      formatComments(commentsCopy);
    });
  }
  function handleEditComment(commentId) {
    const i = comments.findIndex((comment) => comment.id === commentId);
    const commentCopy = {
      id: comments[i].id,
      text: comments[i].text,
      assignmentId: assignmentId != null ? parseInt(assignmentId) : null,
      user: user.jwt,
      createdDate: comments[i].createdDate,
    };
    setComment(commentCopy);
  }

  return (
    <>
      <div className="mt-5">
        <textarea
          style={{ width: "100%", borderRadius: "0.25em" }}
          onChange={(e) => updateComment(e.target.value)}
          value={comment.text}
        ></textarea>
        <Button onClick={() => submitComment()}>Post Comment</Button>
      </div>
      <div className="mt-5">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            id={comment.id}
            createdDate={comment.createdDate}
            createdBy={comment.createdBy}
            text={comment.text}
            emitDeleteComment={handleDeleteComment}
            emitEditComment={handleEditComment}
          />
        ))}
      </div>
    </>
  );
};

export default CommentContainer;
