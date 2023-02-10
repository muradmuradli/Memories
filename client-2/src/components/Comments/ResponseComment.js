import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteReply, likeComment } from "../../features/commentSlice";

const ResponseComment = ({ reply, comment, name }) => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);

  const handleLike = async () => {
    dispatch(likeComment({ _id: reply._id, commentId: comment._id }));
  };

  const handleDelete = async () => {
    dispatch(deleteReply({ commentId: comment._id, replyId: reply._id }));
  };

  return (
    <div className="comment-body">
      <img
        height="50"
        src="https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg"
      ></img>
      <div className="comment-content">
        <h1 className="comment-user">{reply.name}</h1>
        <p>{reply.message}</p>
        <div className="comment-funcs">
          <div className="like">
            <button onClick={handleLike} className="like-btn">
              <ThumbUpIcon /> {reply.likes?.length}
            </button>
          </div>
          {userId === reply.createdBy && <div className="dot"></div>}

          {userId === reply.createdBy && (
            <button
              className="delete-btn"
              type="button"
              variant="outline-primary"
              onClick={handleDelete}
            >
              <DeleteIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResponseComment;
