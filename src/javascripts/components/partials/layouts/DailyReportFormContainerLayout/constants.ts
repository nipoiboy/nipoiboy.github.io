'use strict';

import {BEM} from '../../base/bem';

const bem = BEM('DailyReportFormContainerLayout');

export const ClassNames = {
  root: {
    base: bem.block(),
  },
  inner: {
    base: bem.element('inner'),
  },
};
