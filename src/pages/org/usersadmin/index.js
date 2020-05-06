import React, { Component } from 'react';
import { Card, Table, Button, Tag, Space, Icon } from 'antd';
import FormUser from './components/FormUser';
export default class AdminUsers extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }
  onCancel = () => {
    this.setState({ visible: false });
  };

  onOk = () => {
    this.setState({ visible: false });
  };
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
      <Card
        title="Organization"
        extra={
          <Button
            onClick={() => {
              this.setState({ visible: true });
            }}
          >
            Create User
          </Button>
        }
      >
        <FormUser visible={this.state.visible} onCancel={this.onCancel} onOk={this.onOk} />
        <Table columns={columns} dataSource={data} />
      </Card>
    );
  }
}
