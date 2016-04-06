'use strict';

import * as React from 'react';

import {BEM} from '../../../misc/BEM';

interface Props extends React.Props<any> {
  heading: string;
}

const c = BEM('DailyReportFormContainerLayout', (block, element) => ({
  root: block(),
  inner: element('inner'),
  heading: element('heading'),
  form: element('form'),
}));

export class DailyReportFormContainerLayout extends React.Component<Props, any> {
  render() {
    const {props} = this;
    return (
      <div className={c.root}>
        <div className={c.inner}>
          <h1 className={c.heading}>{props.heading}</h1>
          <div className={c.form}>
            {props.children}
          </div>
        </div>
      </div>
    );
  }
}
