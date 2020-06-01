import React, { Component } from 'react';
import { Form, Input, InputNumber, Button, Card, Select, DatePicker, message, Spin, Steps, Result } from 'antd';
import styles from './style.less';
import { Link, history, useModel, connect } from 'umi';
import { SmileOutlined } from '@ant-design/icons';
import logo from '@/assets/logo.svg';
const { Option } = Select;
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const { Step } = Steps;
// const [form] = Form.useForm()
class SignUpUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // verifylink: 'ia7suJvF',
      verifylink: '',
      loading: false,
      signupCognito: true,
      userId: ""
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
    localStorage.setItem("current", "0")
    // const link = this.getUrlParam('verifylink');
    // this.setState({ verifylink: link });
  }

  changePsw = (values) => {
    let _scope = this;
    _scope.setState({
      signupCognito: false,
      loading: true
    }, (state, props) => {
      // login with cognitio

      var authenticationData = {
        Username: values.username,
        Password: values.pws,
      };

      var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
        authenticationData,
      );

      var poolData = {
        UserPoolId: ANT_DESIGN_PRO_USER_POOL_ID, // your user pool id here
        ClientId: ANT_DESIGN_PRO_CLIENT_ID, // your app client id here
      };
      // Create the User Pool Object
      var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
      var userData = {
        Username: values.username, // your username here
        Pool: userPool,
      };
      var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
      // doLogin(values.userName);
      cognitoUser.authenticateUser(authenticationDetails, {
        mfaRequired: function (codeDeliveryDetails) {
          var verificationCode = prompt('Please input verification code', '');
          cognitoUser.sendMFACode(verificationCode, this);
        },
        onSuccess: function (result) {
          console.log(result.getAccessToken().getJwtToken())

          let token = result.getAccessToken().getJwtToken();

          let values = {
            token: token,
            password: authenticationData.Password,
            newpassword: _scope.state.newpassword
          }
          _scope.props.requestVerifyReset(_scope.props);
          _scope.props.sendRequest(_scope.props, values);

          //  router.push(`/welcome`);
        },
        onFailure: function (err) {
          if (err) {
            // message.error(err.message);
          }
        }
      });
    })



  }


  onFinish = (values) => {

    console.log(values)
    console.log(this.props.signupdetailstatus)


    // let userId = this.props.signupdetailstatus.data.Items[0]["mcp-1-sk"].replace("user-", "")
    // let pk = this.props.signupdetailstatus.data.Items[0]["mcp-1-pk"].replace("mcp-org-","")
    values.userId = localStorage.getItem("userId")


    // values.pk = pk;
    this.setState({
      loading: true,
      newpassword: values.password
    });

    // let payload = {}
    // payload.verifylink = "1u6A5isN";
    this.props.sendRequest(this.props, values);


    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
    console.log(values);
    // this.getUrlParam('verifylink');
  }

  onValidate = (values) => {
    // if(values)

    this.setState({ loading: true });

    let payload = {}

    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
    this.props.sendRequest(this.props, values);
    console.log(values);
  };

  gotoLogIn = () => {
    location.href = "https://master.ddzfdvg3qoxoo.amplifyapp.com/user/login";
  }


  validatePassword = (rule, value) => {
    let psw = this.props.form.getFieldValue("password");

    // console.log(form)
    if (psw === value) {
      return false
    } else {
      return true
    }
  };

  render() {
    // let { current } = this.state;

    const layout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 12,
      },
    };

    const { form } = this.props

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

    const steps = [
      {
        title: 'User Verification',
        content: (< Form
          // form={this.props.form}

          {...layout}
          name="nest-messages"
          onFinish={this.onValidate}
          validateMessages={validateMessages}
        >

          <Form.Item
            name={'verifylink'}
            label="Code Verify"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button className={styles.stepsAction} type="primary"
              htmlType="submit"
            >
              Submit
          </Button>
          </Form.Item>
        </Form>),
      },
      {
        title: 'Complete data',
        content: (
          <Form
            {...layout}
            form={form}
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
              name={'family_name'}
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
              name={'password'}
              label="Password"
              rules={[
                {
                  required: true,
                  // type: "regexp",
                  // validator:this.validatePsw,
                  pattern: /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})+$/,
                  message: "Wrong format!"

                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name={'verifypassword'}
              label="Verify Password"
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('The two passwords that you entered do not match!');
                  },
                }),
                // { validator: this.validatePassword }
              ]}
            >
              <Input.Password />
            </Form.Item>
            {/* <Form.Item label="DOB" name="dob" rules={[{ required: true }]}>
              <DatePicker />
            </Form.Item> */}
            <Form.Item name={'address'} label="Address"
              rules={[
                {
                  required: true,
                },
              ]}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item name={'zipcode'} label="Zip Code">
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button className={styles.stepsAction}
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>),
      },
      {
        title: 'Complete!',
        content:
          (<Result
            icon={<SmileOutlined />}
            title="Great, we have done all the operations!"
            extra={<Button onClick={this.gotoLogIn} type="primary">Go to Log In </Button>}
          />
          ),
      },
    ];


    const { signupdetailstatus } = this.props;



    // if (signupdetailstatus.next) {
    //   console.log("true")
    //   this.next()

    // }
    // let current = 0; 
    if (signupdetailstatus.success === true) {


      if (signupdetailstatus.data) {

        this.props.requestVerifyReset(this.props, {});
        // this.next(1);
        //  let current = 1;
        localStorage.setItem("current", "1")
        localStorage.setItem("userId", this.props.signupdetailstatus.data.Items[0]["mcp-1-sk"].replace("user-", ""))
        // this.setState({
        //   userId: this.props.signupdetailstatus.data.Items[0]["mcp-1-sk"].replace("user-", "")
        // })


      }

      if (signupdetailstatus.updateUser) {
        if (this.state.signupCognito) {

          this.changePsw(signupdetailstatus.dateUser)
        }
      }

      if (signupdetailstatus.changePsw) {
        localStorage.setItem("current", "2")
        // message.success("Now you are a user for medial app.");
        // setTimeout(function () {
        //   location.href = "http://localhost:8000/user/login";
        // }, 2000)
      }


      // }
    }

    if (signupdetailstatus.success === false) {
      message.error(signupdetailstatus.err.message);
      // this.setState({loading:false})
      this.props.requestVerifyReset(this.props, {});

    }

    return (
      <Spin spinning={this.state.loading}>
        <div className={styles.content}>

          <div className={styles.wrapper}>

            <Card title="" bordered={false} className={styles.cardContent}>

              <Steps current={localStorage.getItem("current")}>
                {steps.map(item => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>

              <Card bordered={false}>
                <div className={styles.stepsContent}>{steps[1].content}</div>
                {/* <div className={styles.stepsContent}>{steps[localStorage.getItem("current")].content}</div> */}
              </Card>

              {/* <div className={styles.stepsAction}>
                {current < steps.length - 1 && (
                  <Button type="primary"
                  wrappedComponentRef=
                    onClick={() => this.next()}
                    htmlType="submit"
                  >
                    Next
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <Button type="primary" onClick={() => message.success('Processing complete!')}>
                    Done
                  </Button>
                )}
                {current > 0 && (
                  <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
                    Previous
                  </Button>
                )}
              </div> */}
            </Card>




          </div>

        </div>





        {/* <div className={styles.content}>



          {signupdetailstatus.success &&

          }
        </div> */}
      </Spin >
    );
  }
}
export default connect(({ users, loading }) => ({
  users,
  signupdetailstatus: users.signupdetailstatus,
  loading: loading.models.users,
}))(SignUpUser);
