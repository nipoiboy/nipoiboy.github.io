'use strict';

import {Default, Color} from './constants';

export default {
  '*': {
    boxSizing: 'border-box',
  },
  'html, body': {
    width: '100%',
    height: '100%',
  },
  'html': {
    backgroundColor: Color.Background,
    color: Color.Black,
    fontFamily: ['Muli', ...Default.FontFamily].join(','),
    fontSize: `${Default.FontSize}px`,
    fontWeight: 300,
    lineHeight: '2em',
  },
};
