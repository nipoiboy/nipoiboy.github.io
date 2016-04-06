'use strict';

import * as React from 'react';

import {DailyReport} from '../../../constants/DailyReport';

import {BEM} from '../../../misc/BEM';

import {Input} from '../elements/Input';
import {Button} from '../elements/Button';
import {TextArea} from '../elements/TextArea';

interface Props extends React.Props<any> {
  onSubmit?(dailyReport: DailyReport): any;
}

interface State {
  name?: string;
  firstContent?: string;
  secondContent?: string;
  thirdContent?: string;
  fourthContent?: string;
}

const RequiredValueKeys = [
  'name',
  'firstContent',
  'secondContent',
  'thirdContent',
];

const c = BEM('DailyReportForm', (block, element) => ({
  root: block(),
  heading: element('heading'),
  row: element('row'),
  submitRow: element('row submit'),
}));

export class DailyReportForm extends React.Component<Props, State> {
  state: State = {};

  render() {
    const {props, state} = this;
    return (
      <form className={c.root} onSubmit={this.handleSubmit}>
        <h1 className={c.heading}>ニッポーイボーイ</h1>
        <div className={c.row}>
          <label>名前 (*)
            <Input
              value={state.name}
              onChange={this.buildChangeHandler('name')}
            />
          </label>
        </div>
        {[
          { label: '本日の業務 (*)',
            placeholder: '',
            value: state.firstContent,
            stateKey: 'firstContent',
          },
          { label: '明日の業務 (*)',
            placeholder: '',
            value: state.secondContent,
            stateKey: 'secondContent',
          },
          { label: '本日の業務で気付いたこと・学んだこと (*)',
            placeholder: '',
            value: state.thirdContent,
            stateKey: 'thirdContent',
          },
          { label: 'その他',
            placeholder: '今日頑張っていた人などをあげてみよう（ポイ）',
            value: state.fourthContent,
            stateKey: 'fourthContent',
          },
        ].map((item) =>
          <div key={item.label} className={c.row}>
            <label>{item.label}
              <TextArea
                rows={10}
                placeholder={item.placeholder}
                value={item.value}
                onChange={this.buildChangeHandler(item.stateKey)}
              />
            </label>
          </div>
        )}
        <div className={c.submitRow}>
          <Button type="submit" skin="primary" maximized>メールを作成（ポイ）</Button>
        </div>
      </form>
    );
  }

  private handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const {props, state} = this;
    if (!props.onSubmit) {
      return;
    }
    if (RequiredValueKeys.every((key) => (state as any)[key] != null)) {
      props.onSubmit(this.state as any);
    }
  };

  private buildChangeHandler(key: string) {
    return (value: string) => this.setState({[key]: value});
  }
}