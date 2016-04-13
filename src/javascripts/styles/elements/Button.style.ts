'use strict';

import {Color as MentheColor, hex} from 'menthe';

import {Height, Color} from '../base/constants';

import {ClassNames as CN} from './Button.constants';

interface SkinOptions {
  bgColor: MentheColor;
  fontColor?: MentheColor;
}

interface OutlinedSkinOptions {
  borderColor: MentheColor;
  fontColor?: MentheColor;
}

interface SizeOptions {
  height: number;
  horizontalPadding: number;
  fontSize: string;
}

const DefaultHeight = Height.Normal;
const SmallHeight = Height.Small;
const LargeHeight = Height.Large;
const DefaultPadding = 13;
const SmallPadding = 10;
const LargePadding = 18;
const BorderWidth = 1;
const RoundShapeRadius = 3;
const TransitionDuration = .12;
const DefaultSkinColor = hex(Color.LightGray);

const applySkin = ({bgColor, fontColor}: SkinOptions) => ({
  backgroundColor: bgColor.toHEX(),
  color: fontColor ? fontColor.toHEX() : '#fff',
  transition: `background-color ${TransitionDuration}s ease`,
  '&:active': {
    backgroundColor: bgColor.darken(.15).toHEX(),
  },
});

const applyOutlinedSkin = ({borderColor, fontColor}: OutlinedSkinOptions) => ({
  backgroundColor: 'transparent',
  border: `BorderWidth solid ${borderColor.toHEX()}`,
  color: fontColor ? fontColor.toHEX() : borderColor.toHEX(),
  transition: `background-color ${TransitionDuration}s ease, color ${TransitionDuration}s ease`,
  '&:hover': applySkin({bgColor: borderColor}),
});

const applySize = ({height, horizontalPadding, fontSize}: SizeOptions) => ({
  fontSize: fontSize,
  [`&:not(.${CN.root.mods.maximized})`]: {
    height: `${height}px`,
    padding: `0 ${horizontalPadding}px`,
    lineHeight: `${height}px`,
    [`&.${CN.root.mods.shape.default}, &.${CN.root.mods.shape.circle}`]: {
      width: `${height}px`,
    },
    [`&.${CN.root.mods.outlined}`]: {
      lineHeight: `${(height - BorderWidth * 2)}px`,
    },
    [`&.${CN.root.mods.noPadding}`]: {
      padding: 0,
    },
  },
});

const style = {
  root: {
    base: {
      display: 'inline-block',
      position: 'relative',
      padding: 0,
      appearance: 'none',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'center',
      textDecoration: 'none',  // Reset anchor style for AnchorButton
      '&, &:focus': {
        outline: 'none',
      },
    },
    maximized: {
      display: 'block',
      width: '100%',
      height: '100%',
      lineHeight: 'inherit',
    },
    nonOutlined: {
      skin: {
        default: applySkin({
          bgColor: DefaultSkinColor,
          fontColor: DefaultSkinColor.darken(.4),
        }),
        primary: applySkin({
          bgColor: hex(Color.Cyan),
        }),
        success: applySkin({
          bgColor: hex(Color.Green),
        }),
        warning: applySkin({
          bgColor: hex(Color.Yellow),
        }),
        danger: applySkin({
          bgColor: hex(Color.Red),
        }),
      },
    },
    outlined: {
      skin: {
        default: applyOutlinedSkin({
          borderColor: DefaultSkinColor,
          fontColor: DefaultSkinColor.darken(.4),
        }),
        primary: applyOutlinedSkin({
          borderColor: hex(Color.Cyan),
        }),
        success: applyOutlinedSkin({
          borderColor: hex(Color.Green),
        }),
        warning: applyOutlinedSkin({
          borderColor: hex(Color.Yellow),
        }),
        danger: applyOutlinedSkin({
          borderColor: hex(Color.Red),
        }),
      },
    },
    size: {
      default: applySize({
        height: DefaultHeight,
        horizontalPadding: DefaultPadding,
        fontSize: '1rem',
      }),
      small: applySize({
        height: SmallHeight,
        horizontalPadding: SmallPadding,
        fontSize: '.9rem',
      }),
      large: applySize({
        height: LargeHeight,
        horizontalPadding: LargePadding,
        fontSize: '1.1rem',
      }),
    },
  },
};

export default {
  [`.${CN.root.base}`]: [style.root.base, {
    [`&.${CN.root.mods.maximized}`]: style.root.maximized,
    [`&:not(.${CN.root.mods.outlined})`]: {
      [`&.${CN.root.mods.skin.default}`]: style.root.nonOutlined.skin.default,
      [`&.${CN.root.mods.skin.primary}`]: style.root.nonOutlined.skin.primary,
      [`&.${CN.root.mods.skin.success}`]: style.root.nonOutlined.skin.success,
      [`&.${CN.root.mods.skin.warning}`]: style.root.nonOutlined.skin.warning,
      [`&.${CN.root.mods.skin.danger}`]: style.root.nonOutlined.skin.danger,
    },
    [`&.${CN.root.mods.outlined}`]: {
      [`&.${CN.root.mods.skin.default}`]: style.root.outlined.skin.default,
      [`&.${CN.root.mods.skin.primary}`]: style.root.outlined.skin.primary,
      [`&.${CN.root.mods.skin.success}`]: style.root.outlined.skin.success,
      [`&.${CN.root.mods.skin.warning}`]: style.root.outlined.skin.warning,
      [`&.${CN.root.mods.skin.danger}`]: style.root.outlined.skin.danger,
    },
    [`&.${CN.root.mods.size.default}`]: style.root.size.default,
    [`&.${CN.root.mods.size.small}`]: style.root.size.small,
    [`&.${CN.root.mods.size.large}`]: style.root.size.large,
  }],
};
