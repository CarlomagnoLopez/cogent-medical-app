import { request } from 'umi';

export async function query() {
  return request<API.CurrentUser[]>('/api/users');
}

export async function queryCurrent(email) {
  return request<API.CurrentUser>(REACT_APP_ENV + `/users/currentuser?email=${email}`);
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
