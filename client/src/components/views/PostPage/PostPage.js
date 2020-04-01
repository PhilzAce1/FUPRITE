import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Comments from './sections/Comments';
import { Typography } from 'antd';
import initialContent from '../RFC/Content/initialContent';
const { Title } = Typography;

function PostPage(props) {
  const [post, setPost] = useState([]);
  const postId = props.match.params.postId;
  const [Video, setVideo] = useState([]);
  const [CommentLists, setCommentLists] = useState([]);

  const videoVariable = {
    videoId: postId
  };

  useEffect(() => {
    const variable = { postId: postId };
    axios.post('/api/blog/getPost', variable).then(response => {
      if (response.data.success) {
        setPost(response.data.post);
      } else {
        alert('Couldnt get post');
      }
    });
    axios.post('/api/comment/getComments', videoVariable).then(response => {
      if (response.data.success) {
        console.log('response.data.comments', response.data.comments);
        setCommentLists(response.data.comments);
      } else {
        alert('Failed to get video Info');
      }
    });
  }, []);
  const updateComment = newComment => {
    setCommentLists(CommentLists.concat(newComment));
  };

  if (post.writer) {
    return (
      <div className="postPage" style={{ width: '80%', margin: '3rem auto' }}>
        <Title level={2}>{post.writer.name}`s Post</Title>
        <br />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Title level={4}>{post.createdAt}</Title>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        <Comments
          CommentLists={CommentLists}
          postId={post._id}
          refreshFunction={updateComment}
        />
      </div>
    );
  } else {
    return (
      <div
      // style={{ width: '80%', margin: '3rem auto' }}
      >
        {initialContent}
      </div>
    );
  }
}

export default PostPage;
