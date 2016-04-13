'use strict';

import {Height, Device} from '../base/constants';
import {container} from '../base/mixins';

import {ClassNames as CN} from './DailyReportFormContainerLayout.constants';

export const style = {
  root: {
    base: container(),
  },
  inner: {
    base: {
      padding: '50px 0',
    },
  },
  heading: {
    base: {
      marginBottom: '50px',
      fontFamily: 'Quicksand',
      fontSize: '3rem',
      fontWeight: 'bold',
      lineHeight: '1em',
      textAlign: 'center',
      [Device.Mobile]: {
        fontSize: '2.3rem',
      },
    },
  },
  headingRuby: {
    base: {
      fontSize: '.55rem',
      textAlign: 'center',
      letterSpacing: '.55rem',
    },
  },
  form: {
    base: {
      display: 'table',
      margin: '0 auto',
    },
  },
};

export default {
  [`.${CN.root.base}`]: style.root.base,
  [`.${CN.inner.base}`]: style.inner.base,
  [`.${CN.heading.base}`]: style.heading.base,
  [`.${CN.headingRuby.base}`]: style.headingRuby.base,
  [`.${CN.form.base}`]: style.form.base,
}
