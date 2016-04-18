'use strict';

import {unit, hex} from 'menthe/utils';

import {mediaQuery} from './utils';

export const MaxWidth = unit(1024).px();

const Breakpoints = {
  Mobile: unit(481).px(),
  Desktop: unit(1000).px(),
};

export const Height = {
  Large: unit(46).px(),
  Normal: unit(30).px(),
  Small: unit(24).px(),
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
  FontSize: unit(20).px(),
};

export const Color = {
  Black: hex('#4a4a4a'),
  Red: hex('#f44336'),
  Orange: hex('#FF9800'),
  Blue: hex('#03a9f4'),
  Green: hex('#2abb9b'),
  Yellow: hex('#FFC107'),
  LightGray: hex('#ecf0f1'),
  Gray: hex('#7f8c8d'),
  Cyan: hex('#00BCD4'),
  Brown: hex('#795548'),
  Background: hex('#f9f9f9'),
};

export const Device = {
  Mobile: mediaQuery({
    maxWidth: Breakpoints.Mobile,
  }),
  MobileOrTablet: mediaQuery({
    maxWidth: Breakpoints.Desktop.sub(1),
  }),
  Tablet: mediaQuery({
    minWidth: Breakpoints.Mobile.add(1),
    maxWidth: Breakpoints.Desktop.sub(1),
  }),
  TabletOrDesktop: mediaQuery({
    minWidth: Breakpoints.Mobile.add(1),
  }),
  Desktop: mediaQuery({
    minWidth: Breakpoints.Desktop,
  }),
};
