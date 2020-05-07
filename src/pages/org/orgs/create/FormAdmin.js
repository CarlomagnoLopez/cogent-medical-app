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

class FormAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [{ value: ['test company', 'cogent ibs'] }],
      roleoptions: [{ value: 'Approver' }],
    };
  }
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

    const onSearchCompanyName = (data) => {
      console.log(data);
      this.setState({ options: [{ value: ['cogent ibs', 'test company'] }] });
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

    return (
      <Card>
        <Form onFinish={this.onFinish}>
          <Form.Item label="Company Name">
            <Input placeholder="Company Name" id="error" />
          </Form.Item>
          <Form.Item label="Role">
            <Input placeholder="Role" id="error" />
          </Form.Item>
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
              Next
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default FormAdmin;
