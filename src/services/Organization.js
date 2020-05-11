import { request } from 'umi';
import { stringify } from 'qs';

export async function generateOrgnization(payload) {
  return request(REACT_APP_ENV + `/saveorg`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function getOrganizations() {
  return request('/api/login/outLogin');
}
