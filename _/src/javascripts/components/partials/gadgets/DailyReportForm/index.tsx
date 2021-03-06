'use strict';

import * as React from 'react';
import * as Storage from 'localforage';
import * as classnames from 'classnames';

import {DailyReport} from '../../../../constants/DailyReport';

import {today} from '../../../../misc/Date';

import {Input} from '../../elements/Input';
import {Button} from '../../elements/Button';
import {TextArea} from '../../elements/TextArea';

import {ClassNames as CN} from './constants';

interface Props extends React.Props<any> {
  heading: string;
  headingRuby?: string;
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

interface CacheDailyReport {
  name: string;
  firstContent?: string;
  secondContent?: string;
  thirdContent?: string;
  fourthContent?: string;
}

interface Item {
  label: string;
  stateKey: string;
  storageKey: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
}

const StorageKeys = {
  dailyReport: {
    name: 'daily-report-name',
    firstContent: 'daily-report-first-content',
    secondContent: 'daily-report-second-content',
    thirdContent: 'daily-report-third-content',
    fourthContent: 'daily-report-fourth-content',
  },
  lastSavedAt: 'last-saved-at',
};

const RequiredValueKeys = [
  'name',
  'firstContent',
  'secondContent',
  'thirdContent',
];

const c = {
  root: CN.root.base,
  heading: CN.heading.base,
  headingRuby: CN.headingRuby.base,
  row: CN.row.base,
  column: CN.column.base,
  nameColumn: CN.nameColumn.base,
  label: (required: boolean = false) => classnames(CN.label.base, {
    [CN.label.mods.required]: required,
  }),
  submitRow: classnames(CN.row.base, {
    [CN.row.mods.submit]: true,
  }),
};

export class DailyReportForm extends React.Component<Props, State> {
  state: State = {
    errorValueKeys: [],
  };

  componentWillMount() {
    this.restoreDailyReport();
  }

  render() {
    const {props, state} = this;
    return (
      <div className={c.root}>
        <h1 className={c.heading}>
          <ruby>
            {props.heading}
            {props.headingRuby &&
              <rt className={c.headingRuby}>{props.headingRuby}</rt>
            }
          </ruby>
        </h1>
        <form onSubmit={this.handleSubmit}>
          <div className={c.row}>
            <div className={c.nameColumn}>
              <label className={c.label(true)} htmlFor="name">氏名</label>
              <Input
                id="name"
                value={state.name}
                onChange={this.buildChangeHandler('name', StorageKeys.dailyReport.name)}
                hasError={includes(state.errorValueKeys, 'name')}
                maximized
              />
            </div>
          </div>
          {buildItems(state).map((items, i) =>
            <div key={i} className={c.row}>
              {items.map((item) =>
                <div key={item.label} className={c.column}>
                  <label
                    className={c.label(item.required)}
                    htmlFor={item.stateKey}
                  >
                    {item.label}
                  </label>
                  <TextArea
                    id={item.stateKey}
                    rows={10}
                    placeholder={item.placeholder}
                    value={item.value}
                    hasError={includes(state.errorValueKeys, item.stateKey)}
                    onChange={this.buildChangeHandler(item.stateKey, item.storageKey)}
                  />
                </div>
              )}
            </div>
          )}
          <div className={c.submitRow}>
            <Button type="submit" skin="primary" maximized>ポイする</Button>
          </div>
        </form>
      </div>
    );
  }

  private handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!this.props.onSubmit) {
      return;
    }
    if (this.satisfiesFormRequirements()) {
      const report = this.buildDailyReport();
      this.clearErrors();
      this.props.onSubmit(report);
    } else {
      this.setErrors();
    }
  };

  private buildChangeHandler(key: string, storageCacheKey: string) {
    return (value: string) => {
      const nextState = Object.assign({}, this.state, {[key]: value});
      this.setState(nextState);
      this.cacheOnStorage(value, storageCacheKey);
    };
  }

  private restoreDailyReport(): void {
    Promise.all<string>([
      Storage.getItem<string>(StorageKeys.lastSavedAt),
      Storage.getItem<string>(StorageKeys.dailyReport.name),
      Storage.getItem<string>(StorageKeys.dailyReport.firstContent),
      Storage.getItem<string>(StorageKeys.dailyReport.secondContent),
      Storage.getItem<string>(StorageKeys.dailyReport.thirdContent),
      Storage.getItem<string>(StorageKeys.dailyReport.fourthContent),
    ])
      .then(([lastSavedAt, name, firstContent, secondContent, thirdContent, fourthContent]: any[]) =>
        lastSavedAt === today()
          ? {name, firstContent, secondContent, thirdContent, fourthContent}
          : {name}
      )
      .then((cachedDailyReport) => {
        const nextState = Object.assign({}, this.state, cachedDailyReport);
        this.setState(nextState);
      });
  }

  private cacheOnStorage<T>(value: T, cacheKey: string): void {
    Storage.setItem(cacheKey, value);
    Storage.setItem(StorageKeys.lastSavedAt, today());
  }

  private buildDailyReport(): DailyReport {
    const {state} = this;
    return {
      name: state.name,
      firstContent: state.firstContent,
      secondContent: state.secondContent,
      thirdContent: state.thirdContent,
      fourthContent: state.fourthContent,
    };
  }

  private satisfiesFormRequirements(): boolean {
    const requirementSatisfied = detectValueExistence(this.state);
    return RequiredValueKeys.every(requirementSatisfied);
  }

  private clearErrors(): void {
    this.setState({errorValueKeys: []});
  }

  private setErrors(): void {
    const requirementNotSatisfied = detectValueAbsence(this.state);
    const errorValueKeys = RequiredValueKeys.filter(requirementNotSatisfied);
    this.setState({errorValueKeys});
  }
}

function buildItems(state: State): Item[][] {
  return [
    [
      { label: '本日の業務',
        value: state.firstContent,
        stateKey: 'firstContent',
        storageKey: StorageKeys.dailyReport.firstContent,
        required: true,
      },
      { label: '明日の業務',
        value: state.secondContent,
        stateKey: 'secondContent',
        storageKey: StorageKeys.dailyReport.secondContent,
        required: true,
      },
    ],
    [
      { label: '本日の業務で気付いたこと・学んだこと',
        value: state.thirdContent,
        stateKey: 'thirdContent',
        storageKey: StorageKeys.dailyReport.thirdContent,
        required: true,
      },
      { label: 'その他',
        placeholder: '今日頑張っていた人などをあげてみよう！（ポイ）',
        value: state.fourthContent,
        stateKey: 'fourthContent',
        storageKey: StorageKeys.dailyReport.fourthContent,
      },
    ],
  ];
}

function includes<T>(array: T[], value: T): boolean {
  return array.indexOf(value) !== -1;
}

function detectValueExistence(state: State) {
  const s = state as any;
  return (key: string) => (s[key] != null && s[key] !== '');
}

function detectValueAbsence(state: State) {
  return (key: string) => !detectValueExistence(state)(key);
}
