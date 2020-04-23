import React from 'react';
import { ThemeSelectorContext } from '../Theme/theme';
import { Select, Button } from 'antd';

const { Option } = Select;

function More(props) {
  const { toggleTheme } = React.useContext(ThemeSelectorContext);

  return (
    <div
      style={{
        height: '40vh',
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'space-around',
        // paddingBottom: '10vh',
        // alignContent: 'space-around',
      }}
    >
      <div
        style={{
          fontSize: '1.2rem',
        }}
      >
        Change Your Theme :{' '}
        <Select
          name="Theme Selector"
          style={{ width: '100px' }}
          onChange={(e) => {
            toggleTheme(e);
            return props.handleCancle();
          }}
        >
          <Option value="dark">Dark Theme</Option>
          <Option value="light">Light Theme</Option>
          <Option value="twitterDim">Twitter Dim Theme</Option>
          <Option value="twitterLightOut">Twitter LightOut Theme</Option>
        </Select>
      </div>
      <hr />
      <div>
        <div
          style={{
            fontSize: '1.2rem',
            marginBottom: '20px',
          }}
        >
          {' '}
          List{' '}
        </div>
        <div>
          <Button type="primary">Create List</Button>{' '}
          <Button type="primary">Check List</Button>
        </div>
      </div>
      <hr />
      <div>
        <div
          style={{
            fontSize: '1.2rem',
            marginBottom: '20px',
          }}
        >
          {' '}
          BookMarks{' '}
        </div>
        <div>
          <Button type="primary">Check BookMark</Button>{' '}
        </div>
      </div>
      <hr />
      <div>
        <div
          style={{
            fontSize: '1.2rem',
            marginBottom: '20px',
          }}
        >
          PassWord Setting
        </div>
        <div>
          <Button type="primary">Change PassWord</Button>{' '}
        </div>
      </div>
    </div>
  );
}
export default More;
