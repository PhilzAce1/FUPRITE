import React, { useState, Fragment } from 'react';
import './profile.css';
import axios from 'axios';

function UploadBtn(props) {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [message, setMessage] = useState('');
  const setUploadedFile = props.setUploadedFile;

  const onSubmit = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('userId', props.userId);
    console.log(formData);
    try {
      const res = await axios.post('/api/users/uploadProfilePic', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const { filePath } = res.data;
      console.clear();
      // alert(filePath);
      setUploadedFile(`/${filePath}`);
      console.log(filePath);
    } catch (error) {
      if (error.response.status === 500) {
        setMessage('Internal server error');
      }
      setMessage('Unable to Upload please try again');
    }
  };
  return (
    <Fragment>
      <label class="custom-file-upload">
        <input type="file" accept="image/*" onChange={onSubmit} />
        Upload
      </label>
    </Fragment>
  );
}
export default UploadBtn;
