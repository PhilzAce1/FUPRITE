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
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('');
  const [college, setCollege] = useState('');
  const [date, setDate] = useState('');
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
          onSubmit={() => {
            alert('Hey i am PhIlemon');
          }}
        >
          <Form.Item label="Fullname">
            <Input onChange={(e) => setName(e.target.value)} value={name} />
          </Form.Item>
          <Form.Item name={['user', 'introduction']} label="Description">
            <Input.TextArea maxLength={150} />
          </Form.Item>
          <Form.Item label="Level">
            <Select name="level">
              <Select.Option
                onChange={(e) => setLevel(e.target.value)}
                value="100"
              >
                100
              </Select.Option>
              <Select.Option
                onChange={(e) => setLevel(e.target.value)}
                value="200"
              >
                200
              </Select.Option>
              <Select.Option
                onChange={(e) => setLevel(e.target.value)}
                value="300"
              >
                300
              </Select.Option>
              <Select.Option
                onChange={(e) => setLevel(e.target.value)}
                value="400"
              >
                400
              </Select.Option>
              <Select.Option
                onChange={(e) => setLevel(e.target.value)}
                value="500"
              >
                500
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="College"
            onChange={(e) => setCollege(e.target.value)}
            value={college}
          >
            <TreeSelect
              value={college}
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
            <DatePicker
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
          </Form.Item>

          <Form.Item>
            <Button onClick={() => alert(name, level, college)}>Submit</Button>
          </Form.Item>
        </Form>
      </div>
    </Fragment>
  );
};
export default EditProfile;
