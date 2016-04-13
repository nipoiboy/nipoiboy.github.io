'use strict';

import * as React from 'react';

import {ClassNames as CN} from './DailyReportFormContainerLayout.constants';

interface Props extends React.Props<any> {
  heading: string;
  headingRuby?: string;
}

const c = {
  root: CN.root.base,
  inner: CN.inner.base,
  heading: CN.heading.base,
  headingRuby: CN.headingRuby.base,
  form: CN.form.base,
};

export class DailyReportFormContainerLayout extends React.Component<Props, any> {
  render() {
    const {props} = this;
    return (
      <div className={c.root}>
        <div className={c.inner}>
          <h1 className={c.heading}>
            <ruby>
              {props.heading}
              {props.headingRuby &&
                <rt className={c.headingRuby}>{props.headingRuby}</rt>
              }
            </ruby>
          </h1>
          <div className={c.form}>
            {props.children}
          </div>
        </div>
      </div>
    );
  }
}
