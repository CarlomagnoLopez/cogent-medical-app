import React, { Component } from 'react';
import { Card, Table, Button, Tag, Space, Icon, Checkbox } from 'antd';
import NotificationComponent from './components/Notifications';
export default class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleNoti: true,


    };
  }

    onNotiCancel = () => {
    this.setState({ visibleNoti: true });
  };

  onNotiOk = () => {
    this.setState({ visibleNoti: true });
  };

  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'Name',
        key: 'Name',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Role',
        dataIndex: 'Role',
        key: 'Role',
      },
      {
        title: 'DOB',
        dataIndex: 'DOB',
        key: 'DOB',
      },
      {
        title: 'PhoneNo',
        dataIndex: 'PhoneNo',
        key: 'PhoneNo',
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
            <Checkbox>Enable</Checkbox>
            <p></p>
            <a>Edit</a>
            <p></p>
            <Checkbox>Approver</Checkbox>
          </div>
        ),
      },
    ];

    const data = [
      {
        key : 1,
        Name: 'Veshnavee',
        Role: 'OrgAdmin',
        DOB: '29/04/1997',
        PhoneNo: 9893340746,
        email: 'veshnavee.g@cogentibs.com',
      },
      {
        key : 2,
        Name: 'Veshnavee',
        Role: 'OrgAdmin',
        DOB: '29/04/1997',
        PhoneNo: 9893340746,
        email: 'veshnavee.g@cogentibs.com',
      },
      {
        key : 3,
        Name: 'Veshnavee',
        Role: 'OrgAdmin',
        DOB: '29/04/1997',
        PhoneNo: 9893340746,
        email: 'veshnavee.g@cogentibs.com',
      },

    ];
    return (
      <Card title="User/Approver">

         <NotificationComponent
          visible={this.state.visibleNoti}
          onCancel={this.onNotiCancel}
          onOk={this.onNotiOk}
        />
        <Table columns={columns} dataSource={data} />
      </Card>
    );
  }
}
