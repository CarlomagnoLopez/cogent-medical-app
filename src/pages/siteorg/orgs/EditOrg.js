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

class EditOrganization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      filename: '',
    };
  }

  onFinish = (values) => {
    // console.log(this.props)
    // console.log(this.props.current["mcp-1-sk"])
    let idOgr = this.props.current["mcp-1-sk"];
    let secretcode = this.props.current.secretcode;
    console.log('Received values of form: ', values);
    values.orgid = idOgr;
    values.secretcode = secretcode;


    let payload = {
      "method": "updateOrganization",
      "summaryOrg": values
    }
    // console.log("there")
    // values.file = this.state.file;
    this.props.onEditSubmit(payload);
  };
  prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
        <Option value="91">+91</Option>
        <Option value="55">+55</Option>
        <Option value="52">+52</Option>
        <Option value="1">+1</Option>
      </Select>
    </Form.Item>
  );
  handleChange = (info) => {
    console.log(JSON.stringify(info));
    let name = info.file.uid;
    let list = info.fileList.filter((item) => item.uid === name);
    console.log(JSON.stringify(list) + ' FIle Name ' + list[0].name);

    this.setState({ filename: list[0].name });
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

    let prefix = "";
    let phone = "";
    if (this.props.current) {
      if (this.props.current.phoneNumber.length < 13) {
        prefix = this.props.current.phoneNumber.substr(0, 2)
        phone = this.props.current.phoneNumber.substr(2, this.props.current.phoneNumber.length)
      } else {
        prefix = this.props.current.phoneNumber.substr(0, 3)
        phone = this.props.current.phoneNumber.substr(3, this.props.current.phoneNumber.length)
      }
    }



    return (



      <Card>
        <Modal
          closable={true}
          visible={this.props.visible}
          title="Edit Organization"
          footer={null}
          destroyOnClose
          onCancel={this.props.onCancel}
        >
          <Form
            labelCol={{
              xs: {
                span: 24,
              },
              sm: {
                span: 10,
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
            onFinish={this.onFinish}
            validateMessages={validateMessages}
            initialValues={{
              // prefix: '86',prefix
              prefix: prefix,
              orgName: this.props.current.orgname,
              contactName: this.props.current.contactName,
              contactEmail: this.props.current.contactEmail,
              orgWesite: this.props.current.website,
              phoneNumber: phone,
              faxNumber: this.props.current.faxNumber,
              taxNumber: this.props.current.taxNumber,
            }}
          >
            <Form.Item label="Organization Name" name="orgName" rules={[{ required: true }]}>
              <Input placeholder="Organization Name" id="organizationname" disabled />
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
            {/* <Form.Item label="Logo">
              <Form.Item name="logo">
                <Upload
                  name="files"
                  accept=".jpeg,.png"
                  multiple={false}
                  showUploadList={false}
                  onChange={this.handleChange}
                  beforeUpload={(file, fileList) => {
                    console.log(JSON.stringify(fileList));
                    const reader = new FileReader();
                    reader.readAsText(file);
                    this.setState({ file: file });
                    // Prevent upload
                    return false;
                  }}
                >
                  <Button type="primary">Upload File</Button>
                  {this.state.filename != undefined ? this.state.filename : ''}
                </Upload>
              </Form.Item>
            </Form.Item> */}
            <Form.Item label="Contact Name" name="contactName" rules={[{ required: true }]}>
              <Input placeholder="Contact Name" id="contactname" />
            </Form.Item>
            <Form.Item
              label="Contact Email"
              name="contactEmail"
              rules={[{ required: true, type: 'email' }]}
            >
              <Input placeholder="Contact Email" id="contactemail" />
            </Form.Item>
            <Form.Item
              label="Website"
              name="orgWesite"
              rules={[
                { required: true },
                {
                  //type: 'url',
                  pattern:
                    '^(http://|https://)?(www.)?([a-zA-Z0-9]+).[a-zA-Z0-9]*.[a-z]{3}.?([a-z]+)?$',

                  message: 'The website is in the wrong format!',
                },
              ]}
            >
              <Input placeholder="Website" id="website" />
            </Form.Item>
            <Form.Item label="office phone" name="phoneNumber" rules={[{
              required: true,
              asyncValidator: (rule, value) => {
                return new Promise((resolve, reject) => {
                  if (isNaN(value)) {
                    // }
                    // console.log(rule)
                    // if (value < 18) {
                    reject('It does not accept this value');  // reject with error message
                  } else {
                    resolve();
                  }
                });
              }


            }]}>
              <Input
                maxLength={10}
                addonBefore={this.prefixSelector}
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>
            {/* <Form.Item label="office fax" name="faxNumber" rules={[{ required: true }]}>
              <Input placeholder="office fax" id="faxnumber" />
            </Form.Item> */}
            <Form.Item label="tax number" name="taxNumber" rules={[{ required: true }]}>
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
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    );
  }
}

export default EditOrganization;
