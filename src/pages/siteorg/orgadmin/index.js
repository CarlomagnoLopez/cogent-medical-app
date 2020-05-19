import React, { Component } from 'react';
import { Card, Table, Button, Tag, Space, Icon, Checkbox, Spin } from 'antd';
import FormAdminOrganization from './components/FormAdminOrganization';
import { connect } from 'umi';
class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'organization/getOrgsAdminApprovals',
      payload: [],
    });
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
        dataIndex: 'orgid',
        key: 'orgid',
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

    const { loading } = this.props;

    return (
      <Spin spinning={loading}>
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
          <Table columns={columns} dataSource={this.props.orgadminsapprovalslist} />
        </Card>
      </Spin>
    );
  }
}
export default connect(({ organization, loading }) => ({
  organization,
  loading: loading.models.organization,
  orgadminsapprovalslist: organization.orgadminsapprovalslist,
}))(AdminPage);
