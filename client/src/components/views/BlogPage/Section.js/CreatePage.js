import React, { useState } from 'react';

import QuillEditor from '../../../editor/QuillEditor';
import { Typography, Button, Form, message, Input } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';

const { Title } = Typography;

function CreatePage(props) {
  const user = useSelector((state) => state.user);
  const [content, setContent] = useState('');
  // const [files, setFiles] = useState([]);
  const [title, setTitle] = useState('');

  const onTitleChange = (value) => {
    setTitle(value.target.value);
  };

  const onEditorChange = (value) => {
    setContent(value);
  };

  const onFilesChange = (files) => {
    // setFiles(files);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!user.loginSuccess) {
      message.error('Please Log in first');
      props.history.push('/login');
    }

    const variables = {
      content: content,
      userID: user.userID,
      title: title,
    };
    if (variables.title.length < 5) {
      return message.error('Please Write a Title ');
    }

    axios.post('/api/blog/createPost', variables).then((response) => {
      if (response) {
        message.success('Post Created!');
        setContent('');
        setTitle('');
        setTimeout(() => {
          props.history.push('/blog');
        }, 2000);
      }
    });
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <Title level={2}> Editor</Title>
      </div>
      <Input
        placeholder="Title Here"
        maxLength={60}
        size={'middle'}
        onChange={onTitleChange}
      />
      <QuillEditor
        placeholder={'Start Posting Something'}
        onEditorChange={onEditorChange}
        onFilesChange={onFilesChange}
      />

      <Form onSubmit={onSubmit}>
        <div style={{ textAlign: 'center', margin: '2rem' }}>
          <Button
            size="large"
            htmlType="submit"
            className=""
            style={{
              marginTop: '-10px',
            }}
            onSubmit={onSubmit}
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreatePage;
