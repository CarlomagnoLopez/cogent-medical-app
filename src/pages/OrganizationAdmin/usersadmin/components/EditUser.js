import React, { Component } from 'react';
import {
  Icon,
  Steps,
  Button,
  Alert,
  Spin,
  Tooltip,
  Cascader,
  Checkbox,
  Select,
  Row,
  Col,
  Card,
  Divider,
  Form,
  List,
  Input,
  AutoComplete,
  Modal,
  DatePicker,
  LocaleProvider,
  TimePicker,
  InputNumber,
  Upload,
  message,
} from 'antd';
import { Link } from 'dva';
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const AutoCompleteOption = AutoComplete.Option;
import TextArea from 'antd/lib/input/TextArea';
const Option = Select.Option;

const Dragger = Upload.Dragger;
import { SmileOutlined } from '@ant-design/icons';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';

class FormEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '',
      value: '',
    };
  }
  onFinish = (values) => {
    console.log('Received values of form: ', values);
    values.userName = this.props.current['mcp-1-sk'];
    this.props.updateUser(values);
  };
  prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
        <Option value="91">+91</Option>
        <Option value="55">+55</Option>
        <Option value="52">+52</Option>
        <Option value="1">+1</Option>
      </Select>
    </Form.Item>
  );

  handleSearch = (value) => {
    console.log('Value ' + value);
    this.setState({ loadingcompanies: true });
    if (value) {
      //fetch(value, (data) => this.setState({ data, loadingcompanies: false }));
    } else {
      this.setState({ data: [] });
    }
  };

  onRoleChange = (value) => {};

  handleChange = (value) => {
    console.log('Handle Change ' + value);
    this.setState({ value });
  };

  render() {
    console.log('Value . ' + this.state.value);
    const validateMessages = {
      required: '${label} is required!',
      types: {
        email: '${label} is not validate email!',
        number: '${label} is not a validate number!',
      },
      number: {
        range: '${label} must be between ${min} and ${max}',
      },
    };
    const { Option } = Select;
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 5,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 12,
        },
      },
    };
    const options =
      this.props.data != undefined
        ? this.props.data.map((d) => (
            <Option key={d.orgname != null ? d.text : ''} value={d['mcp-1-pk']}>
              {d.orgname}
            </Option>
          ))
        : '';

    const { current } = this.props;
    console.log('Current User ' + JSON.stringify(current));
    return (
      <Modal
        closable={true}
        visible={this.props.visible}
        title="Edit User"
        footer={null}
        destroyOnClose
        onCancel={this.props.onCancel}
      >
        <Form
          onFinish={this.onFinish}
          validateMessages={validateMessages}
          initialValues={{
            prefix: '91',
            orgid: this.props.current.orgid,
            role: this.props.current.role,
            name: this.props.current.name,
            email: this.props.current.email,
            phoneNumber: this.props.current.phoneNumber,
          }}
        >
          <Form.Item
            label="CompanyName"
            name="orgid"
            hasFeedback={this.state.loadingcompanies}
            rules={[{ required: true }]}
          >
            <Select
              disabled
              required={true}
              showSearch
              value={this.state.value}
              placeholder={'companyName'}
              style={{ width: '80%' }}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={(input, option) =>
                option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onSearch={this.handleSearch}
              onChange={this.handleChange}
              notFoundContent={null}
            >
              {options}
            </Select>
          </Form.Item>

          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Select placeholder="Select a role" onChange={this.onRoleChange} allowClear>
              <Option value="User">User</Option>
              <Option value="OrgAdmin">OrgAdmin</Option>
              <Option value="OrgApprover">OrgApprover</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Contact Name" name="name" rules={[{ required: true }]}>
            <Input placeholder="Contact Name" id="error" />
          </Form.Item>
          <Form.Item label="Contact Email" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input placeholder="Contact Email" id="error" />
          </Form.Item>
          <Form.Item label="Contact Number" name="phoneNumber" rules={[{ required: true }]}>
            <Input addonBefore={this.prefixSelector} placeholder="Contact Number" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 12,
              offset: 6,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default FormEditUser;
