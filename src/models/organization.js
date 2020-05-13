import { generateOrgnization, generateOrgAdmin, getAllOrgAdmins } from '@/services/Organization';

import { router } from 'umi';
import { getPageQuery } from '@/utils/utils';

export default {
  namespance: 'organization',

  state: {
    status: [],
    loading: false,
    statusorgadmincreation: [],
    orgadmins: [],
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
      return { ...state, orgadmins: action.payload.body.Items };
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
  },
};
