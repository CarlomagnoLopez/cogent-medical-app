import React, { Component } from 'react';
import { Form, Input, InputNumber, Button, Card, Select, DatePicker, message, Spin } from 'antd';
import styles from './style.less';
import { Link, history, useModel, connect } from 'umi';
import logo from '@/assets/logo.svg';
const { Option } = Select;

class SignUpUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verifylink: 'ia7suJvF',
      loading: false,
    };
  }

  getUrlParam = (param) => {
    var results = new RegExp('[?&]' + param + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
      return null;
    } else {
      return decodeURI(results[1]) || 0;
    }
  };

  componentWillMount() {
    const link = this.getUrlParam('verifylink');
    // this.setState({ verifylink: link });
  }

  onFinish = (values) => {
    this.setState({ loading: true });
    values.verifylink = this.state.verifylink;
    this.props.dispatch({
      type: 'users/signUpDetail',
      payload: values,
    });

    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
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

    const { signupdetailstatus } = this.props;

    if (signupdetailstatus.success === true) {
      if (signupdetailstatus.approved != undefined && signupdetailstatus.approved === true) {
        message.success('User Updated and Approved!');
      } else {
        message.success('User Updated and you have to wait till you get approved by admin!');
      }
      this.props.dispatch({ type: 'users/resetsignUpDetail', payload: '' });

      history.go('/user/login');
    }

    if (signupdetailstatus.success === false) {
      message.error(signupdetailstatus.err.message);
      this.props.dispatch({ type: 'users/resetsignUpDetail', payload: '' });
    }

    return (
      <Spin spinning={this.state.loading}>
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
              <Form.Item
                name={'name'}
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
                name={'lname'}
                label="Last Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="DOB" name="dob" rules={[{ required: true }]}>
                <DatePicker />
              </Form.Item>
              <Form.Item
                name={'email'}
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
                name={'phoneNumber'}
                label="phoneNumber"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item name={'address'} label="Address">
                <Input.TextArea />
              </Form.Item>
              <Form.Item name={'pincode'} label="Zip Code">
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
      </Spin>
    );
  }
}
export default connect(({ users, loading }) => ({
  users,
  signupdetailstatus: users.signupdetailstatus,
  loading: loading.models.users,
}))(SignUpUser);
