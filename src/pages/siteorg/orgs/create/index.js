import React, { Component } from 'react';
import OrganizationSteps from './OrganizationSteps';
import { Card, Button, Spin, message, Result } from 'antd';
import FormOrganization from './FormOrganization';
import FormAdmin from './FormAdmin';
import { connect, history } from 'umi';
import * as AWS from 'aws-sdk';
import styles from './css/Org.less';
import { ClusterOutlined, CheckOutlined } from '@ant-design/icons';

let s3 = '';

class CreateOrganization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentstep: 0,
      orgName: '',
      organizationDetails: [],
      admin1Details: [],
      admin2Details: [],
      approverDetails: [],
      approver2Details: [],
      loading: false,
    };

    const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

    var albumBucketName = 'medicalprojectlogos';
    var bucketRegion = 'us-east-1'; // Region;
    var IdentityPoolId = 'us-east-1:53d43971-6a4b-4699-935c-592476c26ea1';

    AWS.config.update({
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    });

    s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: { Bucket: 'medicalprojectlogos' },
    });
  }

  //const awssdk = require('aws-sdk');

  uploadLogo = (albumName) => {
    console.log(albumName);
  };

  finishAdminDetails = (values) => {
    const { currentstep } = this.state;
    console.log('Admin Details ' + JSON.stringify(values));
    this.setState({ admin1Details: values, currentstep: currentstep + 1 });
  };
  finishAdmin2Details = (values) => {
    const { currentstep } = this.state;
    console.log('Admin2 Details ' + JSON.stringify(values));
    this.setState({ admin2Details: values, currentstep: currentstep + 1 });
  };
  finishApproverDetails = (values) => {
    const { currentstep } = this.state;
    console.log('Approver Details ' + JSON.stringify(values));
    this.setState({ approverDetails: values, currentstep: currentstep + 1 });
  };
  finishApprover2Details = (values) => {
    const { currentstep } = this.state;
    console.log('Approver2 Details ' + JSON.stringify(values));
    this.setState({ approver2Details: values, currentstep: currentstep + 1 });
  };

  onPressBack = () => {
    const { currentstep } = this.state;
    console.log('Back Pressed');
    if (currentstep > 0) {
      this.setState({ currentstep: currentstep - 1 });
    }
  };

  createOrganization = (e) => {
    e.preventDefault();
    const { loading } = this.state;
    this.setState({ loading: true });

    const reader = new FileReader();

    // const buffer = reader.readAsBinaryString(this.state.file);
    //reader.readAsText(file);
    const { organizationDetails } = this.state;
    let params = {
      Body: organizationDetails.file,
      Key: organizationDetails.orgName.trim().split(' ').join('') + '.jpeg',
      ACL: 'public-read',
    };

    s3.putObject(params, function (err, data) {
      console.log('Data ' + JSON.stringify(data) + ' Error ' + JSON.stringify(err));

      if (err) {
        message.error('There was an error creating your album: ' + err.message);
      }
      message.success('Successfully uploaded logo.');
      //    console.log(albumName);
    });

    let tempsummaryOrg = this.state.organizationDetails;
    const tempprefix = tempsummaryOrg.prefix;
    tempsummaryOrg.phoneNumber = '+' + tempprefix + tempsummaryOrg.phoneNumber;

    var tempadmin1Details = this.state.admin1Details;
    var tempprefix1 = tempadmin1Details.prefix;
    tempadmin1Details.phoneNumber = '+' + tempprefix1 + tempadmin1Details.phoneNumber;
    tempadmin1Details.role = 'OrgAdmin';
    console.log('Admin 1 Details ' + JSON.stringify(tempadmin1Details));

    var tempadmin2Details = this.state.admin2Details;
    var tempprefix2 = tempadmin2Details.prefix;
    tempadmin2Details.phoneNumber = '+' + tempprefix2 + tempadmin2Details.phoneNumber;
    tempadmin2Details.role = 'OrgAdmin';

    console.log('Admin 2 Details ' + JSON.stringify(tempadmin2Details));

    var tempapprovalDetails = this.state.approverDetails;
    var tempprefix3 = tempapprovalDetails.prefix;
    tempapprovalDetails.phoneNumber = '+' + tempprefix3 + tempapprovalDetails.phoneNumber;
    tempapprovalDetails.role = 'OrgApproval';

    console.log('Approval 1 Details ' + JSON.stringify(tempapprovalDetails));

    var tempapproval2Details = this.state.approver2Details;
    var tempprefix4 = tempapproval2Details.prefix;
    tempapproval2Details.phoneNumber = '+' + tempprefix4 + tempapproval2Details.phoneNumber;
    tempapproval2Details.role = 'OrgApproval';

    console.log('Approval 2 Details ' + JSON.stringify(tempapproval2Details));

    let organizationData = {};

    (organizationData.summaryOrg = tempsummaryOrg),
      (organizationData.usersOrg = [
        tempadmin1Details,
        tempadmin2Details,
        tempapproval2Details,
        tempapprovalDetails,
      ]);
    console.log('Organization Creation Data ' + JSON.stringify(organizationData));
    this.props.dispatch({
      type: 'organization/createOrganization',
      payload: organizationData,
    });

    const _Self = this;
    setTimeout(() => {
      _Self.props.dispatch({
        type: 'organization/resetOrganizationStatusA',
        payload: [],
      });
      this.setState({ loading: false });
    }, 3000);
  };

  finishOrganizationDetails = (values) => {
    const { currentstep, organizationDetails } = this.state;
    console.log('Org Details ' + values);
    this.setState({ organizationDetails: values, currentstep: currentstep + 1 });
  };

  render() {
    const { currentstep } = this.state;

    const { status } = this.props;
    if (status.logResponse != undefined) {
      console.log(JSON.stringify(status));

      console.log('Status ' + JSON.stringify(status));
      if (status.logResponse.length > 0) {
        status.logResponse.map((res) => {
          if (res.createOrg) message.success('Organization Created!');
        });
        // message.success('Organization Created!');
        history.push('/');
      }
      if (status.logResponse[0].success === false) {
        //history.goBack();
        message.error('Error while creating organization!');
      }
    }

    return (
      <Spin spinning={this.state.loading}>
        <Card>
          <OrganizationSteps currentstep={this.state.currentstep} />
          {currentstep === 0 && (
            <Card>
              {/* <p>Please fill Organization Details</p> */}
              <FormOrganization
                finishOrganizationDetails={this.finishOrganizationDetails}
                orgdetails={this.state.organizationDetails}
              />
            </Card>
          )}
          {currentstep === 1 && (
            <Card>
              {/* <p>Please fill Organization Details</p> */}
              <FormAdmin
                finishOrganizationDetails={this.finishAdminDetails}
                onPressBack={this.onPressBack}
                type="Admin1"
                tempinitialValues={this.state.admin1Details}
              />
            </Card>
          )}
          {currentstep === 2 && (
            <Card>
              {/* <p>Please fill Organization Details</p> */}
              <FormAdmin
                finishOrganizationDetails={this.finishAdmin2Details}
                onPressBack={this.onPressBack}
                type="Admin2"
                tempinitialValues={this.state.admin2Details}
              />
            </Card>
          )}
          {currentstep === 3 && (
            <Card>
              {/* <p>Please fill Organization Details</p> */}
              <FormAdmin
                finishOrganizationDetails={this.finishApproverDetails}
                onPressBack={this.onPressBack}
                type="Approval1"
                tempinitialValues={this.state.approverDetails}
              />
            </Card>
          )}{' '}
          {currentstep === 4 && (
            <Card>
              {/* <p>Please fill Organization Details</p> */}
              <FormAdmin
                finishOrganizationDetails={this.finishApprover2Details}
                onPressBack={this.onPressBack}
                type="Approval2"
                tempinitialValues={this.state.approver2Details}
              />
            </Card>
          )}
          {currentstep === 5 && (
            <Card>
              {/* <Button onClick={this.createOrganization}>Finish</Button> */}
              <div className={styles.content}>
                <div className={styles.wrapper}>
                  {/* <Card title="" bordered={false} className={styles.cardContent}> */}
                  <div className={styles.stepsContent}>
                    <Result
                      icon={<ClusterOutlined />}
                      title="Have you already finish?"
                      extra={
                        <Button onClick={this.createOrganization} type="primary">
                          Create it!!{' '}
                        </Button>
                      }
                    />
                  </div>
                </div>
              </div>
            </Card>
          )}
        </Card>
      </Spin>
    );
  }
}
export default connect(({ organization }) => ({
  organization,
  status: organization.status,
}))(CreateOrganization);
