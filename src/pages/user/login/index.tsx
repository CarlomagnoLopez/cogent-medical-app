import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { Form, Alert, Checkbox, message } from 'antd';
import React, { useState } from 'react';
import { Link, history, useModel } from 'umi';
import { getPageQuery } from '@/utils/utils';
import SelectLang from '@/components/SelectLang';
import logo from '@/assets/noimage.png';
import { LoginParamsType, fakeAccountLogin } from '@/services/login';
import LoginFrom from './components/Login';
import Signup from '../../users/signup';
import styles from './style.less';
import { connect } from 'umi';
import OtpInput from 'react-otp-input';
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const Cognito = require('./../../../utils/Cognito.js');
const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginFrom;

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

/**
 * 此方法会跳转到 redirect 参数所在的位置
 */
const replaceGoto = () => {
  const urlParams = new URL(window.location.href);
  const params = getPageQuery();
  let { redirect } = params as { redirect: string };
  if (redirect) {
    const redirectUrlParams = new URL(redirect);
    if (redirectUrlParams.origin === urlParams.origin) {
      redirect = redirect.substr(urlParams.origin.length);
      if (redirect.match(/^\/.*#/)) {
        redirect = redirect.substr(redirect.indexOf('#') + 1);
      }
    } else {
      window.location.href = '/';
      return;
    }
  }
  history.replace(redirect || '/');
};

const Login: React.FC<{}> = ({ dispatch, login }) => {
  const [userLoginState, setUserLoginState] = useState<API.LoginStateType>({});
  const [submitting, setSubmitting] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpActive, setOtpActive] = useState(false);
  const [cogUser, setCognitoUser] = useState();
  const [thisC, setThisC] = useState();
  const [disableOpt, setDisableOpt] = useState(false);

  const { refresh } = useModel('@@initialState');

  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState<string>('account');

  const doLogin = async (email) => {
    dispatch({
      type: 'login/login',
      payload: {
        email: email,
      },
    });
  };

  const handleSubmit = async (values: LoginParamsType) => {
    setSubmitting(true);

    try {
      // login with cognitio

      var authenticationData = {
        Username: values.userName,
        Password: values.password,
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
        Username: values.userName, // your username here
        Pool: userPool,
      };
      var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
      // cogUser = 
      // setCognitoUser(new AmazonCognitoIdentity.CognitoUser(userData));


      // doLogin(values.userName);
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          // localStorage.setItem("currentAuth",result.idToken.payload["custom:role"]);
          /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer*/


          if (result.idToken.payload["custom:role"] === "User") {
            window.location.href = 'http://ec2-54-208-211-67.compute-1.amazonaws.com/php-medical-app/signin/?id=28';
          } else {
            var accessToken = result.getAccessToken().getJwtToken();
            var idToken = result.idToken.jwtToken;
            sessionStorage.setItem('accessToken', accessToken);
            let email = authenticationData.Username;
            let params = { email: email };
            doLogin(email);
          }

          //  router.push(`/welcome`);
        },
        onFailure: function (err) {
          if (err) {
            setOtp("");
            setDisableOpt(false);
            message.error(err.message);
          }
        },
        mfaRequired: function (codeDeliveryDetails) {
          setCognitoUser(cognitoUser);
          setThisC(this);
          setOtpActive(true);

          // var verificationCode = prompt('Please input verification code', '');
          // var verificationCode = otp;

          // if (verificationCode.length === 6) {
          //   cognitoUser.sendMFACode(otp, this);
          // }
          // if(ot){

          // }
          // cognitoUser.sendMFACode(verificationCode, this);
        },
        newPasswordRequired: function (userAttributes, requiredAttributes) {
          // User was signed up by an admin and must provide new
          // password and required attributes, if any, to complete
          // authentication.
          // userAttributes: object, which is the user's current profile. It will list all attributes that are associated with the user.
          // Required attributes according to schema, which don’t have any values yet, will have blank values.
          // requiredAttributes: list of attributes that must be set by the user along with new password to complete the sign-in.
          // Get these details and call
          // newPassword: password that user has given
          // attributesData: object with key as attribute name and value that the user has given.
          /*self.setState({
            visibleChangePassword: true,
            userData: userData,
            userAttributes: userAttributes,
          });*/
        },
      });

      /*const msg = await fakeAccountLogin({ ...values, type });
      if (msg.status === 'ok') {
        message.success('login success！');
        replaceGoto();
        setTimeout(() => {
          refresh();
        }, 0);
        return;
      }*/
      console.log(JSON.stringify(values));
      console.log(JSON.stringify(values));
      //      Cognito.loginCognito(values);
      //    setType('verify');
      // 如果失败去设置用户错误信息
      // setUserLoginState(msg);
    } catch (error) {
      console.log(JSON.stringify(error));
      message.error('please check ！' + error);
      //  replaceGoto();
    }
    setSubmitting(false);
  };

  const { status, type: loginType } = userLoginState;
  const link = () => {
    // var verifylink =
    var results = new RegExp('[?&]v=([^&#]*)').exec(window.location.href);
    if (results == null) {
      return null;
    } else {
      return decodeURI(results[1]) || 0;
    }
  };

  const requestVerify = (_scope, payload) => {
    _scope.dispatch({
      type: 'users/signUpDetail',
      payload: payload,
    });
  };

  const requestVerifyReset = (_scope, next) => {
    // _scope.dispatch({
    //   type: 'users/signUpDetail',
    //   payload: payload,
    // });

    // if(_scope.props.signupdetailstatus.data){
    //   _scope.setState({
    //     userid:_scope.props.signupdetailstatus.data.Items[0]["mcp-1-sk"].replace("user-", "")
    //   })
    // }
    let payload = '';
    if (next) {
      payload = next;
    }

    _scope.dispatch({ type: 'users/resetsignUpDetail', payload: payload });
  };

  const [form] = Form.useForm();
  const handleChangeOtp = (value) => {
    // let _otp = otp;
    // _otp += value;
    // console.log(_otp)
    setOtp(value)

    // setTimeout(() => {

    // }, 500);


  }
  if (otp.length === 6) {
    // cogUser.sendMFACode(otp);
    // cogUser.mfaRequired(() => {
    cogUser.sendMFACode(otp, thisC);
    setDisableOpt(true);
    setOtp("");
    // })
  }


  // console.log(link())
  return (
    <div className={styles.container}>
      {/* <div className={styles.lang}>
        <SelectLang />
      </div> */}
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            {/* <Link to="/"> */}
            <p>
              <img alt="logo" className={styles.logo} src={logo} />
            </p>

            {!link() && <span className={styles.title}>Login</span>}

            {link() && <span className={styles.title}>Signup</span>}

            {/* <span className={styles.title}>Login</span> */}
            {/* </Link> */}
          </div>
          <div className={styles.desc}></div>
        </div>
        {!link() && (
          <div className={styles.main}>
            <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
              <Tab key="account" tab="">
                {status === 'error' && loginType === 'account' && !submitting && (
                  <LoginMessage content="Account" />
                )}

                <UserName
                  name="userName"
                  placeholder="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter valid username!',
                    },
                  ]}
                />
                <Password
                  name="password"
                  placeholder="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter valid password!',
                    },
                  ]}
                />
                {otpActive &&
                  <OtpInput
                    isDisabled={disableOpt}
                    value={otp}
                    onChange={handleChangeOtp}
                    numInputs={6}
                    separator={<span> - </span>}
                    inputStyle={styles.inputOtp}
                    containerStyle={styles.containerOtp}
                  />

                }

              </Tab>
              <Tab key="verify" tab="">
                <Captcha
                  name="captcha"
                  placeholder="qqq4"
                  countDown={120}
                  getCaptchaButtonText=""
                  getCaptchaSecondText="秒"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter valid capcha',
                    },
                  ]}
                />
              </Tab>
              {/*   <Tab key="mobile" tab="Mobile">
            {status === 'error' && loginType === 'mobile' && !submitting && (
              <LoginMessage content="Mobile" />
            )}
            <Mobile
              name="mobile"
              placeholder="Mobile no"
              rules={[
                {
                  required: true,
                  message: 'Please enter valid mobile number!',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: 'Please enter 10 digit mobile number!',
                },
              ]}
            />
            <Captcha
              name="captcha"
              placeholder="qqq4"
              countDown={120}
              getCaptchaButtonText=""
              getCaptchaSecondText="秒"
              rules={[
                {
                  required: true,
                  message: 'Please enter valid capcha',
                },
              ]}
            />
            </Tab>*/}
              <div>
                {/* <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
              Remember me
            </Checkbox> */}
                {/* <a
                style={{
                  float: 'right',
                }}
                >
                  forget password
            </a> */}
              </div>
              <Submit loading={submitting} disabled={otpActive}>Log In</Submit>
              {/* <div className={styles.other}>
            <Link className={styles.register} to="/user/register">
              Register
            </Link>
          </div> */}
            </LoginFrom>
          </div>
        )}
        }
        {link() && (
          <Signup sendRequest={requestVerify} requestVerifyReset={requestVerifyReset}>
            {' '}
          </Signup>
        )}
      </div>
    </div>
  );
};

export default connect(({ login }) => ({
  login,
}))(Login);
