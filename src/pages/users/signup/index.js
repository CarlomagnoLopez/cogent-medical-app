import React, { Component } from 'react';
import { Form, Input, InputNumber, Button, Card, Select, DatePicker } from 'antd';
import styles from './style.less';
import { Link, history, useModel } from 'umi';
import logo from '@/assets/logo.svg';
const { Option } = Select;

export default class SignUpUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onFinish = (values) => {
    console.log(values);
  };

  render() {
    const layout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 12,
      },
    };
    const validateMessages = {
      required: '${label} is required!',
      types: {
        email: '${label} is not validate email!',
        number: '${label} is not a validate number!',
      },
      number: {
        range: '${label} must be between ${min} and ${max}',
      },
    };

    return (
      <Card>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>Signup</span>
              </Link>
            </div>
            <div className={styles.desc}>Signup</div>
          </div>

          <Form
            {...layout}
            name="nest-messages"
            onFinish={this.onFinish}
            validateMessages={validateMessages}
          >
            {/*<Form.Item name="role" label="Select Role" rules={[{ required: true }]}>
              <Select placeholder="Select a role" allowClear>
                <Option value="patient">patient</Option>
                <Option value="doctor">doctor</Option>
                <Option value="nurse">nurse</Option>
              </Select>
            </Form.Item>*/}
            <Form.Item
              name={['user', 'name']}
              label="Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={['user', 'lastname']}
              label="Last Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item label="DOB" name="dob" rules={[{ required: true }]}>
              <DatePicker />
            </Form.Item>
            <Form.Item
              name={['user', 'email']}
              label="Email"
              rules={[
                {
                  type: 'email',
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={['user', 'phoneNumber']}
              label="phoneNumber"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name={['user', 'address']} label="Address">
              <Input.TextArea />
            </Form.Item>
            <Form.Item name={'zipcode'} label="Zip Code">
              <Input />
            </Form.Item>

            <Form.Item name={'secretcode'} label="Secret Code">
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    );
  }
}
