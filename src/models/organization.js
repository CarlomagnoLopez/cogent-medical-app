import {
  generateOrgnization,
  generateOrgAdmin,
  getAllOrgAdmins,
  getAllOrganizations,
  getAllUsers,
  deleteUser,
  getAllOrgAdminApprovals,
  updateOrgDetails,
  updateUserDetails,
  deleteOrg,
  getOrgByUser,
  getUsersByOrgId,
} from '@/services/Organization';

import { router } from 'umi';
import { getPageQuery } from '@/utils/utils';

export default {
  namespance: 'organization',

  state: {
    status: [],
    loading: false,
    statusorgadmincreation: [],
    orgadmins: [],
    orgslist: [],
    userslist: [],
    deleteuserstatus: '',
    orgadminsapprovalslist: [],
    updateorgdetailsstatus: '',
    updateuserstatus: '',
    deleteorgstatus: '',
    orgdetail: '',
  },
  reducers: {
    organizationCreationStatus(state, action) {
      console.log(action);
      //  setAuthority(payload.currentAuthority);
      // setAuthority(payload.custom_currentAuthority);
      console.log('Response ' + JSON.stringify(action));
      return { ...state, status: action.payload };
    },
    resetOrganizationStatus(state, action) {
      return { ...state, status: {}, deleteorgstatus: '' };
    },
    generateOrgAdminStatus(state, action) {
      return { ...state, statusorgadmincreation: action.payload };
    },
    getAllOrgAdminDetails(state, action) {
      return { ...state, orgadmins: action.payload.body };
    },
    getAllOrganizationsData(state, action) {
      console.log('Response ' + JSON.stringify(action));
      if (action.payload.message === "data")

        return { ...state, orgslist: action.payload.data };
      else
        return {
          ...state,
          orgslist: [],
          statusorgadmincreation: '',
          deleteorgstatus: '',
          status: '',
        };
    },
    getAllUsersData(state, action) {
      return {
        ...state,
        userslist: action.payload.data,
        statusorgadmincreation: '',
        deleteuserstatus: '',
        orgdetail: '',
        orgsusers: [],
      };
    },
    resetStatusInfo(state, action) {
      return { ...state, statusorgadmincreation: [], deleteuserstatus: '' };
    },
    deleteUserStatus(state, action) {
      return { ...state, deleteuserstatus: action.payload };
    },
    resetDeleteUserStatusData(state, action) {
      return { ...state, deleteuserstatus: '' };
    },
    getOrgsAdminApprovalsData(state, action) {
      console.log('Respins ' + JSON.stringify(action));
      return { ...state, orgadminsapprovalslist: action.payload.body };
    },
    updateOrgDeatailsStatus(state, action) {
      return { ...state, updateorgdetailsstatus: action.payload };
    },
    resetUpdateOrgDeatailsStatus(state, action) {
      return { ...state, updateorgdetailsstatus: '' };
    },
    updateUserDetailsStatus(state, action) {
      return { ...state, updateuserstatus: action.payload };
    },
    resetUpdateUserDetailsStatus(state, action) {
      return { ...state, updateuserstatus: '' };
    },
    deleteOrgStatusU(state, action) {
      return { ...state, deleteorgstatus: action.payload };
    },
    getOrgDetails(state, action) {
      if (action.payload.success) {
        localStorage.setItem('orgname', action.payload.data.Item.orgname.split(' ').join(''));

        return { ...state, orgdetail: action.payload.data.Item };
      } else return { ...state, orgdetail: '' };
    },

    getUsersByOrg(state, action) {
      if (action.payload.body != undefined) {
        return {
          ...state,
          orgsusers: action.payload.body,
          statusorgadmincreation: '',
          deleteorgstatus: '',
        };
      } else {
        return {
          ...state,
          orgsusers: action.payload,
          statusorgadmincreation: '',
          deleteorgstatus: '',
        };
      }
    },
  },
  effects: {
    *createOrganization({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(generateOrgnization, payload);
      console.log('***RESPONSE');
      console.log(JSON.stringify(response));

      yield put({
        type: 'organizationCreationStatus',
        payload: response,
      }); // Login successfully
    },
    *generateOrgUser({ payload }, { call, put }) {
      const response = yield call(generateOrgAdmin, payload);

      yield put({
        type: 'generateOrgAdminStatus',
        payload: response,
      });
    },
    *resetOrganizationStatusA({ payload }, { call, put }) {
      yield put({
        type: 'resetOrganizationStatus',
        payload: payload,
      });
    },
    *getAllOrgAdmins({ payload }, { call, put }) {
      const response = yield call(getAllOrgAdmins, payload);
      yield put({
        type: 'getAllOrgAdminDetails',
        payload: response,
      });
    },
    *getAllUser({ payload }, { call, put }) {
      console.log('Users Data Start');
      const response = yield call(getAllUsers, payload);
      console.log('Users Data End ' + JSON.stringify(response));
      yield put({
        type: 'getAllUsersData',
        payload: response,
      });
    },
    *getAllOrgs({ payload }, { call, put }) {
      const response = yield call(getAllOrganizations, payload);
      yield put({
        type: 'getAllOrganizationsData',
        payload: response,
      });
    },
    *resetStatus({ payload }, { call, put }) {
      yield put({
        type: 'resetStatusInfo',
        payload: [],
      });
    },

    *deleteUser({ payload }, { call, put }) {
      console.log('Calling Delete API');
      const response = yield call(deleteUser, payload);
      console.log('Calling Delete API Response ' + JSON.stringify(response));

      yield put({
        type: 'deleteUserStatus',
        payload: response,
      });
    },
    *resetDeleteUserStatus({ payload }, { call, put }) {
      yield put({
        type: 'resetDeleteUserStatusData',
        payload: [],
      });
    },
    *getOrgsAdminApprovals({ payload }, { call, put }) {
      const res = yield call(getAllOrgAdminApprovals, payload);
      yield put({
        type: 'getOrgsAdminApprovalsData',
        payload: res,
      });
    },
    *updateOrgDetails({ payload }, { call, put }) {
      const res = yield call(updateOrgDetails, payload);

      console.log("mensaje")
      yield put({
        type: 'updateOrgDeatailsStatus',
        payload: res,
      });
    },
    *resetUpdateOrgDeatailsStat({ payload }, { call, put }) {
      yield put({
        type: 'resetUpdateOrgDeatailsStatus',
        payload: [],
      });
    },
    *updateUserDetails({ payload }, { put, call }) {
      const res = yield call(updateUserDetails, payload);
      yield put({
        type: 'updateUserDetailsStatus',
        payload: res,
      });
    },
    *resetUserUpdateStat({ payload }, { call, put }) {
      yield put({
        type: 'resetUpdateUserDetailsStatus',
        payload: [],
      });
    },
    *deleteOrganization({ payload }, { call, put }) {
      const res = yield call(deleteOrg, payload);
      yield put({
        type: 'deleteOrgStatusU',
        payload: res,
      });
    },
    *resetDelOrgStatus({ payload }, { call, put }) {
      yield put({
        type: 'resetOrganizationStatus',
        payload: '',
      });
    },
    *getOrganizationByUserId({ payload }, { call, put }) {
      const res = yield call(getOrgByUser, payload);
      yield put({
        type: 'getOrgDetails',
        payload: res,
      });
    },

    *getUsersByOrgs({ payload }, { call, put }) {
      const res = yield call(getUsersByOrgId, payload);
      yield put({
        type: 'getUsersByOrg',
        payload: res,
      });
    },
  },
};
