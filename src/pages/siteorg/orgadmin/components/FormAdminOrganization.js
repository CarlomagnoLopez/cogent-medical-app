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
  Modal,
  DatePicker,
  LocaleProvider,
  AutoComplete,
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

class FormAdminOrganization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [{ value: 'cogent ibs', value: 'test company' }],
      roleoptions: [{ value: 'Admin', value: 'Approver' }],
    };
  }

  render() {
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

    const onSearchCompanyName = (data) => {
      console.log(data);
      this.setState({ options: [{ value: 'cogent ibs', value: 'test company' }] });
    };

    const onSelectCompanyName = (data) => {
      console.log(data);
    };

    const onSearchRole = (data) => {
      console.log(data);
    };

    const onSelectRole = (data) => {
      console.log(data);
    };
    const onFinish = (values) => {
      console.log('Received values of form: ', values);
    };
    return (
      <Modal
        closable={true}
        visible={this.props.visible}
        title="Create Admin Organization"
        cancelText="Cancel"
        onCancel={this.props.onCancel}
        maskClosable={false}
        onOk={this.props.onOk}
      >
        <span>
          <b>CompanyName: </b>
        </span>

        <AutoComplete
          options={this.state.options}
          style={{
            width: 200,
          }}
          label="CompanyName"
          onSelect={this.onSelectCompanyName}
          onSearch={this.onSearchCompanyName}
          placeholder="Company Name"
        />
        <p></p>
        <span>
          <b>Role: </b>
        </span>

        <AutoComplete
          options={this.state.roleoptions}
          style={{
            width: 200,
          }}
          label="Role"
          onSelect={this.onSelectRole}
          //  onSearch={this.onSearchRole}
          placeholder="Role"
        />
        <Form
          labelCol={{
            xs: {
              span: 24,
            },
            sm: {
              span: 4,
            },
          }}
          wrapperCol={{
            xs: {
              span: 24,
            },
            sm: {
              span: 16,
            },
          }}
          onFinish={this.onFinish}>
          <Form.Item label="Contact Name">
            <Input placeholder="Contact Name" id="error" />
          </Form.Item>
          <Form.Item label="Contact Number">
            <Input placeholder="Contact Number" id="error" />
          </Form.Item>
          <Form.Item label="Contact Email">
            <Input placeholder="Contact Email" id="error" />
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

export default FormAdminOrganization;
