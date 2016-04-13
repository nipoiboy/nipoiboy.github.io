'use strict';

import {BEM} from '../../misc/BEM';

const bem = BEM('Input');

export const ClassNames = {
  root: {
    base: bem.block(),
    mods: {
      maximized: 'maximized',
      hasError: 'has-error',
    },
  },
};
