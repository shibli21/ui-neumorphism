import React from 'react'

export type Size = 'small' | 'medium' | 'large';
export type Position = 'top' | 'right' | 'bottom' | 'left'
export type ContextColor = 'success' | 'info' | 'warning' | 'error'

export interface DefaultProps {
  dark?: boolean;
  className?: string;
  style?: React.CSSProperties;
}


export const defaultProps: DefaultProps = {
  dark: false,
  className: '',
  style: {}
}

export interface SelectionControlProps extends DefaultProps {
  value?: any;
  id?: string;
  name?: string;
  label?: string;
  checked?: boolean;
  color?: string;
  onClick?: Function;
  required?: boolean;
  disabled?: boolean;
  onChange?: Function;
}

export interface TypographyProps extends DefaultProps {
  disabled?: boolean;
  secondary?: boolean;
  component?: string;
}

export interface CssDimensions {
  width?: number;
  height?: number;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
}


export const CONTEXT_COLORS = ['success', 'info', 'warning', 'error']
export const SELECTION_CONTROLS = ['radio', 'checkbox', 'switch']
export const POSITIONS: Position[] = ['top', 'right', 'bottom', 'left']
export const ALTERNATE_BUTONS = ['fab', 'icon', 'toggle']
export const SIZES: Size[] = ['small', 'medium', 'large']
export const MOUSE_EVENTS = [
  'onClick',
  'onMouseUp',
  'onMouseOut',
  'onMouseMove',
  'onMouseDown',
  'onMouseOver',
  'onMouseEnter',
  'onMouseLeave'
]
export const DARK_PASS_DOWN = ['dark']
export const CARD_PASS_DOWN = [
  'dark',
  'rounded',
  'disabled',
  'outlined',
  'bordered'
]
export const CARD_CHILD_PASS_DOWN = ['dark', 'rounded', 'disabled']
export const CARD_HEAD_PASS_DOWN = ['dark', 'disabled']
export const CSS_DIMENSIONS = [
  'width',
  'height',
  'minWidth',
  'maxWidth',
  'minHeight',
  'maxHeight'
]
