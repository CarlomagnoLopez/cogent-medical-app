import React, { Component } from 'react';
import { Icon, Steps, Card } from 'antd';
import styles from './css/Org.less';
const { Step } = Steps;
import { ScheduleOutlined, SolutionOutlined, QuestionCircleOutlined, SmileOutlined } from '@ant-design/icons';

const orgsteps = [
  {
    key: 0,
    title: 'Organization',
    content: '',
    icon: 'schedule',
  },
  {
    key: 1,
    title: 'Admin 1',
    content: '',
    description: '',
    icon: 'solution',
  },
  {
    key: 2,
    title: 'Admin 2',
    content: '',
    description: '',
    icon: 'question-circle-o',
  },
  {
    key: 3,
    title: 'Approver 1',
    content: '',
    description: '',
    icon: 'share-alt',
  },
  {
    key: 4,
    title: 'Approver 2',
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
          <Step description={""} title={orgsteps[0].title} key={orgsteps[0].title}  icon={<ScheduleOutlined />} />
          <Step description={""} title={orgsteps[1].title} key={orgsteps[0].title}   icon={<SolutionOutlined />} />
          <Step description={""} title={orgsteps[2].title} key={orgsteps[0].title}  icon={<SolutionOutlined />} />
          <Step description={""} title={orgsteps[3].title} key={orgsteps[0].title}  icon={<QuestionCircleOutlined />} />
          <Step description={""} title={orgsteps[4].title} key={orgsteps[0].title}  icon={<QuestionCircleOutlined />} />
          <Step description={""} title={orgsteps[5].title} key={orgsteps[0].title}  icon={<SmileOutlined />} />
        </Steps>
      </Card>
    );
  }
}
