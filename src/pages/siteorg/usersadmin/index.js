import React, { Component } from 'react';
import { Card, Table, Button, Tag, Space, Icon, Spin, Modal, message, Input } from 'antd';
import FormUser from './components/FormUser';
import FormEditUser from './components/EditUser';
import { connect } from 'umi';
const { confirm } = Modal;
import Highlighter from 'react-highlight-words';
import { SearchOutlined, DeleteOutlined, RedoOutlined, EditOutlined } from '@ant-design/icons';
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
      searchText: '',
      searchedColumn: '',
      loadedUsers: false
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
    if (localStorage.getItem('currentAuth') === 'orgadmin') {
      this.props.dispatch({
        type: 'organization/getUsersByOrgs',
        payload: {
          orgid: localStorage.getItem('orgid'),
          role: localStorage.getItem('currentAuth'),
        },
      });
    }
    if (localStorage.getItem('currentAuth') === 'siteadmin') {
      this.props.dispatch({
        type: 'organization/getAllUser',
        payload: [],
      });
    }
    this.props.dispatch({
      type: 'organization/getAllOrgs',
      payload: [],
    });
  }
  deleteUser = (record) => {
    let currentuser = localStorage.getItem('userName');
    let tempuser = record['mcp-1-sk'].substring(5, record['mcp-1-sk'].length);
    if (currentuser === tempuser) {
      message.error('Can not delete this user!');
      return;
    }

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
          payload: {
            userid: record['mcp-1-sk'].substring(5, record['mcp-1-sk'].length),
            orgid: record['mcp-1-pk'],
            role: record.role,
          },
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

  sendLogin = (record) => { };

  updateUser = (values) => {
    this.props.dispatch({
      type: 'organization/updateUserDetails',
      payload: values,
    });

    this.setState({ visibleedituser: false, current: '' });
  };
  componentWillReceiveProps() { }
  createUser = (record) => {
    console.log('Create Data ' + JSON.stringify(record));
    const { data } = this.state;
    let tempdata = data;
    //tempdata.push(data);
    this.props.dispatch({
      type: 'organization/generateOrgUser',
      payload: record,
      role: record.role,
    });

    this.setState({ data: tempdata, visible: false, updatedata: true });
    // console.log('User Data' + JSON.stringify(data));
  };
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          icon={<SearchOutlined />}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
          text
        ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  deleteSiteAdmin = () => {
    const { userslist } = this.props;

    let arrUsers = [];
    userslist.map((item) => {
      if (item.role !== "SiteAdmin") {
        arrUsers.push(item)
      }
    })

    console.log(arrUsers)

    this.setState({
      userslist: arrUsers
    })
  }
  render() {
    const { statusorgadmincreation, deleteuserstatus, updateuserstatus } = this.props;

    if (updateuserstatus.success == false) {
      message.error(updateuserstatus.log.message);
      this.props.dispatch({
        type: 'organization/resetUpdateUserDetailsStatus',
        payload: [],
      });
    }

    if (updateuserstatus.success == true) {
      message.success('User information updated!');
      this.props.dispatch({
        type: 'organization/resetUpdateUserDetailsStatus',
        payload: [],
      });
      if (localStorage.getItem('currentAuth') === 'orgadmin') {
        this.props.dispatch({
          type: 'organization/getUsersByOrgs',
          payload: {
            orgid: localStorage.getItem('orgid'),
            role: localStorage.getItem('currentAuth'),
          },
        });
      }
      if (localStorage.getItem('currentAuth') === 'siteadmin') {
        this.props.dispatch({
          type: 'organization/getAllUser',
          payload: [],
        });
      }
    }

    if (deleteuserstatus) {
      if (deleteuserstatus.success == true) {
        message.success('User Deleted Successfully!');
        if (localStorage.getItem('currentAuth') === 'orgadmin') {
          this.props.dispatch({
            type: 'organization/getUsersByOrgs',
            payload: {
              orgid: localStorage.getItem('orgid'),
              role: localStorage.getItem('currentAuth'),
            },
          });
        }
        if (localStorage.getItem('currentAuth') === 'siteadmin') {
          this.props.dispatch({
            type: 'organization/getAllUser',
            payload: [],
          });
        }
      }
      if (deleteuserstatus.success == false) {
        message.error(deleteuserstatus.log.message);
        this.props.dispatch({
          type: 'organization/resetDeleteUserStatus',
          payload: [],
        });
      }
    }

    if (statusorgadmincreation) {
      if (statusorgadmincreation.success == true) {
        message.success('User Created Successfully!');
        if (localStorage.getItem('currentAuth') === 'orgadmin') {
          this.props.dispatch({
            type: 'organization/getUsersByOrgs',
            payload: {
              orgid: localStorage.getItem('orgid'),
              role: localStorage.getItem('currentAuth'),
            },
          });
        }
        if (localStorage.getItem('currentAuth') === 'siteadmin') {
          this.props.dispatch({
            type: 'organization/getAllUser',
            payload: [],
          });
        }
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
        render: (text) => <span>{text != undefined ? text : ''}</span>,
      },
      // {
      //   title: 'OrgId',
      //   dataIndex: 'orgid',
      //   key: 'orgid',
      //   ...this.getColumnSearchProps('orgid'),
      // },
      {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        onFilter: (value, record) => record.role.indexOf(value) === 0,
        sorter: (a, b) => a.role.length - b.role.length,
        sortDirections: ['descend'],
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
            <a onClick={() => this.editUser(record)}>
              <EditOutlined /> Edit
            </a>
            <p></p>
            <a onClick={() => this.deleteUser(record)}>
              <DeleteOutlined /> Delete
            </a>
            <p></p>
            {/* <a onClick={() => this.sendLogin(record)}>
              <RedoOutlined /> Send login
            </a> */}
          </div>
        ),
      },
    ];
    const { currentcandidate, loadedUsers } = this.state;
    const { orgadmins, userslist } = this.props;

    if (userslist && !loadedUsers) {
      this.setState({
        loadedUsers: true,

      }, (props, state) => {
        console.log("org")
        this.deleteSiteAdmin();
      })
    }
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
          {localStorage.getItem('currentAuth') === 'siteadmin' && (
            <Table columns={columns} dataSource={this.state.userslist} />
          )}
          {localStorage.getItem('currentAuth') === 'orgadmin' && (
            <Table columns={columns} dataSource={this.props.orgsusers} />
          )}

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
            updateUser={this.updateUser}
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
  updateuserstatus: organization.updateuserstatus,
  orgsusers: organization.orgsusers,
}))(AdminUsers);
