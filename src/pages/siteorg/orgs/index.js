import React, { Component } from 'react';

import { Card, Table, Button, Tag, Space, Icon, Spin, Modal, message, Input } from 'antd';
// import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';

import { routerRedux } from 'dva';
//import FormOrganization from './create/FormOrganization';
//import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { history } from 'umi';
import EditOrganization from './EditOrg';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import * as AWS from 'aws-sdk';
let s3 = '';

class Org extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      current: '',
      visiblePopOver: false,
    };
    const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

    var albumBucketName = 'medicalprojectlogos';
    var bucketRegion = 'us-east-1'; // Region;
    var IdentityPoolId = 'us-east-1:53d43971-6a4b-4699-935c-592476c26ea1';

    AWS.config.update({
      region: bucketRegion,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:53d43971-6a4b-4699-935c-592476c26ea1',
      }),
    });

    s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: { Bucket: 'medicalprojectlogos' },
    });
  }

  componentWillMount() {
    if (localStorage.getItem('currentAuth') === 'siteadmin') {
      this.props.dispatch({
        type: 'organization/getAllOrgs',
        payload: [],
      });
    }
    if (localStorage.getItem('currentAuth') === 'orgadmin') {
      this.props.dispatch({
        type: 'organization/getOrganizationByUserId',
        payload: { userid: localStorage.getItem('userName') },
      });
    }
  }
  showOrg = () => {
    history.push('/org/create');
  };
  onCancel = () => {
    this.setState({ visible: false });
  };

  onOk = () => {
    this.setState({ visible: false });
  };

  showWarningDelete = (record) => {
    this.setState({
      visiblePopOver: true,
      recordOrg: record,
    });
  };

  proceedToDelete = () => {
    this.setState({
      visiblePopOver: false,
    });

    this.deleteOrg(this.state.recordOrg);
  };

  hideWarningDelete = () => {
    this.setState({
      visiblePopOver: false,
      recordOrg: '',
    });
  };

  deleteOrg = (record) => {
    this.props.dispatch({
      type: 'organization/deleteOrganization',
      payload: { orgid: record['mcp-1-pk'] },
    });
  };

  onEditSubmit = (values) => {
    let params = {
      Body: values.file,
      Key: values.orgName.trim() + '.jpeg',
      //ACL: 'public-read',
    };

    s3.putObject(params, function (err, data) {
      console.log('Data ' + JSON.stringify(data) + ' Error ' + JSON.stringify(err));

      if (err) {
        message.error('There was an error creating your album: ' + err.message);
      }
      message.success('Successfully uploaded logo.');
      //    console.log(albumName);
    });

    console.log('Values Received ' + values);
    this.props.dispatch({
      type: 'organization/updateOrgDetails',
      payload: values,
    });
    this.setState({ visible: false, current: '' });
  };

  onEdit = (record) => {
    this.setState({ current: record, visible: true });
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
    render: (text) => {
      console.log(text);
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      );
    },
  });
  createOrgAdmin = (record) => {};

  render() {
    const { updateorgdetailsstatus, deleteorgstatus } = this.props;

    if (deleteorgstatus.success == true) {
      message.success('Organization Deleted Successfully!');
      this.props.dispatch({
        type: 'organization/resetDelOrgStatus',
        payload: [],
      });
      this.props.dispatch({
        type: 'organization/getAllOrgs',
        payload: [],
      });
    }

    if (updateorgdetailsstatus.success == true) {
      message.success('Organization details updated!');
      this.props.dispatch({
        type: 'organization/resetUpdateOrgDeatailsStat',
        payload: [],
      });
      this.props.dispatch({
        type: 'organization/getAllOrgs',
        payload: [],
      });
    }
    if (updateorgdetailsstatus.success == false) {
      message.error(updateorgdetailsstatus.err.message);
      this.props.dispatch({
        type: 'organization/resetUpdateOrgDeatailsStat',
        payload: [],
      });
    }

    let cont = 0;

    const columns1 = [
      {
        title: 'Name of Contact',
        dataIndex: 'contactName',
        key: 'name',
        // render: (text) => {text,
      },
      {
        title: 'Secret Code',
        dataIndex: 'secretcode',
        key: 'secretcode',
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
        dataIndex: 'contactEmail',
        key: 'email',
      },
      {
        title: 'Action',
        key: 'action',
      },
    ];

    const columns = [
      // {
      //   title: '',
      //   dataIndex: '',
      //   key: '',
      //   render: (record) => {
      //     // console.log(record );
      //     cont++
      //     return cont
      //     // console.log(cont );

      //   }
      // },
      {
        title: 'Name of Contact',
        dataIndex: 'contactName',
        key: 'name',
        // render: (text) => {text,
      },
      {
        title: 'Secret Code',
        dataIndex: 'secretcode',
        key: 'secretcode',
      },
      {
        title: 'Website',
        dataIndex: 'website',
        key: 'website',
      },
      {
        title: 'Organiztion Key',
        dataIndex: 'mcp-1-sk',
        key: 'mcp-1-sk',
        render: (record) => {
          return record.replace('org-', '');
          // console.log(record)
        },
        // ...this.getColumnSearchProps('contactName'),
      },
      {
        title: 'logo',
        dataIndex: 'logo',
        key: 'logo',
      },
      {
        title: 'Email',
        dataIndex: 'contactEmail',
        key: 'email',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <div style={{ textAlign: 'left' }}>
            {localStorage.getItem('currentAuth') === 'siteadmin' && (
              <div style={{ textAlign: 'left' }}>
                {' '}
                <a
                  onClick={() => {
                    this.onEdit(record);
                  }}
                >
                  <EditOutlined /> Edit
                </a>
                <p></p>
                <a
                  onClick={() => {
                    this.showWarningDelete(record);
                  }}
                >
                  <DeleteOutlined />
                  Delete
                </a>
              </div>
            )}
          </div>
        ),
      },
    ];
    const { orgslist } = this.props;
    console.log('Orgs Data ' + orgslist);
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

    console.log('-->');
    console.log(this.props.orgslist);
    const { orgdetail } = this.props;
    console.log('Org Details ' + JSON.stringify(orgdetail));
    return (
      <div>
        {' '}
        {localStorage.getItem('currentAuth') === 'orgadmin' && (
          <div>
            <Card title="Organization Details">
              <Table columns={columns1} dataSource={[orgdetail]} />
            </Card>
          </div>
        )}
        {localStorage.getItem('currentAuth') === 'siteadmin' && (
          <Spin spinning={this.props.loading}>
            <Modal
              title="Are you sure to delete an organization?"
              visible={this.state.visiblePopOver}
              onOk={this.proceedToDelete}
              onCancel={this.hideWarningDelete}
            ></Modal>
            <Card
              title="Organization"
              extra={
                <div>
                  {localStorage.getItem('currentAuth') !== 'SiteAdmin' && (
                    <Button onClick={this.showOrg}>Create Organization</Button>
                  )}
                </div>
              }
            >
              {/* <FormOrganization visible={this.state.visible} onCancel={this.onCancel} onOk={this.onOk} />*/}
              <EditOrganization
                visible={this.state.visible}
                onCancel={this.onCancel}
                onEditSubmit={this.onEditSubmit}
                current={this.state.current}
              />
              <Table columns={columns} dataSource={this.props.orgslist} />
            </Card>{' '}
          </Spin>
        )}
      </div>
    );
  }
}
export default connect(({ organization, loading }) => ({
  organization,
  orgslist: organization.orgslist,
  loading: loading.models.organization,
  updateorgdetailsstatus: organization.updateorgdetailsstatus,
  deleteorgstatus: organization.deleteorgstatus,
  orgdetail: organization.orgdetail,
}))(Org);
