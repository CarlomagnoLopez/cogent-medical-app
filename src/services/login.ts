import { request } from 'umi';

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
  type: string;
}

export interface LoginUserType {
  email: String;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request<API.LoginStateType>(REACT_APP_ENV + '/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function loginUser(params: LoginUserType) {
  return request(`/api/users/currentuser?email=${params.email}`);
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function outLogin() {
  return request('/api/login/outLogin');
}
