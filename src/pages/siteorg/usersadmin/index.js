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
      type: 'organization/getAllOrgAdmins',
      payload: [],
    });
  }

  onCancel = () => {
    this.setState({ formvalues: [], type: '', visible: false, visibleedituser: false });
  };

  onOk = () => {
    this.setState({ visible: false });
  };

  editUser = (record) => {
    //console.log('Candiate ' + JSON.stringify(record));

    this.setState({
      formvalues: record,
      typeofuser: 'edit',
      visible: true,
      currentcandidate: record,
    });
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
        render: (record) => (
          <div style={{ textAlign: 'left' }}>
            <Button onClick={() => this.editUser(record)}> Edit</Button>
          </div>
        ),
      },
    ];
    const { currentcandidate } = this.state;
    const { orgadmins } = this.props;
    return (
      <Spin spinning={this.state.loading}>
        <Card
          title="Organization"
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
          <Table columns={columns} dataSource={orgadmins} />
          <FormUser
            visible={this.state.visible}
            onCancel={this.onCancel}
            onOk={this.onOk}
            type={this.state.typeofuser}
            editformvalues={this.state.currentcandidate}
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
