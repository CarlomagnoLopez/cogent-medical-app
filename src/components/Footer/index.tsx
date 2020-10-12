import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="2020"
    links={[
      {
        key: 'Track Me',
        title: 'Track Me',
        href: 'http://TrackMe.com',
        blankTarget: true,
      },
    ]}
  />
);
