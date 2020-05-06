import React, { Component } from 'react';
import { Card, Table, Button, Tag, Space, Icon } from 'antd';
export default class AdminUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'OrgId',
        dataIndex: 'orgid',
        key: 'orgid',
      },
      {
        title: 'createdBy',
        dataIndex: 'createdBy',
        key: 'createdBy',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <div style={{ textAlign: 'left' }}>
            <a> Edit</a>
          </div>
        ),
      },
    ];

    const data = [
      {
        key: '1',
        name: 'Test User',
        orgid: '7adbabfa',
        createdBy: 'testadmin',
        email: 'mgiri@cogentibs.com',
      },
      {
        key: '2',
        name: 'Test User 2',
        orgid: '7adbabfa',
        createdBy: 'testadmin',
        email: 'mgiri@cogentibs.com',
      },
      {
        key: '3',
        name: 'Test User 3',
        orgid: '7adbabfa',
        createdBy: 'testadmin',
        email: 'mgiri@cogentibs.com',
      },
    ];
    return (
      <Card title="Organization" extra={<Button>Create User</Button>}>
        <Table columns={columns} dataSource={data} />
      </Card>
    );
  }
}
