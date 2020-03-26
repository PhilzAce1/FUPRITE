import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import axios from 'axios';
function FollowBtn(props) {
  const userTo = props.userTo;
  const userFrom = props.userFrom;
  const [followerNumber, setFollowerNumber] = useState(0);
  const [following, setFollowing] = useState(false);
  const onFollow = e => {
    e.preventDefault();
    let followVariable = {
      userTo: userTo,
      userFrom: userFrom
    };

    if (following) {
      //when we are already following
      axios.post('/api/follow/unFollow', followVariable).then(response => {
        if (response.data.success) {
          setFollowerNumber(followerNumber - 1);
          setFollowing(!following);
        } else {
          alert('Failed to unsubscribe');
        }
      });
    } else {
      // when we are not following yet

      axios.post('/api/follow/follow', followVariable).then(response => {
        if (response.data.success) {
          setFollowerNumber(followerNumber + 1);
          setFollowing(!following);
        } else {
          alert('Failed to follow');
        }
      });
    }
  };

  useEffect(() => {
    const followNumberVariables = { userTo: userTo, userFrom: userFrom };
    axios
      .post('/api/follow/followersNumber', followNumberVariables)
      .then(response => {
        if (response.data.success) {
          setFollowerNumber(response.data.followNumber);
        } else {
          alert('Failed to get followr Number');
        }
      });

    axios
      .post('/api/follow/following', followNumberVariables)
      .then(response => {
        if (response.data.success) {
          setFollowing(response.data.subcribed);
        } else {
          alert('Failed to get followd Information');
        }
      });
  }, []);
  return (
    <div>
      <Button
        onClick={onFollow}
        style={{
          backgroundColor: `${following ? '#AAAAAA' : '#1DA1F2'}`,
          borderRadius: '20px',
          color: 'white',
          padding: '5px 16px',
          fontWeight: '100',
          fontSize: '1rem',
          outline: 'none'
          // textTransform: 'uppercase'
        }}
      >
        {followerNumber} {following ? 'following' : 'follow'}
      </Button>
    </div>
  );
}

export default FollowBtn;
