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
  Table
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
    const MessageColumns = [
      {
        title: 'Messages',
        dataIndex: 'Messages',
        key: 'Messages',
      },
    ];
    const MessageData = [
      {
        Key : 1,
        Messages : "Messages 1"
      },
      {
        Key : 2,
        Messages : "Messages 2"
      },
      {
        Key : 3,
        Messages : "Messages 3"
      },
      {
        Key : 4,
        Messages : "Messages 4"
      },
    ];



    const onFinish = (values) => {
      console.log('Received values of form: ', values);
    };
    return (
      <div>

         <div className="MessageDisplay">
         <Table columns={MessageColumns} dataSource={MessageData} />
         </div>


        <Form className="SendMessage" onFinish={this.onFinish}>
        <Form.Item label="Message">
        <Input.TextArea className="MessageBox"/>
        </Form.Item>
        <Button className="SendButton" type="primary" htmlType="submit">
              Send
        </Button>
        </Form>
      </div>
    );
  }
}

export default NotificationComponent;
