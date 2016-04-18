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
      display: 'table',
      margin: '0 auto',
      padding: '50px 0',
    },
  },
};

export default {
  [`.${CN.root.base}`]: style.root.base,
  [`.${CN.inner.base}`]: style.inner.base,
}
