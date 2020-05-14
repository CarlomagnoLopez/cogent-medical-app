import React, { Component } from 'react';
import { Card, Table, Button, Tag, Space, Icon, Spin } from 'antd';
import FormUser from './components/FormUser';
import FormEditUser from './components/EditUser';
import { connect } from 'umi';
class AdminUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: false,
      visibleedituser: false,
      currentcandidate: null,
      updatedata: false,
      data: [
        { key: '1', name: 'Test User', orgid: '7adbabfa', email: 'mgiri@cogentibs.com' },
        { key: '2', name: 'Test User 2', orgid: '7adbabfa', email: 'mgiri@cogentibs.com' },
        { key: '3', name: 'Test User 3', orgid: '7adbabfa', email: 'mgiri@cogentibs.com' },
        {
          orgName: 'aada',
          orgid: 'dadad',
          name: 'adaad',
          email: 'ada',
          phoneNumber: 'adad',
          key: '4',
        },
      ],
    };
  }

  componentDidUpdate() {
    console.log('Component will componentDidUpdate');
  }
  componentDidUpdate() {
    console.log('Component will componentDidUpdate');
  }

  componentWillUpdate() {
    console.log('Component will componentWillUpdate');
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
      type: 'organization/getAllOrgAdmins',
      payload: [],
    });
  }

  onCancel = () => {
    this.setState({ visible: false, visibleedituser: false });
  };

  onOk = () => {
    this.setState({ visible: false });
  };

  editUser = (record) => {
    console.log('Candiate ' + record);
    this.setState({ visibleedituser: true, currentcandidate: record });
  };

  updateUser = (record) => {};
  componentWillReceiveProps() {}
  createUser = (record) => {
    this.setState({ loading: true });
    const { data } = this.state;
    let tempdata = data;
    //tempdata.push(data);
    this.props.dispatch({
      type: 'organization/generateOrgUser',
      payload: record,
    });

    record.key = '' + data.length + 1;
    tempdata.push(record);
    // console.log('User ' + JSON.stringify(tempdata));
    this.setState({ data: tempdata, visible: false, updatedata: true });
    // console.log('User Data' + JSON.stringify(data));

    const _self = this;
    setTimeout(() => {
      _self.setState({ loading: false });
    }, 3000);
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
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <div style={{ textAlign: 'left' }}>
            <Button
              onClick={(record) => {
                this.editUser(record);
              }}
            >
              {' '}
              Edit
            </Button>
          </div>
        ),
      },
    ];
    const { currentcandidate } = this.state;
    const { orgadmins } = this.props;
    console.log(JSON.stringify(orgadmins));
    return (
      <Spin spinning={this.state.loading}>
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
          <Table columns={columns} dataSource={orgadmins} />

          <FormEditUser
            visible={this.state.visibleedituser}
            onCancel={this.onCancel}
            currentcandidate={currentcandidate}
            updateUser={this.updateUser}
          />
          <FormUser
            visible={this.state.visible}
            onCancel={this.onCancel}
            onOk={this.onOk}
            createUser={this.createUser}
          />
        </Card>
      </Spin>
    );
  }
}
export default connect(({ organization }) => ({
  organization,
  statusorgadmincreation: organization.statusorgadmincreation,
  orgadmins: organization.orgadmins,
}))(AdminUsers);
