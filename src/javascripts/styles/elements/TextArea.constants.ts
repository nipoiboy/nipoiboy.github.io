'use strict';

import {BEM} from '../../misc/BEM';

const bem = BEM('TextArea');

export const ClassNames = {
  root: {
    base: bem.block(),
    mods: {
      hasError: 'has-error',
    },
  },
};
