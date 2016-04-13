'use strict';

import * as React from 'react';
import * as classnames from 'classnames';

import {ClassNames as CN} from '../../../styles/elements/TextArea.constants';

export interface Props extends React.Props<any> {
  id?: string;
  cols?: number;
  rows?: number;
  value?: string;
  placeholder?: string;
  hasError?: boolean;
  onChange?(value: string): any;
}

const c = {
  root: (props: Props) => classnames(CN.root.base, [
    { [CN.root.mods.hasError]: props.hasError },
  ]),
};

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
