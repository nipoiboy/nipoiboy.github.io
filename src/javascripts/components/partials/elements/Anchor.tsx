'use strict';

import * as React from 'react';
import {Link} from 'react-router';
import * as classnames from 'classnames';

import {ClassNames as CN} from './Anchor.constants';

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

const c = {
  root: (props: Props) => classnames(CN.root.base, [
    { [CN.root.mods.maximized]: props.maximized,
      [CN.root.mods.noUnderline]: props.noUnderline,
    },
    { [CN.root.mods.skin.default]: props.skin == null,
      [CN.root.mods.skin.inherit]: props.skin === 'inherit',
    },
  ]),
};

export class Anchor extends React.Component<Props, any> {
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
