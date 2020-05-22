import React, { Component } from 'react';

import { Card, Table, Button, Tag, Space, Icon, Spin, message } from 'antd';
import { routerRedux } from 'dva';
//import FormOrganization from './create/FormOrganization';
//import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { history } from 'umi';
import EditOrganization from './EditOrg';

class Org extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      current: '',
    };
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'organization/getAllOrgs',
      payload: [],
    });
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

  onEditSubmit = (values) => {
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

  createOrgAdmin = (record) => {};

  render() {
    const { updateorgdetailsstatus } = this.props;

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
    const columns = [
      {
        title: 'Name',
        dataIndex: 'contactName',
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
        dataIndex: 'contactEmail',
        key: 'email',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <div style={{ textAlign: 'left' }}>
            <a
              onClick={() => {
                this.onEdit(record);
              }}
            >
              {' '}
              Edit
            </a>
            <p></p>
            <a
              onClick={() => {
                this.createOrgAdmin(record);
              }}
            >
              Create OrgAdmin
            </a>
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
    return (
      <Spin spinning={this.props.loading}>
        <Card
          title="Organization"
          extra={<Button onClick={this.showOrg}>Create Organization</Button>}
        >
          {/* <FormOrganization visible={this.state.visible} onCancel={this.onCancel} onOk={this.onOk} />*/}
          <EditOrganization
            visible={this.state.visible}
            onCancel={this.onCancel}
            onEditSubmit={this.onEditSubmit}
            current={this.state.current}
          />

          <Table columns={columns} dataSource={this.props.orgslist} />
        </Card>
      </Spin>
    );
  }
}
export default connect(({ organization, loading }) => ({
  organization,
  orgslist: organization.orgslist,
  loading: loading.models.organization,
  updateorgdetailsstatus: organization.updateorgdetailsstatus,
}))(Org);
