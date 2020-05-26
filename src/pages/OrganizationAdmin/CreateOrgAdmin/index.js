import React, { Component } from 'react';
import { Card, Table, Button, Tag, Space, Icon, Checkbox } from 'antd';
import FormAdminOrganization from './components/FormAdminOrganization';
// import NotificationComponent from './components/Notifications';
export default class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleNoti: false,
       visible: false,

    };
  }

  onCancel = () => {
    this.setState({ visible: false });
  };

  onOk = () => {
    this.setState({ visible: false });
  };
    onNotiCancel = () => {
    this.setState({ visibleNoti: false });
  };

  onNotiOk = () => {
    this.setState({ visibleNoti: false });
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
      {
        key : 4,
        Name: 'Veshnavee',
        Role: 'OrgAdmin',
        DOB: '29/04/1997',
        PhoneNo: 9893340746,
        email: 'veshnavee.g@cogentibs.com',
      },
    ];
    return (
      <Card
        title="User/Approver"
        extra={<div>
          <Button
            onClick={() => {
              this.setState({ visible: true });
            }}
          >
            Create Organization User/Approver
          </Button>
          {/* <Button
            onClick={() => {
              this.setState({ visibleNoti: true });
            }}
          >
           Notifications
          </Button> */}

          </div>

        }
      >


        <FormAdminOrganization
          visible={this.state.visible}
          onCancel={this.onCancel}
          onOk={this.onOk}
        />
         {/* <NotificationComponent
          visible={this.state.visibleNoti}
          onCancel={this.onNotiCancel}
          onOk={this.onNotiOk}
        /> */}
        <Table columns={columns} dataSource={data} />
      </Card>
    );
  }
}
