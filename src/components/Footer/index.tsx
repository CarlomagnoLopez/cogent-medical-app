import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="2020@cogentibsinc"
    links={[
      {
        key: 'Cogent Medical',
        title: 'Cogent Medical',
        href: 'http://cogentibs.com',
        blankTarget: true,
      },
    ]}
  />
);
