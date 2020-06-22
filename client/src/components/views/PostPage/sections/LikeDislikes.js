import React, { useEffect, useState } from 'react';
import { Tooltip, Icon, message } from 'antd';
import Axios from 'axios';

function LikeDislikes(props) {
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DislikeAction, setDislikeAction] = useState(null);
  let variable = {};

  if (props.videoId) {
    variable = { videoId: props.videoId, userId: props.userId };
  } else {
    variable = { commentId: props.commentId, userId: props.userId };
  }

  useEffect(() => {
    console.log('I am working');

    Axios.post('/api/like/getLikes', variable).then((response) => {
      if (response.data.success) {
        //How many likes does this video or comment have
        setLikes(response.data.likes.length);

        //if I already click this like button or not
        response.data.likes.map((like) => {
          if (like.userId === props.userId) {
            return setLikeAction('liked');
          }
          return setLikeAction(null);
        });
      } else {
        message.error('Failed to Like ');
      }
    });

    Axios.post('/api/like/getDislikes', variable).then((response) => {
      if (response.data.success) {
        //How many likes does this video or comment have
        setDislikes(response.data.dislikes.length);

        //if I already click this like button or not
        response.data.dislikes.map((dislike) => {
          if (dislike.userId === props.userId) {
            setDislikeAction('disliked');
          }
          return setDislikeAction(null);
        });
      } else {
        message.error('Failed to DisLike ');
      }
    });
    // return () => {};
    // eslint-disable-next-line
  }, []);

  const onLike = () => {
    if (LikeAction === null) {
      Axios.post('/api/like/upLike', variable).then((response) => {
        if (response.data.success) {
          setLikes(Likes + 1);
          setLikeAction('liked');

          if (DislikeAction !== null) {
            setDislikeAction(null);
            setDislikes(Dislikes - 1);
          }
        } else {
          message.error('Failed to like');
        }
      });
    } else {
      Axios.post('/api/like/unLike', variable).then((response) => {
        if (response.data.success) {
          setLikes(Likes - 1);
          setLikeAction(null);
        } else {
          message.error('Failed to dislike');
        }
      });
    }
  };

  const onDisLike = () => {
    console.log('You are disliking ');
    if (DislikeAction !== null) {
      Axios.post('/api/like/unDisLike', variable).then((response) => {
        if (response.data.success) {
          setDislikes(Dislikes - 1);
          setDislikeAction(null);
        } else {
          alert('Failed to decrease dislike');
        }
      });
    } else {
      Axios.post('/api/like/upDisLike', variable).then((response) => {
        if (response.data.success) {
          setDislikes(Dislikes + 1);
          setDislikeAction('disliked');

          //If dislike button is already clicked
          if (LikeAction !== null) {
            setLikeAction(null);
            setLikes(Likes - 1);
          }
        } else {
          alert('Failed to increase dislike');
        }
      });
    }
  };

  return (
    <React.Fragment>
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
            onClick={onLike}
          />
        </Tooltip>
        <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
      </span>
      {/* &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; */}
      <span key="comment-basic-dislike">
        <Tooltip title="Dislike">
          <Icon
            type="dislike"
            theme={DislikeAction === 'disliked' ? 'filled' : 'outlined'}
            onClick={onDisLike}
          />
        </Tooltip>
        <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Dislikes}</span>
      </span>
    </React.Fragment>
  );
}

export default LikeDislikes;
