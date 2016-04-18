'use strict';

import {Color as MentheColor} from 'menthe/utils';

import {Color} from '../base/constants';

import {ClassNames as CN} from './Anchor.constants';

interface SkinOptions {
  fontColor: string | MentheColor;
  visitedFontColor?: string | MentheColor;
}

const applySkin = ({fontColor, visitedFontColor}: SkinOptions) => ({
  '&': {
    color: fontColor,
    '&:visited': {
      color: visitedFontColor || fontColor,
    },
  },
});

const style = {
  root: {
    base: {
      display: 'inline-block',
    },
    maximized: {
      width: '100%',
      height: '100%',
    },
    noUnderline: {
      textDecoration: 'none',
    },
    skin: {
      default: applySkin({
        fontColor: Color.Blue,
        visitedFontColor: Color.Brown,
      }),
      inherit: applySkin({
        fontColor: 'inherit',
      }),
    },
  },
};

export default {
  [`.${CN.root.base}`]: [style.root.base, {
    [`&.${CN.root.mods.maximized}`]: style.root.maximized,
    [`&.${CN.root.mods.noUnderline}`]: style.root.noUnderline,
    [`&.${CN.root.mods.skin.default}`]: style.root.skin.default,
    [`&.${CN.root.mods.skin.inherit}`]: style.root.skin.inherit,
  }],
};
