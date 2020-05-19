import {
  generateOrgnization,
  generateOrgAdmin,
  getAllOrgAdmins,
  getAllOrganizations,
  getAllUsers,
  deleteUser,
  getAllOrgAdminApprovals,
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
      return { ...state, status: [] };
    },
    generateOrgAdminStatus(state, action) {
      return { ...state, statusorgadmincreation: action.payload };
    },
    getAllOrgAdminDetails(state, action) {
      return { ...state, orgadmins: action.payload.body };
    },
    getAllOrganizationsData(state, action) {
      console.log('Response ' + JSON.stringify(action));
      if (action.payload.body != undefined)
        return { ...state, orgslist: action.payload.body.Items };
      else return { ...state, orgslist: [] };
    },
    getAllUsersData(state, action) {
      return {
        ...state,
        userslist: action.payload.body,
        statusorgadmincreation: '',
        deleteuserstatus: '',
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
  },
  effects: {
    *createOrganization({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(generateOrgnization, payload);
      console.log('***RESPONSE');
      /*  const response = {
        success: false,
        sigUpUser: false,
        log: {
          message: 'Invalid phone number format.',
          code: 'InvalidParameterException',
          time: '2020-05-12T17:51:15.670Z',
          requestId: '8ecfdd4f-8bc2-4eba-9db8-482a8d640ece',
          statusCode: 400,
          retryable: false,
          retryDelay: 10.433583803727299,
        },
      };
      */
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
  },
};
