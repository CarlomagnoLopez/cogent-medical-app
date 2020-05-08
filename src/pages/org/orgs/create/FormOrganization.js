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

class FormOrganization extends Component {
  onFinish = (values) => {
    console.log('Received values of form: ', values);
    this.props.finishOrganizationDetails();
  };

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

    return (
      <Form onFinish={this.onFinish} validateMessages={validateMessages}>
        <Form.Item label="Organization Name" name="orgname" rules={[{ required: true }]}>
          <Input placeholder="Organization Name" id="organizationname" />
        </Form.Item>
        {/* <Form.Item label="Logo">
          <Form.Item name="logo" valuePropName="fileList" noStyle>
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Support for a single or bulk upload.</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>*/}
        <Form.Item label="Contact Name" name="contactname" rules={[{ required: true }]}>
          <Input placeholder="Contact Name" id="contactname" />
        </Form.Item>
        <Form.Item
          label="Contact Email"
          name="contactemail"
          rules={[{ required: true, type: 'email' }]}
        >
          <Input placeholder="Contact Email" id="contactemail" />
        </Form.Item>
        <Form.Item label="Website" name="website" rules={[{ required: true }]}>
          <Input placeholder="Website" id="website" />
        </Form.Item>
        <Form.Item label="office phone" name="officephone" rules={[{ required: true }]}>
          <Input placeholder="office phone" id="officephone" />
        </Form.Item>
        <Form.Item label="office fax" name="officefax" rules={[{ required: true }]}>
          <Input placeholder="office fax" id="faxnumber" />
        </Form.Item>
        <Form.Item label="tax number" name="taxnumber" rules={[{ required: true }]}>
          <Input placeholder="tax number" id="taxnumber" />
        </Form.Item>
        <Form.Item label="field1">
          <Input placeholder="field1" id="field1" />
        </Form.Item>
        <Form.Item label="field1">
          <Input placeholder="field1" id="field2" />
        </Form.Item>{' '}
        <Form.Item label="field1">
          <Input placeholder="field1" id="field3" />
        </Form.Item>{' '}
        <Form.Item label="field1">
          <Input placeholder="field1" id="field4" />
        </Form.Item>{' '}
        <Form.Item label="field1">
          <Input placeholder="field1" id="field5" />
        </Form.Item>{' '}
        <Form.Item label="field1">
          <Input placeholder="field1" id="field6" />
        </Form.Item>{' '}
        <Form.Item label="field1">
          <Input placeholder="field1" id="field7" />
        </Form.Item>{' '}
        <Form.Item label="field1">
          <Input placeholder="field1" id="field8" />
        </Form.Item>{' '}
        <Form.Item label="field1">
          <Input placeholder="field1" id="field9" />
        </Form.Item>{' '}
        <Form.Item label="field1">
          <Input placeholder="field1" id="field10" />
        </Form.Item>{' '}
        <Form.Item label="field1">
          <Input placeholder="field1" id="field11" />
        </Form.Item>{' '}
        <Form.Item label="field1">
          <Input placeholder="field1" id="field12" />
        </Form.Item>{' '}
        <Form.Item label="field1">
          <Input placeholder="field1" id="field13" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default FormOrganization;
