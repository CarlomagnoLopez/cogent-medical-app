import React, { Component } from 'react';
import { Icon, Steps, Card } from 'antd';
import styles from './css/Org.less';
const { Step } = Steps;
import { ScheduleOutlined, SolutionOutlined, QuestionCircleOutlined,SmileOutlined   } from '@ant-design/icons';

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
            <Step description={""} title={'Organization'}icon= {<ScheduleOutlined />} />
            <Step description={""} title={'Org Admin1'}icon= {<SolutionOutlined />} />
            <Step description={""} title={'Org Admin2'}icon= {<SolutionOutlined />} />
            <Step description={""} title={'Approver1'}icon= {<QuestionCircleOutlined />} />
            <Step description={""} title={'Approver2'}icon= {<QuestionCircleOutlined />} />
            <Step description={""} title={'Finish'}icon= {<SmileOutlined />} />
        </Steps>
      </Card>
    );
  }
}
