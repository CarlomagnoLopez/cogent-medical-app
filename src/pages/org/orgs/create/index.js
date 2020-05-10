import React, { Component } from 'react';
import OrganizationSteps from './OrganizationSteps';
import { Card } from 'antd';
import FormOrganization from './FormOrganization';
import FormAdmin from './FormAdmin';

export default class CreateOrganization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentstep: 0,
      organizationDetails: [],
      admin1Details: [],
      admin2Details: [],
      approverDetails: [],
      approver2Details: [],
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

    if (currentstep > 0) {
      this.setState({ currentstep: currentstep - 1 });
    }
  };

  finishOrganizationDetails = (values) => {
    const { currentstep, organizationDetails } = this.state;
    console.log('Org Details ' + values);
    this.setState({ organizationDetails: values, currentstep: currentstep + 1 });
  };

  render() {
    const { currentstep } = this.state;

    return (
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
            />
          </Card>
        )}
        {currentstep === 2 && (
          <Card>
            <p>Please fill Organization Details</p>
            <FormAdmin
              finishOrganizationDetails={this.finishAdmin2Details}
              onPressBack={this.onPressBack}
            />
          </Card>
        )}
        {currentstep === 3 && (
          <Card>
            <p>Please fill Organization Details</p>
            <FormAdmin
              finishOrganizationDetails={this.finishApproverDetails}
              onPressBack={this.onPressBack}
            />
          </Card>
        )}{' '}
        {currentstep === 4 && (
          <Card>
            <p>Please fill Organization Details</p>
            <FormAdmin
              finishOrganizationDetails={this.finishApprover2Details}
              onPressBack={this.onPressBack}
            />
          </Card>
        )}
      </Card>
    );
  }
}
