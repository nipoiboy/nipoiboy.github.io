'use strict';

import {mediaQuery} from './utils';

export const MaxWidth = 1024;

const Breakpoints = {
  Mobile: 481,
  Desktop: 1000,
};

export const Height = {
  Large: 46,
  Normal: 30,
  Small: 24,
};

export const Default = {
  FontFamily: [
    'Noto Sans Japanese',
    '游ゴシック',
    'YuGothic',
    'ヒラギノ角ゴ ProN W3',
    'Hiragino Kaku Gothic ProN',
    '源ノ角ゴシック',
    '源ノ角ゴシック Normal',
    'Source Han Sans J Normal',
    'Source Han Sans J',
    'SourceHanSans-Normal',
    'Noto Sans Japanese',
    'Noto Sans Japanese Regular',
    'NotoSansJp-Regular',
    'メイリオ',
    'Meiryo',
    'Verdana',
    'sans-serif',
  ],
  FontSize: 20,
};

export const Color = {
  Black: '#4a4a4a',
  Red: '#f44336',
  Orange: '#FF9800',
  Blue: '#03a9f4',
  Green: '#2abb9b',
  Yellow: '#FFC107',
  LightGray: '#ecf0f1',
  Gray: '#7f8c8d',
  Cyan: '#00BCD4',
  Brown: '#795548',
  Background: '#f9f9f9',
};

export const Device = {
  Mobile: mediaQuery({
    maxWidth: `${Breakpoints.Mobile}px`,
  }),
  MobileOrTablet: mediaQuery({
    maxWidth: `${Breakpoints.Desktop - 1}px`,
  }),
  Tablet: mediaQuery({
    minWidth: `${Breakpoints.Mobile + 1}px`,
    maxWidth: `${Breakpoints.Desktop - 1}px`,
  }),
  TabletOrDesktop: mediaQuery({
    minWidth: `${Breakpoints.Mobile + 1}px`,
  }),
  Desktop: mediaQuery({
    minWidth: `${Breakpoints.Desktop}px`,
  }),
};
