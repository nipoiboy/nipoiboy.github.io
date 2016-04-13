'use strict';

import * as React from 'react';
import * as classnames from 'classnames';

import {ClassNames as CN} from './Input.constants';

export interface Props extends React.Props<any> {
  id?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  maximized?: boolean;
  hasError?: boolean;
  onChange?(value: string): any;
}

const c = {
  root: (props: Props) => classnames(CN.root.base, [
    { [CN.root.mods.maximized]: props.maximized,
      [CN.root.mods.hasError]: props.hasError,
    },
  ]),
};

export class Input extends React.Component<Props, any> {
  render() {
    const {props} = this;
    return (
      <input
        id={props.id}
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
