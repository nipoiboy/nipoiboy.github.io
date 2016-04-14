'use strict';

import {BEM} from '../base/bem';

const bem = BEM('DailyReportForm');

export const ClassNames = {
  root: {
    base: bem.block(),
  },
  row: {
    base: bem.element('row'),
    mods: {
      submit: 'submit',
    },
  },
  column: {
    base: bem.element('column'),
  },
  nameColumn: {
    base: bem.element('name-column'),
  },
  label: {
    base: bem.element('label'),
    mods: {
      required: 'required',
    },
  },
};
