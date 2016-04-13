'use strict';

import * as React from 'react';
import * as classnames from 'classnames';

import {BEM} from '../../../misc/BEM';
import {ClassNames as CN} from '../../../styles/elements/Button.constants';

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

const c = {
  root: (props: Props) => classnames(CN.root.base, [
    { [CN.root.mods.maximized]: props.maximized,
      [CN.root.mods.noPadding]: props.noPadding,
      [CN.root.mods.outlined]: props.outlined,
    },
    { [CN.root.mods.shape.default]: props.shape == null,
      [CN.root.mods.shape.round]: props.shape === 'round',
      [CN.root.mods.shape.circle]: props.shape === 'circle',
    },
    { [CN.root.mods.size.default]: props.size == null,
      [CN.root.mods.size.small]: props.size === 'small',
      [CN.root.mods.size.large]: props.size === 'large',
    }, {
      [CN.root.mods.skin.default]: props.skin == null,
      [CN.root.mods.skin.primary]: props.skin === 'primary',
      [CN.root.mods.skin.success]: props.skin === 'success',
      [CN.root.mods.skin.warning]: props.skin === 'warning',
      [CN.root.mods.skin.danger]: props.skin === 'danger',
    },
  ]),
};

export class Button extends React.Component<Props, any> {
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
