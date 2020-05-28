import React, { Component } from 'react';
import { connect } from 'umi';
import { Card, Table, message } from 'antd';

class ManageUserApproval extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'users/getApprovalUsersList',
      payload: [],
    });
  }

  approveUser = (record) => {
    this.props.dispatch({
      type: 'users/approveUserS',
      payload: { username: record.username },
    });
  };

  render() {
    const { userslist, approveuserstatus } = this.props;

    if (approveuserstatus != undefined && approveuserstatus.success === true) {
      message.success('User Approved!');
      this.props.dispatch({ type: 'users/getApprovalUsersList', payload: [] });
    }

    if (approveuserstatus != undefined && approveuserstatus.success === false) {
      message.error(approveuserstatus.err.message);
    }

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text != undefined ? text : ''}</a>,
      },
      {
        title: 'MobileNo',
        dataIndex: 'phonenumber',
        key: 'phonenumber',
      },
      {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
      },

      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Action',
        key: 'action',
        render: (record) => (
          <div style={{ textAlign: 'left' }}>
            <a onClick={() => this.approveUser(record)}> Approve</a>
          </div>
        ),
      },
    ];

    return (
      <Card title={'Manage User Approvals'}>
        {' '}
        <Table loading={this.props.loading} columns={columns} dataSource={userslist} />
      </Card>
    );
  }
}

export default connect(({ users, loading }) => ({
  users,
  userslist: users.userslist,
  loading: loading.models.users,
  approveuserstatus: users.approveuserstatus,
}))(ManageUserApproval);
