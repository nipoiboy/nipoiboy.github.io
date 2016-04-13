'use strict';

import {BEM} from '../base/utils';

const bem = BEM('Button');

export const ClassNames = {
  root: {
    base: bem.block(),
    mods: {
      outlined: 'outlined',
      maximized: 'maximized',
      noPadding: 'no-padding',
      skin: {
        default: 'skin--default',
        primary: 'skin--primary',
        success: 'skin--succcess',
        warning: 'skin--warning',
        danger: 'skin--danger',
      },
      size: {
        default: 'size--default',
        small: 'size--small',
        large: 'size--large',
      },
      shape: {
        default: 'shape--default',
        round: 'shape--round',
        circle: 'shape--circle',
      },
    },
  },
};
