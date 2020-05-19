import React, { Component } from 'react';
import { Card, Table, Button, Tag, Space, Icon, Spin, Modal, message } from 'antd';
import FormUser from './components/FormUser';
import FormEditUser from './components/EditUser';
import { connect } from 'umi';
const { confirm } = Modal;

class AdminUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: false,
      visibleedituser: false,
      currentcandidate: [],
      updatedata: false,
      typeofuser: 'create',
      formvalues: [],
    };
  }

  componentWillReceiveProps() {
    console.log('Component will componentWillReceiveProps');
  }
  componentDidMount() {
    console.log('Component componentWillReceiveProps mount');
  }
  componentWillMount() {
    console.log('Component will mount');

    this.props.dispatch({
      type: 'organization/getAllUser',
      payload: [],
    });
    this.props.dispatch({
      type: 'organization/getAllOrgs',
      payload: [],
    });
  }
  deleteUser = (record) => {
    const _self = this;
    confirm({
      title: 'Confirm',
      content: 'Are you sure to delete this user?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
        _self.props.dispatch({
          type: 'organization/deleteUser',
          payload: { userid: record['mcp-1-sk'].substring(5, record['mcp-1-sk'].length) },
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  onCancel = () => {
    this.setState({ formvalues: [], type: '', visible: false, visibleedituser: false });
  };

  onOk = () => {
    this.setState({ visible: false });
  };

  editUser = (record) => {
    console.log('Candiate ' + JSON.stringify(record));

    this.setState({
      formvalues: record,
      typeofuser: 'edit',
      visibleedituser: true,
      currentcandidate: record,
    });
  };

  updateUser = (record) => {};
  componentWillReceiveProps() {}
  createUser = (record) => {
    console.log('Create Data ' + JSON.stringify(record));
    const { data } = this.state;
    let tempdata = data;
    //tempdata.push(data);
    this.props.dispatch({
      type: 'organization/generateOrgUser',
      payload: record,
    });

    this.setState({ data: tempdata, visible: false, updatedata: true });
    // console.log('User Data' + JSON.stringify(data));
  };

  render() {
    const { statusorgadmincreation, deleteuserstatus } = this.props;

    if (deleteuserstatus) {
      if (deleteuserstatus.success == true) {
        message.success('User Deleted Successfully!');
        this.props.dispatch({
          type: 'organization/getAllUser',
          payload: [],
        });
      }
      if (deleteuserstatus.success == false) {
        message.error('Error while deleting the user,please try again!');
        this.props.dispatch({
          type: 'organization/resetDeleteUserStatus',
          payload: [],
        });
      }
    }

    if (statusorgadmincreation) {
      if (statusorgadmincreation.success == true) {
        message.success('User Created Successfully!');
        this.props.dispatch({
          type: 'organization/getAllUser',
          payload: [],
        });
      }
      if (statusorgadmincreation.success == false) {
        message.error(statusorgadmincreation.log.message);
        this.props.dispatch({
          type: 'organization/resetStatus',
          payload: [],
        });
      }
    }
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text != undefined ? text : ''}</a>,
      },
      {
        title: 'OrgId',
        dataIndex: 'orgid',
        key: 'orgid',
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
            <a onClick={() => this.editUser(record)}> Edit</a>
            <p></p>
            <a onClick={() => this.deleteUser(record)}> Delete</a>
          </div>
        ),
      },
    ];
    const { currentcandidate } = this.state;
    const { orgadmins, userslist } = this.props;
    console.log('Orgs list ' + this.props.orgslist);
    return (
      <Spin spinning={this.props.loading} message={'loading please wait'}>
        <Card
          title="Manage Organization Users"
          extra={
            <Button
              onClick={() => {
                this.setState({ typeofuser: 'create', visible: true });
              }}
            >
              Create User
            </Button>
          }
        >
          <Table columns={columns} dataSource={userslist} />
          <FormUser
            visible={this.state.visible}
            onCancel={this.onCancel}
            onOk={this.onOk}
            createUser={this.createUser}
            data={this.props.orgslist}
          />

          <FormEditUser
            visible={this.state.visibleedituser}
            onCancel={this.onCancel}
            onOk={this.onOk}
            editUser={this.editUser}
            data={this.props.orgslist}
            current={this.state.currentcandidate}
          />
        </Card>
      </Spin>
    );
  }
}
export default connect(({ organization, loading }) => ({
  organization,
  statusorgadmincreation: organization.statusorgadmincreation,
  orgslist: organization.orgslist,
  userslist: organization.userslist,
  loading: loading.models.organization,
  deleteuserstatus: organization.deleteuserstatus,
  statusorgadmincreation: organization.statusorgadmincreation,
}))(AdminUsers);
