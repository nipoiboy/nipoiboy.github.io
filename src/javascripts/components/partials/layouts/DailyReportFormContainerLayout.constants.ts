'use strict';

import {BEM} from '../base/bem';

const bem = BEM('DailyReportFormContainerLayout');

export const ClassNames = {
  root: {
    base: bem.block(),
  },
  inner: {
    base: bem.element('inner'),
  },
  heading: {
    base: bem.element('heading'),
  },
  headingRuby: {
    base: bem.element('heading-ruby'),
  },
  form: {
    base: bem.element('form'),
  },
};
