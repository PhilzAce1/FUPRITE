import React, { useState, Fragment, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  TreeSelect,
  message,
} from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';

const EditProfile = (props) => {
  const { userData } = useSelector((state) => state.user);
  const userId = { ...userData }._id;
  const newUser = props.user[0];
  return (
    <Fragment>
      {/* <div className='component_header'> </div> */}
      <Formik
        initialValues={{
          name: newUser.name,
          description: newUser.description,
          level: newUser.level,
          department: newUser.department,
          date: '',
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            let dataToSubmit = {
              name: values.name,
              description: values.description,
              level: values.level,
              department: values.department,
              date: values.date,
            };
            // return alert(dataToSubmit.date);
            axios
              .patch('/api/users/updateprofile', {
                dataToSubmit,
                userId,
              })
              .then((res) => {
                if (res.data.success === true) {
                  message.success('Edited Successfully');
                  props.handleCancel();
                } else {
                  message.error('There was an Error');
                }
              })
              .catch((e) => message.error('Server Error'));
            setSubmitting(false);
          }, 500);
        }}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            setFieldTouched,
          } = props;
          return (
            <div style={{ padding: '0' }}>
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
                onSubmit={handleSubmit}
              >
                <Form.Item label="Fullname">
                  <Input
                    onChange={handleChange}
                    value={values.name}
                    id="name"
                    name="name"
                    onBlur={handleBlur}
                  />
                </Form.Item>
                <Form.Item name={['user', 'introduction']} label="Description">
                  <Input.TextArea
                    maxLength={150}
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>

                <Form.Item label="Level">
                  <MySelect value={values.level} onChange={setFieldValue} />
                </Form.Item>
                <Form.Item label="department  ">
                  <MyTreeSelect
                    value={values.department}
                    onChange={setFieldValue}
                  />
                </Form.Item>

                <Form.Item label="DatePicker">
                  <MyDate value={values.date} onChange={setFieldValue} />
                </Form.Item>

                <Form.Item>
                  <Button onClick={handleSubmit}>Submit</Button>
                </Form.Item>
              </Form>
            </div>
          );
        }}
      </Formik>
    </Fragment>
  );
};

class MyDate extends React.Component {
  handleChange = (value) => {
    // this is going to call setFieldValue and manually update values.topcis
    this.props.onChange('date', value);
  };
  render() {
    return (
      <Fragment>
        <DatePicker
          onChange={this.handleChange}
          value={this.props.value}
          name="date"
          id="date"
        />
      </Fragment>
    );
  }
}
class MySelect extends React.Component {
  handleChange = (value) => {
    // this is going to call setFieldValue and manually update values.topcis
    this.props.onChange('level', value);
  };
  render() {
    return (
      <Fragment>
        <Select
          name="level"
          onChange={this.handleChange}
          value={this.props.value}
        >
          <Select.Option value="100">100</Select.Option>
          <Select.Option value="200">200</Select.Option>
          <Select.Option value="300">300</Select.Option>
          <Select.Option value="400">400</Select.Option>
          <Select.Option value="500">500</Select.Option>
        </Select>
      </Fragment>
    );
  }
}

class MyTreeSelect extends React.Component {
  handleChange = (value) => {
    // this is going to call setFieldValue and manually update values.topcis
    this.props.onChange('department', value);
  };
  render() {
    return (
      <Fragment>
        <TreeSelect
          name="department"
          onChange={this.handleChange}
          value={this.props.value}
          id="department"
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
      </Fragment>
    );
  }
}

export default EditProfile;
