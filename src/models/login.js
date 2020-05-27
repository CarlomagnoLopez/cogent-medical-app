import { routerRedux } from 'dva/router';
import { stringify } from 'querystring';
import { loginUser, getFakeCaptcha, getDataUserByEmail } from '@/services/login';
//import { setAuthority } from '@/utils/authority';
import { router } from 'umi';
import { getPageQuery } from '@/utils/utils';
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *getDataUser({ payload }, { call }) {
      console.log(payload);
      const response = yield call(loginUser, payload);
    },

    *login({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(loginUser, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully
      console.log('***RESPONSE');
      console.log(response);

      if (response) {
        //   const urlParams = new URL(window.location.href);
        // const params = getPageQuery();
        //let { redirect } = params;

        // if (redirect) {
        //   const redirectUrlParams = new URL(redirect);

        //   if (redirectUrlParams.origin === urlParams.origin) {
        //     redirect = redirect.substr(urlParams.origin.length);

        //     if (redirect.match(/^\/.*#/)) {
        //       redirect = redirect.substr(redirect.indexOf('#') + 1);
        //     }
        //   } else {
        //     window.location.href = redirect;
        //     return;
        //   }
        // }
        // yield delay(3000);
        //yield put(routerRedux.replace( '/'));
        //yield put(routerRedux.push('/welcome'));
        localStorage.setItem('user', JSON.stringify(response));
        localStorage.setItem('userId', response.Username);
        localStorage.setItem('userName', response.Username);
        localStorage.setItem('email', response.email);
        // localStorage.setItem('companyId',        response.companies.companyId);
        //localStorage.setItem('companyName',      response.custom_company_name);
        // localStorage.setItem('group',            response.custom_group.split(' ').join('_'));
        //localStorage.setItem('currentAuthority', response.custom_currentAuthority);
        // localStorage.setItem('company_website',  response.custom_company_website);

        window.location.href = '/welcome';
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      const { redirect } = getPageQuery(); // redirect
      if (window.location.pathname !== '/user/login' && !redirect) {
        localStorage.clear();
        window.location.href = '/user/login';
        // yield put(
        //   routerRedux.replace({
        //     pathname: '/user/login',
        //     search: stringify({
        //       redirect: window.location.href,
        //     }),
        //   }),
        // );
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      console.log(payload);
      //  setAuthority(payload.currentAuthority);
      // setAuthority(payload.custom_currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
