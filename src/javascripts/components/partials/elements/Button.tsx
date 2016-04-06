'use strict';

import * as React from 'react';

import {BEM} from '../../../misc/BEM';

type Shape = 'round' | 'circle';

type Size = 'small' | 'large';

type Skin = 'primary' | 'success' | 'warning' | 'danger';

export interface Props extends React.Props<any> {
  type?: string;
  maximized?: boolean;
  noPadding?: boolean;
  outlined?: boolean;
  shape?: Shape;
  size?: Size;
  skin?: Skin;
  onClick?(e: React.FormEvent): any;
}

export const DEFAULT_PROPS = {
  style: {}
};

const c = BEM('Button', (block, element) => ({
  root: (props: Props) => block([
    `shape_${props.shape || 'default'}`,
    `skin_${props.skin || 'default'}`,
    `size_${props.size || 'default'}`,
    { maximized: props.maximized,
      'no-padding': props.noPadding,
      outlined: props.outlined
    }
  ]),
}));

export class Button extends React.Component<Props, any> {
  static defaultProps = DEFAULT_PROPS;

  render() {
    const {props} = this;
    return (
      <button
        className={c.root(props)}
        type={props.type}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    );
  }
}
