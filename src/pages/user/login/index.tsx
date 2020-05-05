import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { Alert, Checkbox, message } from 'antd';
import React, { useState } from 'react';
import { Link, history, useModel } from 'umi';
import { getPageQuery } from '@/utils/utils';
import SelectLang from '@/components/SelectLang';
import logo from '@/assets/logo.svg';
import { LoginParamsType, fakeAccountLogin } from '@/services/login';
import LoginFrom from './components/Login';
import styles from './style.less';
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

const Login: React.FC<{}> = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginStateType>({});
  const [submitting, setSubmitting] = useState(false);

  const { refresh } = useModel('@@initialState');
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState<string>('account');

  const handleSubmit = async (values: LoginParamsType) => {
    setSubmitting(true);

    try {
      // login with cognitio

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
      //      Cognito.loginCognito(values);
      //    setType('verify');
      // 如果失败去设置用户错误信息
      // setUserLoginState(msg);
    } catch (error) {
      //  message.error('please check ！');
      replaceGoto();
    }
    setSubmitting(false);
  };

  const { status, type: loginType } = userLoginState;

  return (
    <div className={styles.container}>
      <div className={styles.lang}>
        <SelectLang />
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src={logo} />
              <span className={styles.title}>Login</span>
            </Link>
          </div>
          <div className={styles.desc}>Login</div>
        </div>

        <div className={styles.main}>
          <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
            <Tab key="account" tab="Account">
              {status === 'error' && loginType === 'account' && !submitting && (
                <LoginMessage content="Account" />
              )}

              <UserName
                name="userName"
                placeholder="username"
                rules={[
                  {
                    required: true,
                    message: 'please enter valid username!',
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
              <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
                Remember me
              </Checkbox>
              <a
                style={{
                  float: 'right',
                }}
              >
                forget password
              </a>
            </div>
            <Submit loading={submitting}>Submit</Submit>
            <div className={styles.other}>
              <Link className={styles.register} to="/user/register">
                Register
              </Link>
            </div>
          </LoginFrom>
        </div>
      </div>
    </div>
  );
};

export default Login;
