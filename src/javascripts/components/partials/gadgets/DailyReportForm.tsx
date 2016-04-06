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
  errorValueKeys: string[];
  name?: string;
  firstContent?: string;
  secondContent?: string;
  thirdContent?: string;
  fourthContent?: string;
}

interface Item {
  label: string;
  stateKey: string;
  placeholder?: string;
  value?: string;
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
  column: element('column'),
  nameColumn: element('column name'),
  submitRow: element('row submit'),
}));

export class DailyReportForm extends React.Component<Props, State> {
  state: State = {
    errorValueKeys: [],
  };

  render() {
    const {state} = this;
    return (
      <form className={c.root} onSubmit={this.handleSubmit}>
        <h1 className={c.heading}>ニッポーイボーイ</h1>
        <div className={c.row}>
          <div className={c.nameColumn}>
            <label>氏名 (*)
              <Input
                value={state.name}
                onChange={this.buildChangeHandler('name')}
                hasError={includes(state.errorValueKeys, 'name')}
                maximized
              />
            </label>
          </div>
        </div>
        {buildItems(state).map((items, i) =>
          <div key={i} className={c.row}>
            {items.map((item) =>
              <div key={item.label} className={c.column}>
                <label>{item.label}
                  <TextArea
                    rows={10}
                    placeholder={item.placeholder}
                    value={item.value}
                    hasError={includes(state.errorValueKeys, item.stateKey)}
                    onChange={this.buildChangeHandler(item.stateKey)}
                  />
                </label>
              </div>
            )}
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
      this.setState({ errorValueKeys: [] });
      props.onSubmit({
        name: state.name,
        firstContent: state.firstContent,
        secondContent: state.secondContent,
        thirdContent: state.thirdContent,
        fourthContent: state.fourthContent,
      });
    } else {
      this.setState({
        errorValueKeys: RequiredValueKeys.filter((key) => (state  as any)[key] == null),
      });
    }
  };

  private buildChangeHandler(key: string) {
    return (value: string) => this.setState({
      errorValueKeys: this.state.errorValueKeys,
      [key]: value,
    });
  }
}

function buildItems(state: State): Item[][] {
  return [
    [
      { label: '本日の業務 (*)',
        value: state.firstContent,
        stateKey: 'firstContent',
      },
      { label: '明日の業務 (*)',
        value: state.secondContent,
        stateKey: 'secondContent',
      },
    ],
    [
      { label: '本日の業務で気付いたこと・学んだこと (*)',
        value: state.thirdContent,
        stateKey: 'thirdContent',
      },
      { label: 'その他',
        placeholder: '今日頑張っていた人などをあげてみよう（ポイ）',
        value: state.fourthContent,
        stateKey: 'fourthContent',
      },
    ],
  ];
}

function includes<T>(array: T[], value: T): boolean {
  return array.indexOf(value) !== -1;
}
