'use strict';

import * as React from 'react';

import {DailyReport} from '../../constants/DailyReport';

import {DailyReportForm} from '../partials/gadgets/DailyReportForm';

interface Props extends React.Props<any> {
  onDailyReportSubmit?(dailyReport: DailyReport): any;
}

export class IndexView extends React.Component<Props, any> {
  render() {
    const {props} = this;
    return (
      <DailyReportForm onSubmit={props.onDailyReportSubmit} />
    );
  }
}
