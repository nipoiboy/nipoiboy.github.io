'use strict';

import * as React from 'react';

import {ClassNames as CN} from './constants';

const c = {
  root: CN.root.base,
  inner: CN.inner.base,
};

export class DailyReportFormContainerLayout extends React.Component<any, any> {
  render() {
    const {props} = this;
    return (
      <div className={c.root}>
        <div className={c.inner}>
          {props.children}
        </div>
      </div>
    );
  }
}
