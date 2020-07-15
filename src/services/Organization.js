import request from '@/utils/request';

import { stringify } from 'qs';

export async function generateOrgnization(payload) {
  console.log('API Called');
  // return request(REACT_APP_ENV + `/saveorg`, {
  return request(END_POINT_MYSQL + `/integration/main.php`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}
export async function signUpDetails(payload) {
  console.log('API Called');
  return request(REACT_APP_ENV + `/users/signupdetails`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function approveUser(payload) {
  console.log('API Called');
  return request(REACT_APP_ENV + `/users/approve`, {
    method: 'POST',
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
export async function deleteOrg(payload) {
  console.log('Del Orf API Called');
  return request(REACT_APP_ENV + `/org`, {
    method: 'DELETE',
    body: JSON.stringify(payload),
  });
}
export async function getOrgByUser(payload) {
  console.log('API Called');
  return request(REACT_APP_ENV + `/orgbyuser?userid=${payload.userid}`);
}

export async function getUsersByOrgId(payload) {
  console.log('API Called');
  return request(REACT_APP_ENV + `/users/userbyorg?orgid=${payload.orgid}&role=${payload.role}`);
}

export async function getAllApprovalNeededUsers(payload) {
  console.log('API Called');
  if (payload.orgid != undefined)
    return request(REACT_APP_ENV + `/users/approvalneededusers?orgid=${payload.orgid}`);
  else return request(REACT_APP_ENV + `/users/approvalneededusers`);
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
  // return request(REACT_APP_ENV + '/org/all');
  return request(END_POINT_MYSQL + `/integration/orgall.php`, {
    headers: {
      'Access-Control-Allow-Origin': "*"
    }
  })

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
