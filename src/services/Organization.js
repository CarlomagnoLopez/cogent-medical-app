import request from '@/utils/request';

import { stringify } from 'qs';

export async function generateOrgnization(payload) {
  console.log('API Called');
  return request(REACT_APP_ENV + `/saveorg`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function getOrganizations() {
  return request('/api/login/outLogin');
}
