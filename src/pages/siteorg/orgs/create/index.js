import React, { Component } from 'react';
import OrganizationSteps from './OrganizationSteps';
import { Card, Button, Spin, message } from 'antd';
import FormOrganization from './FormOrganization';
import FormAdmin from './FormAdmin';
import { connect, history } from 'umi';

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
  }

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
    let tempsummaryOrg = this.state.organizationDetails;
    let tempprefix = tempsummaryOrg.prefix;
    tempsummaryOrg.phoneNumber = '+' + tempprefix + tempsummaryOrg.phoneNumber;

    let tempadmin1Details = this.state.admin1Details;
    tempprefix = tempadmin1Details.prefix;
    tempadmin1Details.phoneNumber = '+' + tempprefix + tempadmin1Details.phoneNumber;
    tempadmin1Details.role = 'OrgAdmin';
    console.log('Admin 1 Details ' + JSON.stringify(tempadmin1Details));

    let tempadmin2Details = this.state.admin2Details;
    tempprefix = tempadmin2Details.prefix;
    tempadmin2Details.phoneNumber = '+' + tempprefix + tempadmin2Details.phoneNumber;
    tempadmin2Details.role = 'OrgAdmin';

    console.log('Admin 2 Details ' + JSON.stringify(tempadmin2Details));

    let tempapprovalDetails = this.state.approverDetails;
    tempprefix = tempapprovalDetails.prefix;
    tempapprovalDetails.phoneNumber = '+' + tempprefix + tempapprovalDetails.phoneNumber;
    tempapprovalDetails.role = 'OrgApproval';

    console.log('Approval 1 Details ' + JSON.stringify(tempapprovalDetails));

    let tempapproval2Details = this.state.approver2Details;
    tempprefix = tempapproval2Details.prefix;
    tempapproval2Details.phoneNumber = '+' + tempprefix + tempapproval2Details.phoneNumber;
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
    if (status != undefined) {
      console.log(JSON.stringify(status));

      console.log('Status ' + JSON.stringify(status));
      if (status.success) {
        message.success('Organization Created!');
        history.goBack();
      }
      if (status.success != undefined && status.success === false) {
        //history.goBack();
        message.error(status.log.message);
      }
    }

    return (
      <Spin spinning={this.state.loading}>
        <Card>
          <OrganizationSteps currentstep={this.state.currentstep} />
          {currentstep === 0 && (
            <Card>
              <p>Please fill Organization Details</p>
              <FormOrganization finishOrganizationDetails={this.finishOrganizationDetails} />
            </Card>
          )}
          {currentstep === 1 && (
            <Card>
              <p>Please fill Organization Details</p>
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
              <p>Please fill Organization Details</p>
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
              <p>Please fill Organization Details</p>
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
              <p>Please fill Organization Details</p>
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
              <Button onClick={this.createOrganization}>Finish</Button>
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
