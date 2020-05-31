import { getAllApprovalNeededUsers, approveUser, signUpDetails } from '@/services/Organization';

import { router } from 'umi';
import { getPageQuery } from '@/utils/utils';

export default {
  namespance: 'users',

  state: {
    status: [],
    loading: false,
    userslist: [],
    approveuserstatus: '',
    signupdetailstatus: {
      next:false,
      loading:false
    },
  },
  reducers: {
    getUsersList(state, action) {
      return { ...state, userslist: action.payload, approveuserstatus: '' };
    },
    approveUserStatus(state, action) {
      return { ...state, approveuserstatus: action.payload };
    },
    resetApproveUserStatus(state, action) {
      return { ...state, approveuserstatus: '' };
    },
    signUpDetailsStatus(state, action) {
      return { ...state, signupdetailstatus: action.payload.body };
    },
    resetsignUpDetailsStatus(state, action) {
      return { ...state, signupdetailstatus: action.payload };
    },
  },
  effects: {
    *getApprovalUsersList({ payload }, { call, put }) {
      const res = yield call(getAllApprovalNeededUsers, payload);

      yield put(
        {
          type: 'getUsersList',
          payload: res,
        },
        {
          type: 'approveUserStatus',
          payload: '',
        },
      );
    },

    *approveUserS({ payload }, { call, put }) {
      const res = yield call(approveUser, payload);
      yield put({ type: 'approveUserStatus', payload: res });
    },
    *signUpDetail({ payload }, { call, put }) {
      const res = yield call(signUpDetails, payload);
      yield put({
        type: 'signUpDetailsStatus',
        payload: res,
      });
    },
    *resetsignUpDetail({ payload }, { call, put }) {
      yield put({
        type: 'resetsignUpDetailsStatus',
        payload: payload,
      });
    },
  },
};
