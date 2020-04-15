import React, { useState, Fragment } from 'react';
import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from 'antd';

const EditProfile = () => {
  const [componentSize, setComponentSize] = useState('small');

  return (
    <Fragment>
      {/* <div className='component_header'> </div> */}
      <div style={{ padding: '20px' }}>
        <Form
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 16,
          }}
          layout="horizontal"
          initialValues={{
            size: 24,
          }}
          size={24}
        >
          <Form.Item label="Fullname">
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'introduction']} label="Introduction">
            <Input.TextArea maxLength={150} />
          </Form.Item>
          <Form.Item label="Level">
            <Select>
              <Select.Option value="100">100</Select.Option>
              <Select.Option value="200">200</Select.Option>
              <Select.Option value="300">300</Select.Option>
              <Select.Option value="400">400</Select.Option>
              <Select.Option value="500">500</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="College">
            <TreeSelect
              treeData={[
                {
                  title: 'Engineering',
                  value: 'engineering',
                  children: [
                    {
                      title: 'Electrical Engineering',
                      value: 'elect',
                    },
                    {
                      title: 'Marine Engineering',
                      value: 'marine',
                    },
                    {
                      title: 'Chemical Engineering',
                      value: 'chem',
                    },
                    {
                      title: 'Mechanical Engineering',
                      value: 'mech',
                    },
                    {
                      title: 'Petroleum Engineering',
                      value: 'pet',
                    },
                  ],
                },
                {
                  title: 'Science',
                  value: 'science',
                  children: [
                    {
                      title: 'Computer Science',
                      value: 'comp',
                    },
                    {
                      title: 'Earth Science',
                      value: 'es',
                    },
                    {
                      title: 'Mathematics',
                      value: 'maths',
                    },
                    {
                      title: 'Physics',
                      value: 'physics',
                    },
                    {
                      title: 'Others',
                      value: 'Others',
                    },
                  ],
                },
              ]}
            />
          </Form.Item>

          <Form.Item label="DatePicker">
            <DatePicker />
          </Form.Item>

          <Form.Item label="Switch">
            <Switch />
          </Form.Item>
          <Form.Item label="Button">
            <Button>Button</Button>
          </Form.Item>
        </Form>
      </div>
    </Fragment>
  );
};
export default EditProfile;
