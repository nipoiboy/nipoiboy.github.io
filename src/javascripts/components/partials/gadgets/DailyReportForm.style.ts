'use strict';

import {Height, Device} from '../base/constants';
import {quote} from '../base/utils';

import {ClassNames as CN} from './DailyReportForm.constants';

const style = {
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
  row: {
    base: {
      [Device.Desktop]: {
        display: 'flex',
      },
      '& + &': {
        marginTop: '20px',
      },
    },
    submit: {
      maxWidth: '350px',
      height: '70px',
      margin: '50px auto 0',
      [Device.Mobile]: {
        width: '100%',
        maxWidth: '100%',
        height: Height.Large,
        margin: '50px 0 0',
      },
    },
  },
  column: {
    base: {
      flex: 1,
      '& + &': {
        marginLeft: '1.5em',
        [Device.MobileOrTablet]: {
          margin: 0,
        },
      },
    },
  },
  nameColumn: {
    base: {
      flex: 1,
      margin: '0 auto',
    },
  },
  label: {
    base: {
      fontWeight: 'bold',
    },
    required: {
      '&::before': {
        content: quote('(*) '),
      },
    },
  },
};

export default {
  [`.${CN.heading.base}`]: style.heading.base,
  [`.${CN.headingRuby.base}`]: style.headingRuby.base,
  [`.${CN.row.base}`]: [style.row.base, {
    [`&.${CN.row.mods.submit}`]: style.row.submit,
  }],
  [`.${CN.column.base}`]: style.column.base,
  [`.${CN.nameColumn.base}`]: style.nameColumn.base,
  [`.${CN.label.base}`]: [style.label.base, {
    [`&.${CN.label.mods.required}`]: style.label.required,
  }],
};
