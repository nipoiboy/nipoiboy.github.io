'use strict';

import * as React from 'react';

import {BEM} from '../../../misc/BEM';

export interface Props extends React.Props<any> {
  id?: string;
  cols?: number;
  rows?: number;
  value?: string;
  placeholder?: string;
  hasError?: boolean;
  onChange?(value: string): any;
}

const c = BEM('TextArea', (block, element) => ({
  root: (props: Props) => block([
    {'has-error': props.hasError}
  ]),
}));

export class TextArea extends React.Component<Props, any> {
  render() {
    const {props} = this;
    return (
      <textarea
        id={props.id}
        className={c.root(props)}
        cols={props.cols}
        rows={props.rows}
        value={props.value}
        placeholder={props.placeholder}
        onChange={this.handleChange}
      />
    );
  }

  handleChange = (e: React.FormEvent) =>
    this.props.onChange && this.props.onChange((e.target as any).value);
}
