'use strict';

import * as React from 'react';

import {DailyReport} from '../../constants/DailyReport';

import {IndexView} from '../views/IndexView';

export class IndexController extends React.Component<any, any> {
  render() {
    return (
      <IndexView
        onDailyReportSubmit={this.handleDailyReportSubmit}
      />
    );
  }

  private handleDailyReportSubmit = (report: DailyReport) => {
    const to = 'hr-development@mixi.co.jp';
    const cc = '16shinsotsu-all@mixi.co.jp';
    const subject = `【日報】${today()} 16新卒 ${report.name}`;
    const requiredBody = buildRequiredBody(report);
    const optionalBody = buildOptionalBody(report);
    const body = requiredBody + optionalBody;
    const href = `mailto:${to}?cc=${cc}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    location.href = href;
  };
}

function today(): string {
  const now = new Date;
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  return `${year}/${forceTwoDigit(month)}/${forceTwoDigit(date)}`;
}

function forceTwoDigit(n: number): string {
  return `0${n}`.slice(-2);
}

function buildRequiredBody(report: DailyReport): string {
  return `1、本日の業務
${report.firstContent}

2、明日の業務
${report.secondContent}

3、本日の業務で気づいたこと・学んだこと
${report.thirdContent}`;
}

function buildOptionalBody(report: DailyReport): string {
  return report.fourthContent == null ? '' :
`

4、今日の目標と振り返り
${report.fourthContent}`;
}
