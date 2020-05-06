import React, { Component } from 'react';

import { Card, Table, Button, Tag, Space, Icon } from 'antd';
import FormOrganization from './components/FormOrganization';

export default class Org extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
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
        title: 'Website',
        dataIndex: 'website',
        key: 'website',
      },
      {
        title: 'logo',
        dataIndex: 'logo',
        key: 'logo',
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
            <p></p>
            <a>Create Orgs Admins</a>
          </div>
        ),
      },
    ];

    const data = [
      {
        key: '1',
        name: 'Cogent IBS Pvt Ltd',
        website: 'http://cogentibs.com',
        logo: 'http://www.logo.com',
        email: 'mgiri@cogentibs.com',
      },
      {
        key: '2',
        name: 'Cogent IBS Pvt Ltd',
        website: 'http://cogentibs.com',
        logo: 'http://www.logo.com',
        email: 'mgiri@cogentibs.com',
      },
      {
        key: '3',
        name: 'Cogent IBS Pvt Ltd',
        website: 'http://cogentibs.com',
        logo: 'http://www.logo.com',
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
            Create Organization
          </Button>
        }
      >
        <FormOrganization visible={this.state.visible} onCancel={this.onCancel} onOk={this.onOk} />

        <Table columns={columns} dataSource={data} />
      </Card>
    );
  }
}
