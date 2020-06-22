import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Comments from './sections/Comments';
import { Typography } from 'antd';
import initialContent from '../RFC/Content/initialContent';
import moment from 'moment';
import { Avatar, message } from 'antd';

const { Title } = Typography;

function PostPage(props) {
  const [post, setPost] = useState([]);
  const postId = props.match.params.postId;
  const [CommentLists, setCommentLists] = useState([]);
  // const [time, setTime] = useState('');
  const videoVariable = {
    videoId: postId,
  };

  useEffect(() => {
    const variable = { postId: postId };
    axios.post('/api/blog/getPost', variable).then((response) => {
      if (response.data.success) {
        setPost(response.data.post);
      } else {
        message.error('Couldnt get post');
        props.history.push('/home');
        message.success('You have been redirected to home');
      }
    });
    axios.post('/api/comment/getComments', videoVariable).then((response) => {
      if (response.data.success) {
        setCommentLists(response.data.comments);
      } else {
        message.error('Failed to get post Info');
      }
    });
  }, [postId, props.history, videoVariable]);
  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment));
  };

  if (post.writer) {
    return (
      <div>
        <div className="component_header">PostPage</div>
        <div
          style={{
            padding: '40px',
          }}
          className="post_content"
        >
          <div>
            <Avatar src={post.writer.image} size={50} />
            <Title level={3}> {post.writer.name}`s Post</Title>
            {moment(post.createdAt).format('Do MMM YYYY  LT')}
          </div>
          <br />

          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          <Comments
            CommentLists={CommentLists}
            postId={post._id}
            refreshFunction={updateComment}
          />
        </div>
      </div>
    );
  } else {
    return <div>{initialContent}</div>;
  }
}

export default PostPage;
