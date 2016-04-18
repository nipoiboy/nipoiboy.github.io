'use strict';

import {Px} from 'menthe/utils';
import * as _ from 'lodash';

interface MediaQueryProperties {
  [key: string]: any;
  op?: string;
  type?: string;
  minWidth?: Px | string;
  maxWidth?: Px | string;
}

export function quote(value: string): string {
  return `"${value}"`;
}

export function mediaQuery(properties: MediaQueryProperties): string {
  const expressionsQuery = Object.keys(properties)
    .filter((key: string) => key !== 'op' && key !== 'type')
    .map((key: string) => {
      const value = properties[key];
      const feature = _.kebabCase(key);
      return value == null ? `(${feature})` : `(${feature}:${value})`;
    })
    .join(' and ');
  return '@media '
    + (properties.op ? `${properties.op}` : '')
    + ((properties.op && (properties.type || expressionsQuery)) ? ' ' : '')
    + (properties.type ? `${properties.type}` : '')
    + ((properties.type && expressionsQuery) ? ' and ' : '')
    + expressionsQuery;
}
