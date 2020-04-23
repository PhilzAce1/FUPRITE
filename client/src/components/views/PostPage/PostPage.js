import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Comments from './sections/Comments';
import { Typography } from 'antd';
import initialContent from '../RFC/Content/initialContent';
import moment from 'moment';
import { Avatar } from 'antd';

const { Title } = Typography;

function PostPage(props) {
  const [post, setPost] = useState([]);
  const postId = props.match.params.postId;
  const [CommentLists, setCommentLists] = useState([]);
  const [time, setTime] = useState('');
  const videoVariable = {
    videoId: postId,
  };

  useEffect(() => {
    const variable = { postId: postId };
    axios.post('/api/blog/getPost', variable).then((response) => {
      if (response.data.success) {
        setPost(response.data.post);
        // moment("2010-10-20 4:30",       "YYYY-MM-DD HH:mm")
        // setTime(moment(`${response.data.createdAt}`).format('Do MMM YYYY  LT'));
      } else {
        alert('Couldnt get post');
      }
    });
    axios.post('/api/comment/getComments', videoVariable).then((response) => {
      if (response.data.success) {
        setCommentLists(response.data.comments);
      } else {
        alert('Failed to get video Info');
      }
    });
  }, []);
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
          {/* <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              fontSize: '0,5rem',
            }}
          >
            <Title level={6}>
            </Title>
          </div> */}
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
