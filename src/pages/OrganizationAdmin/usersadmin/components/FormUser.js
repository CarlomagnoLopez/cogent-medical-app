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
import jsonp from 'fetch-jsonp';
import axios from 'axios';
const Dragger = Upload.Dragger;
import { SmileOutlined } from '@ant-design/icons';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';

let timeout;
let currentValue;

class FormUser extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], value: 'hi', loadingcompanies: false };
    console.log('Constructor Calling');
  }

  componentWillMount() {}

  componentWillReceiveProps() {
    console.log('Componenet Will Receive Props');
    //this.handleSearch();
  }

  onFinish = (values) => {
    // values.orgid = this.state.value;
    values.phoneNumber = '+' + values.prefix + values.phoneNumber;
    console.log('Received values of form: ', JSON.stringify(values));
    this.props.createUser(values);
  };
  handleSearch = (value) => {
    this.setState({ loadingcompanies: true });
    if (value) {
      //fetch(value, (data) => this.setState({ data, loadingcompanies: false }));
    } else {
      this.setState({ data: [] });
    }
  };

  onRoleChange = (value) => {};

  handleChange = (value) => {
    this.setState({ value });
  };
  prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="1">+1</Option>

        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
        <Option value="91">+91</Option>
        <Option value="55">+55</Option>
        <Option value="52">+52</Option>
      </Select>
    </Form.Item>
  );
  render() {
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
    console.log(this.props.data);

    const options =
      this.props.data != undefined
        ? this.props.data.map((d) => (
            <Option key={d.orgname != null ? d.text : ''} value={d['mcp-1-pk']}>
              {d.orgname}
            </Option>
          ))
        : '';

    return (
      <Modal
        closable={true}
        visible={this.props.visible}
        title="Create User"
        cancelText="Cancel"
        footer={null}
        destroyOnClose
        onCancel={this.props.onCancel}
      >
        <Form
          ref={(form) => (this.formRef = form)}
          onFinish={this.onFinish}
          validateMessages={validateMessages}
          initialValues={{ prefix: '91' }}
        >
          <Form.Item
            label="CompanyName"
            name="orgid"
            hasFeedback={this.state.loadingcompanies}
            rules={[{ required: true }]}
          >
            <Select
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

          <p></p>
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

export default FormUser;
