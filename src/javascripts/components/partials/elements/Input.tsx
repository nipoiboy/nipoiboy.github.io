'use strict';

import * as React from 'react';

import {BEM} from '../../../misc/BEM';

export interface Props extends React.Props<any> {
  type?: string;
  value?: string;
  placeholder?: string;
  hasError?: boolean;
  onChange?(value: string): any;
}

const c = BEM('Input', (block, element) => ({
  root: (props: Props) => block([
    {'has-error': props.hasError}
  ]),
}));

export class Input extends React.Component<Props, any> {
  render() {
    const {props} = this;
    return (
      <input
        className={c.root(props)}
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        onChange={this.handleChange}
      />
    );
  }

  handleChange = (e: React.FormEvent) =>
    this.props.onChange && this.props.onChange((e.target as any).value);
}
