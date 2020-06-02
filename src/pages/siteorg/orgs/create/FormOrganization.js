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
import axios from 'axios';
import * as AWS from 'aws-sdk';
import styles from './css/Org.less';
let s3 = '';
class FormOrganization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgName: '',
      contactEmail: '',
      contactName: '',
      orgWesite: '',
      phoneNumber: '',
      prefix: '',
      fileToUpload: undefined,
      uploadSuccess: undefined,
      error: undefined,
      filename: '',
    };
    const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

    var albumBucketName = 'medicalprojectlogos';
    var bucketRegion = 'us-east-1'; // Region;
    var IdentityPoolId = 'us-east-1:53d43971-6a4b-4699-935c-592476c26ea1';

    AWS.config.update({
      region: bucketRegion,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:53d43971-6a4b-4699-935c-592476c26ea1',
      }),
    });

    s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: { Bucket: 'medicalprojectlogos' },
    });
  }

  onChange = (e) => {
    console.log('Org Name Changed' + e.target.value);
    this.setState({ orgName: e.target.value });
  };
  onFinish = (values) => {
    console.log('Received values of form: ', values);
    values.file = this.state.file;
    //    this.uploadLogo(values.file);

    // this.uploadFile(values.orgName, this.state.fileToUpload);
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

    const normFile = (e) => {
      console.log('Upload event:', JSON.stringify(e.file));
      this.setState({ fileToUpload: e.file.originFileObj });
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    };
    const { orgdetails } = this.props;
    console.log('OrgDetails ' + JSON.stringify(orgdetails));
    const propsi = {
      onChange: this.handleChange,
      multiple: false,
    };
    return (


      <div className={styles.content}>

        <div className={styles.wrapper}>

          {/* <Card title="" bordered={false} className={styles.cardContent}> */}
            <div className={styles.stepsContent}>

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
                onFinish={this.onFinish}
                validateMessages={validateMessages}
                initialValues={{
                  prefix: '86',
                  contactName: orgdetails != undefined ? orgdetails.contactName : '',
                  faxNumber: orgdetails != undefined ? orgdetails.faxNumber : '',
                  orgName: orgdetails != undefined ? orgdetails.orgName : '',
                  contactEmail: orgdetails != undefined ? orgdetails.contactEmail : '',
                  orgWesite: orgdetails != undefined ? orgdetails.orgWesite : '',
                  taxNumber: orgdetails != undefined ? orgdetails.taxNumber : '',
                  phoneNumber: orgdetails != undefined ? orgdetails.phoneNumber : '',
                  prefix: orgdetails != undefined ? orgdetails.prefix : '86',
                }}
              >
                <Form.Item
                  label="Organization Name"
                  name="orgName"
                  rules={[{ required: true }]}
                  value={orgdetails != undefined ? orgdetails.orgName : ''}
                >
                  <Input placeholder="Organization Name" id="organizationname" />
                </Form.Item>

                <Form.Item label="Contact Name" name="contactName" rules={[{ required: true }]}>
                  <Input placeholder="Contact Name" id="contactname" />
                </Form.Item>
                <Form.Item
                  label="Contact Email"
                  name="contactEmail"
                  value={orgdetails != undefined ? orgdetails.contactEmail : ''}
                  rules={[{ required: true, type: 'email' }]}
                >
                  <Input placeholder="Contact Email" id="contactemail" />
                </Form.Item>
                <Form.Item
                  label="Website"
                  name="orgWesite"
                  value={orgdetails != undefined ? orgdetails.orgWesite : ''}
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
                {/* <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          // extra=""

        >
          <Upload name="logo">
            <Button>Upload</Button>
          </Upload>
        </Form.Item>{' '} */}
                <Form.Item label="office phone" name="phoneNumber" rules={[{ required: true }]}>
                  <Input
                    addonBefore={this.prefixSelector}
                    style={{
                      width: '100%',
                    }}
                  />
                </Form.Item>
                <Form.Item label="Logo">
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
                </Form.Item>
                {/* <Form.Item label="office fax" name="faxNumber" rules={[{ required: true }]}>
          <Input placeholder="office fax" id="faxnumber" />
        </Form.Item>
        <Form.Item label="tax number" name="taxNumber" rules={[{ required: true }]}>
          <Input placeholder="tax number" id="taxnumber" />
        </Form.Item> */}
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
                  <Button type="primary" htmlType="submit" className={styles.btnSteps} >
                    Next
                  </Button>
                </Form.Item>
              </Form>
            </div>


          {/* </Card> */}
        </div>
      </div>


    );
  }
}

export default FormOrganization;
