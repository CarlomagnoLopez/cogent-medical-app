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
    this.props.finishOrganizationDetails(values);
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

  goBack = (e) => {
    e.preventDefault();
    this.props.onPressBack();
  };
  render() {
    const { tempinitialValues } = this.props;
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
    return (
      <Card>
        <Form
          onFinish={this.onFinish}
          validateMessages={validateMessages}
          initialValues={{
            prefix: '86',
            tempinitialValues,
            contactName: tempinitialValues != undefined ? tempinitialValues.contactName : '',
            email: tempinitialValues != undefined ? tempinitialValues.email : '',
            phoneNumber: tempinitialValues != undefined ? tempinitialValues.phoneNumber : '',
            prefix: tempinitialValues != undefined ? tempinitialValues.prefix : '86',
          }}
        >
          {/*<Form.Item label="Company Name" name="companY" rules={[{ required: true }]}>
            <Input placeholder="Company Name" id="companyname" name="companyname" />
        </Form.Item>*/}
          {/*<Form.Item label="Role" name="role" rules={[{ required: true }]}>
            <Input placeholder="Role" id="role" value={this.props.type} />
          </Form.Item>*/}
          <Form.Item label="Contact Name" name="contactName" rules={[{ required: true }]}>
            <Input placeholder="Contact Name" id="contactname" />
          </Form.Item>
          <Form.Item label="Contact Number" name="phoneNumber" rules={[{ required: true }]}>
            <Input
              addonBefore={this.prefixSelector}
              placeholder="Contact Number"
              id="contactnumber"
            />
          </Form.Item>
          <Form.Item label="Contact Email" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input placeholder="Contact Email" id="contactemail" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={this.goBack}>
              Back
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default FormAdmin;
