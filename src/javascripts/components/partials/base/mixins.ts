'use strict';

import {MaxWidth, Device} from './constants';

interface ContainerOptions {
  noPadding?: boolean;
}

export const container = (options: ContainerOptions = {}) => ({
  position: 'relative',
  width: '100%',
  maxWidth: MaxWidth,
  margin: '0 auto',
  padding: options.noPadding ? 0 : '0 15px',
  [Device.Tablet]: {
    minWidth: '100%',
    padding: '0 2.5%',
  },
  [Device.Mobile]: {
    minWidth: '100%',
  },
});
