import React, { Component } from 'react';
import { Card, Table, Button, Tag, Space, Icon, Checkbox } from 'antd';
import FormAdminOrganization from './components/FormAdminOrganization';
export default class AdminPage extends Component {
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
        title: 'Org ID',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
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
            <Checkbox>Disable</Checkbox>
            <p></p>
            <a>Edit</a>
            <p></p>
            <a>Send login</a>
          </div>
        ),
      },
    ];

    const data = [
      {
        key: '1',
        name: 'Mahesh',
        role: 'org admin',
        id: 'ajdaj33jnadjn',
        email: 'mgiri@cogentibs.com',
      },
      {
        key: '2',
        name: 'Carlo',
        role: 'org admin',
        id: 'ajdaj33jnadjn',
        email: 'mgiri@cogentibs.com',
      },
      {
        key: '3',
        name: 'ABC Guy',
        role: 'approver',
        id: 'ajdaj33jnadjn',
        email: 'mgiri@cogentibs.com',
      },
    ];
    return (
      <Card
        title="Organization Admin List"
        extra={
          <Button
            onClick={() => {
              this.setState({ visible: true });
            }}
          >
            Create Organization Admin
          </Button>
        }
      >
        <FormAdminOrganization
          visible={this.state.visible}
          onCancel={this.onCancel}
          onOk={this.onOk}
        />
        <Table columns={columns} dataSource={data} />
      </Card>
    );
  }
}
