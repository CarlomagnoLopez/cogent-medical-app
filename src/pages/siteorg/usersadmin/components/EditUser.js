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
  onFinish = (values) => {
    console.log('Received values of form: ', values);
    this.props.updateUser(values);
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

    const { currentcandidate } = this.props;
    return (
      <Modal
        closable={true}
        visible={this.props.visible}
        title="Edit User"
        footer={null}
        onCancel={this.props.onCancel}
      >
        <Form onFinish={this.onFinish}>
          <Form.Item label="Organization Name" name="name" initialValue={'OrgName'}>
            <Input placeholder="Organization Name" id="error" disabled />
          </Form.Item>
          <Form.Item label="Org Admin Id" name="orgid" initialValue={'9a8hdua8a'}>
            <Input placeholder="Org admin Id" id="error" disabled />
          </Form.Item>
          <Form.Item label="Contact Name" name="">
            <Input placeholder="Contact Name" id="error" />
          </Form.Item>
          <Form.Item label="Contact Email">
            <Input placeholder="Contact Email" id="error" />
          </Form.Item>
          <Form.Item label="Contact Number">
            <Input placeholder="Contact Number" />
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
