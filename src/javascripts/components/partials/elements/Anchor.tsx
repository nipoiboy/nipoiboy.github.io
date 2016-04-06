'use strict';

import * as React from 'react';
import {Link} from 'react-router';

import {BEM} from '../../../misc/BEM';

type Skin = 'inherit';

export interface PropsWithoutSkin extends React.Props<any> {
  to?: string;
  query?: {};
  href?: string;
  target?: string;
  maximized?: boolean;
  noUnderline?: boolean;
  onClick?(e: React.FormEvent): any;
}

export interface Props extends PropsWithoutSkin {
  skin?: Skin;
}

const c = BEM('Anchor', (block, element) => ({
  root: (props: Props) => block([
    `skin_${props.skin || 'default'}`,
    { maximized: props.maximized,
      noUnderline: props.noUnderline
    }
  ]),
}));

export class Anchor extends React.Component<Props, any> {
  static defaultProps = {
    style: {},
  };

  render() {
    const {props} = this;
    return props.to ? (
      <Link
        className={c.root(props)}
        to={props.to}
        query={props.query}
        onClick={props.onClick}
      >
        {props.children}
      </Link>
    ) : (
      <a
        className={c.root(props)}
        href={props.href}
        target={props.target}
        onClick={props.onClick}
      >
        {props.children}
      </a>
    );
  }
}
