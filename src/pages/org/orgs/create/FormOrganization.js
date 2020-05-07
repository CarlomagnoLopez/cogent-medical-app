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
      <Form onFinish={this.onFinish}>
        <Form.Item label="Organization Name">
          <Input placeholder="Organization Name" id="error" />
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
        <Form.Item label="Contact Name">
          <Input placeholder="Contact Name" id="error" />
        </Form.Item>
        <Form.Item label="Contact Email">
          <Input placeholder="Contact Email" id="error" />
        </Form.Item>
        <Form.Item label="Website">
          <Input placeholder="Website" />
        </Form.Item>
        <Form.Item label="office phone">
          <Input placeholder="office phone" />
        </Form.Item>
        <Form.Item label="office fax">
          <Input placeholder="office fax" />
        </Form.Item>
        <Form.Item label="tax number">
          <Input placeholder="tax number" />
        </Form.Item>
        <Form.Item label="field1">
          <Input placeholder="field1" />
        </Form.Item>
        <Form.Item label="field1">
          <Input placeholder="field1" />
        </Form.Item>{' '}
        <Form.Item label="field1">
          <Input placeholder="field1" />
        </Form.Item>{' '}
        <Form.Item label="field1">
          <Input placeholder="field1" />
        </Form.Item>{' '}
        <Form.Item label="field1">
          <Input placeholder="field1" />
        </Form.Item>{' '}
        <Form.Item label="field1">
          <Input placeholder="field1" />
        </Form.Item>{' '}
        <Form.Item label="field1">
          <Input placeholder="field1" />
        </Form.Item>{' '}
        <Form.Item label="field1">
          <Input placeholder="field1" />
        </Form.Item>{' '}
        <Form.Item label="field1">
          <Input placeholder="field1" />
        </Form.Item>{' '}
        <Form.Item label="field1">
          <Input placeholder="field1" />
        </Form.Item>{' '}
        <Form.Item label="field1">
          <Input placeholder="field1" />
        </Form.Item>{' '}
        <Form.Item label="field1">
          <Input placeholder="field1" />
        </Form.Item>{' '}
        <Form.Item label="field1">
          <Input placeholder="field1" />
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
