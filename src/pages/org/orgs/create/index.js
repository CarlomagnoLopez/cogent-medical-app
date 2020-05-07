import React, { Component } from 'react';
import OrganizationSteps from './OrganizationSteps';
import { Card } from 'antd';
import FormOrganization from './FormOrganization';
import FormAdmin from './FormAdmin';

export default class CreateOrganization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentstep: -1,
    };
  }

  finishOrganizationDetails = (values) => {
    const { currentstep } = this.state;

    this.setState({ currentstep: currentstep + 1 });
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
            <FormAdmin finishOrganizationDetails={this.finishOrganizationDetails} />
          </Card>
        )}
        {currentstep === 2 && (
          <Card>
            <p>Please fill Organization Details</p>
            <FormAdmin finishOrganizationDetails={this.finishOrganizationDetails} />
          </Card>
        )}
        {currentstep === 3 && (
          <Card>
            <p>Please fill Organization Details</p>
            <FormAdmin finishOrganizationDetails={this.finishOrganizationDetails} />
          </Card>
        )}{' '}
        {currentstep === 4 && (
          <Card>
            <p>Please fill Organization Details</p>
            <FormAdmin finishOrganizationDetails={this.finishOrganizationDetails} />
          </Card>
        )}
      </Card>
    );
  }
}
