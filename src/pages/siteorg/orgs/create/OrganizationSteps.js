import React, { Component } from 'react';
import { Icon, Steps, Card } from 'antd';
import styles from './css/Org.less';
const { Step } = Steps;
const orgsteps = [
  {
    key: 0,
    title: 'Organization',
    content: '',
    icon: 'schedule',
  },
  {
    key: 1,
    title: 'Org Admin1',
    content: '',
    description: '',
    icon: 'solution',
  },
  {
    key: 2,
    title: 'Org Admin2',
    content: '',
    description: '',
    icon: 'question-circle-o',
  },
  {
    key: 3,
    title: 'Approver1',
    content: '',
    description: '',
    icon: 'share-alt',
  },
  {
    key: 4,
    title: 'Approver2',
    content: '',
    description: '',
    icon: 'share-alt',
  },
  {
    key: 5,
    title: 'Finish',
    content: '',
    description: '',
    icon: 'share-alt',
  },
];

export default class OrganizationSteps extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Card className={styles.containerStep}>
        <Steps current={this.props.currentstep}>
          {orgsteps.map((item) => (
            <Step
              key={item.key}
              description={item.description}
              title={item.title}
              icon={<Icon type={item.icon} />}
            />
          ))}
        </Steps>
      </Card>
    );
  }
}
