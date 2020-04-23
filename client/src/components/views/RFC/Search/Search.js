import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { AutoComplete, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import Follower from '../FollowerBtn/Follower';
import { useSelector } from 'react-redux';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';
const { TextArea } = Input;
function Search(props) {
  const [value, setValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [modal, setModal] = useState(false);
  const userx = useSelector((state) => state.user.userData);

  const handleChange = (e) => {
    setValue(e.currentTarget.value);
    axios({
      method: 'GET',
      url: `/api/users/search`,
      params: {
        search: e.target.value,
      },
    }).then((response) => {
      if (response.data.success) {
        if (response.data.users.length > 0) {
          setModal(true);
          setSearchResult(response.data.users);
        } else {
          setSearchResult([]);
          setModal(false);
        }
      } else {
        alert('could not search for a user');
      }
    });
  };

  const handleBlur = (e) => {
    return setModal(false);
  };
  const complete = searchResult.map((user) => (
    <div className="user" key={user._id}>
      <Avatar src={user.image} size={50} />
      <div className="user_details">
        <div
          className="name"
          style={{
            fontSize: '1em',
            display: 'flex',
            flexFlow: 'row nowrap',
            textTransform: 'capitalize',
          }}
        >
          {user.name}
        </div>
        <div className="username">{user.username}</div>
      </div>
      <Follower userTo={user._id} userFrom={{ ...userx }._id} />
    </div>
  ));
  console.log(searchResult);
  return (
    <div className="header">
      <input
        className="search_input"
        placeholder="Search FuprePeeps"
        onChange={handleChange}
        // onBlur={handleBlur}
      />

      {modal && <div className="modal">{complete}</div>}
    </div>
  );
}
export default Search;
