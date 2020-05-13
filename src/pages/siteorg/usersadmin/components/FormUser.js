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

function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }

  function fake() {
    axios
      .get(REACT_APP_ENV + `/org/all`)
      //   .then((response) => response.json())
      .then((d) => {
        console.log(JSON.stringify(d));
        const { body } = d.data;
        const data = [];
        body.Items.forEach((r) => {
          console.log(r);
          data.push({
            value: r['mcp-1-pk'],
            text: r.orgname,
          });
        });
        callback(data);
      });
  }

  timeout = setTimeout(fake, 300);
}

class FormUser extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], value: undefined };
  }

  onFinish = (values) => {
    values.orgid = this.state.value;
    console.log('Received values of form: ', JSON.stringify(values));
    this.props.createUser(values);
  };
  handleSearch = (value) => {
    if (value) {
      fetch(value, (data) => this.setState({ data }));
    } else {
      this.setState({ data: [] });
    }
  };

  handleChange = (value) => {
    this.setState({ value });
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
    const options = this.state.data.map((d) => <Option key={d.value}>{d.text}</Option>);

    return (
      <Modal
        closable={true}
        visible={this.props.visible}
        title="Create User"
        cancelText="Cancel"
        footer={null}
        onCancel={this.props.onCancel}
      >
        <Form onFinish={this.onFinish}>
          <Row>
            <Col>
              <span>Company Name: </span>
            </Col>
            <Col span={18}>
              <Select
                showSearch
                value={this.state.value}
                placeholder={'companyName'}
                style={{ width: '80%' }}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={this.handleSearch}
                onChange={this.handleChange}
                notFoundContent={null}
              >
                {options}
              </Select>
            </Col>
          </Row>
          <p></p>
          <Form.Item label="Contact Name" name="name">
            <Input placeholder="Contact Name" id="error" />
          </Form.Item>
          <Form.Item label="Contact Email" name="email">
            <Input placeholder="Contact Email" id="error" />
          </Form.Item>
          <Form.Item label="Contact Number" name="phoneNumber">
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

export default FormUser;
