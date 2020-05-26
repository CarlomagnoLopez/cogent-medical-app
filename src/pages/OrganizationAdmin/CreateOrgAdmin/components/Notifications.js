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
  Switch,
  InputNumber,
  Upload,
  message,
} from 'antd';
import "./Notifications.css";
import { Link } from 'dva';
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const AutoCompleteOption = AutoComplete.Option;
import TextArea from 'antd/lib/input/TextArea';
const Option = Select.Option;

const Dragger = Upload.Dragger;
import { SmileOutlined } from '@ant-design/icons';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';

class NotificationComponent extends Component {
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



    const onFinish = (values) => {
      console.log('Received values of form: ', values);
    };
    return (
      <Modal
        closable={true}
        visible={this.props.visible}
        title="Notification"
        cancelText="Cancel"
        onCancel={this.props.onCancel}
        maskClosable={false}
        onOk={this.props.onOk}
      >

         <div className="MessageDisplay">

        </div>
        <Form onFinish={this.onFinish}>
        <Form.Item  label="Message">
        <Input.TextArea />
        </Form.Item>
        <Button type="primary" htmlType="submit">
              Send
        </Button>
        </Form>
      </Modal>
    );
  }
}

export default NotificationComponent;
