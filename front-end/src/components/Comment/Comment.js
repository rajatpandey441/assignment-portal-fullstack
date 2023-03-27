import dayjs from "dayjs";
import jwt_decode from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserProvider/UserProvider";
import relativeTime from "dayjs/plugin/relativeTime";

const Comment = ({
  id,
  createdDate,
  createdBy,
  text,
  emitDeleteComment,
  emitEditComment,
}) => {
  const user = useContext(UserContext);
  const decodedJwt = jwt_decode(user.jwt);
  const [commentRelativeTime, setCommentRelativeTime] = useState("");

  useEffect(() => {
    updateCommentRelativeTime();
  }, [createdDate]);
  function updateCommentRelativeTime() {
    if (createdDate) {
      dayjs.extend(relativeTime);
      setCommentRelativeTime(dayjs(createdDate).fromNow());
    }
  }

  useEffect(() => {
    updateCommentRelativeTime();
  }, []);
  return (
    <>
      <div className="comment-bubble">
        {createdBy.username === decodedJwt.sub && (
          <div className="d-flex gap-5" style={{ fontWeight: "bold" }}>
            <div>{createdBy.username}</div>
            <div
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => emitEditComment(id)}
            >
              Edit
            </div>
            <div
              style={{ cursor: "pointer", color: "red" }}
              onClick={() => emitDeleteComment(id)}
            >
              Delete
            </div>
          </div>
        )}
        <div>{text}</div>
      </div>
      <div
        style={{ marginTop: "-1.25em", marginLeft: "1.4em", fontSize: "12px" }}
      >
        {commentRelativeTime && `Posted ${commentRelativeTime}`}
      </div>
    </>
  );
};

export default Comment;
