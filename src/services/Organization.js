import request from '@/utils/request';

import { stringify } from 'qs';

export async function generateOrgnization(payload) {
  console.log('API Called');
  return request(REACT_APP_ENV + `/saveorg`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}
export async function deleteUser(payload) {
  console.log('API Called');
  return request(REACT_APP_ENV + `/users`, {
    method: 'DELETE',
    body: JSON.stringify(payload),
  });
}

export async function getAllOrgAdminApprovals(payload) {
  console.log('API Called');
  return request(REACT_APP_ENV + `/users/orgadminsapprovals`);
}
export async function getAllUsers(payload) {
  console.log('API Called');
  return request(REACT_APP_ENV + `/users/all`);
}

export async function getAllOrganizations() {
  return request(REACT_APP_ENV + '/org/all');
}
export async function generateOrgAdmin(payload) {
  return request(REACT_APP_ENV + '/org/orgadmin', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}
export async function updateOrgDetails(payload) {
  return request(REACT_APP_ENV + '/org/update', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
export async function updateUserDetails(payload) {
  return request(REACT_APP_ENV + '/org/orgadmin/update', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getAllOrgAdmins() {
  return request(REACT_APP_ENV + '/org/orgadmin/all');
}
