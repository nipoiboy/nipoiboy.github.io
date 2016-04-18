'use strict';

import {Color as MentheColor, Px, unit} from 'menthe/utils';

import {Height, Color} from '../../base/constants';

import {ClassNames as CN} from './constants';

interface SkinOptions {
  bgColor: MentheColor;
  fontColor?: MentheColor;
}

interface OutlinedSkinOptions {
  borderColor: MentheColor;
  fontColor?: MentheColor;
}

interface SizeOptions {
  height: Px;
  horizontalPadding: Px;
  fontSize: string;
}

const DefaultHeight = Height.Normal;
const SmallHeight = Height.Small;
const LargeHeight = Height.Large;
const DefaultPadding = unit(13).px();
const SmallPadding = unit(10).px();
const LargePadding = unit(18).px();
const BorderWidth = unit(2).px();
const RoundShapeRadius = unit(3).px();
const TransitionDuration = unit(.12).s();
const DefaultSkinColor = Color.LightGray;

const applySkin = ({bgColor, fontColor}: SkinOptions) => ({
  backgroundColor: bgColor,
  color: fontColor || '#fff',
  transition: `background-color ${TransitionDuration} ease`,
  '&:active': {
    backgroundColor: bgColor.darken(.15),
  },
});

const applyOutlinedSkin = ({borderColor, fontColor}: OutlinedSkinOptions) => ({
  backgroundColor: 'transparent',
  border: `${BorderWidth} solid ${borderColor}`,
  color: fontColor || borderColor,
  transition: `background-color ${TransitionDuration} ease, color ${TransitionDuration} ease`,
  '&:hover': {
    backgroundColor: borderColor,
    color: fontColor || '#fff',
    transition: `background-color ${TransitionDuration} ease, border-color ${TransitionDuration} ease`,
    '&:active': {
      backgroundColor: borderColor.darken(.15),
      borderColor: borderColor.darken(.15),
    },
  },
});

const applySize = ({height, horizontalPadding, fontSize}: SizeOptions) => ({
  fontSize: fontSize,
  [`&:not(.${CN.root.mods.maximized})`]: {
    height: `${height}`,
    padding: `0 ${horizontalPadding}`,
    lineHeight: `${height}`,
    [`&.${CN.root.mods.shape.default}, &.${CN.root.mods.shape.circle}`]: {
      width: `${height}`,
    },
    [`&.${CN.root.mods.outlined}`]: {
      lineHeight: `${height.sub(BorderWidth.mul(2))}`,
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
          bgColor: Color.Cyan,
        }),
        success: applySkin({
          bgColor: Color.Green,
        }),
        warning: applySkin({
          bgColor: Color.Yellow,
        }),
        danger: applySkin({
          bgColor: Color.Red,
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
          borderColor: Color.Cyan,
        }),
        success: applyOutlinedSkin({
          borderColor: Color.Green,
        }),
        warning: applyOutlinedSkin({
          borderColor: Color.Yellow,
        }),
        danger: applyOutlinedSkin({
          borderColor: Color.Red,
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
