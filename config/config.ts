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
    name: 'Cogent Medical',
    locale: true,
  },
  locale: {
    // default zh-CN
    default: 'us-EN',
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
      // name: 'signup',
      path: 'user/register',
      layout: false,
      hideInMenu:true,
      component: './users/signup',
    },

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
      path: '/manageusers',
      name: 'Manage Org Users',
      icon: 'smile',
      access: 'canOrgAdmin',
      component: './OrganizationAdmin/usersadmin',
    },
    {
      path: '/manageuserapprovals',
      name: 'Manage User Approvals',
      component: './OrganizationAdmin/userapprovals',
      access: 'canOrgAdmin',
    },
    {
      path: '/manageuserapprovals',
      name: 'Manage User Approvals',
      component: './OrganizationAdmin/userapprovals',
      access: 'canApproval',
    },
    // {
      /*
      path: '/notifications',
      component: './OrganizationAdmin/Notifications',
      name: 'Notifications',
      access: 'canOrgAdmin',
    */
    // },

    {
      path: '/',
      layout: false,
      component: './siteorg/orgs',
      access: 'canAdmin',
    },
    {
      path: '/',
      name: 'Create an Organization',
      icon: 'smile',
      access: 'canAdmin',
      component: './siteorg/orgs',
    },

    /* {
      
      path: '/admincreate',
      name: 'Create Organization Admin/Approver ',
      icon: 'smile',
      component: './siteorg/orgadmin',
    
    },*/

    {
      path: '/welcome',
    },

    {
      path: '/adminusers',
      name: 'Manage Org Users',
      icon: 'smile',
      access: 'canAdmin',
      component: './siteorg/usersadmin',
    },

    {
      path: '/org/create',
      hideInMenu: true,
      component: './siteorg/orgs/create',
    },
    {
      path: '/siteorg/userapprovals',
      name: 'Manage User Approvals',
      component: './siteorg/userapprovals',
      access: 'canAdmin',
    },
    {
      component: './404',
    },
  ],
  define: {
    ANT_DESIGN_PRO_USER_POOL_ID: 'us-east-1_zgFW3AEob',
    ANT_DESIGN_PRO_CLIENT_ID: '13pbrvceiogtq8ikiv1l9v89t4',
    // ANT_DESIGN_PRO_USER_POOL_ID: 'us-east-1_4JmTxHDGX',
    // ANT_DESIGN_PRO_CLIENT_ID: '7s90an5ecff1blr3aej1d97p3q',
    // REACT_APP_ENV: 'https://c4ymficygk.execute-api.us-east-1.amazonaws.com/dev',
    REACT_APP_ENV: '/api',
  },
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  ignoreMomentLocale: true,
  proxy: {
    '/api/': {
      target: process.env.REACT_APP_ENV,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
  },
  // proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
