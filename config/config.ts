// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    name: 'Ant Design Pro',
    locale: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      layout: false,
      routes: [
        {
          name: 'login',
          path: '/user/login',
          layout: false,
          component: './user/login',
        },
      ],
    },

    {
      path: '/welcome',
      name: 'Create an Organization',
      icon: 'smile',
      component: './org/orgs',
    },
    {
      path: '/admincreate',
      name: 'Create Organization Admin/Approver ',
      icon: 'smile',
      component: './org/orgadmin',
    },
    {
      path: '/adminusers',
      name: 'Manane Org Users',
      icon: 'smile',
      component: './org/usersadmin',
    },
    {
      path: '/org/create',
      hideInMenu: true,
      component: './org/orgs/components/FormOrganization',
    },

    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
