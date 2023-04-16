import React from 'react'

export type Size = 'small' | 'medium' | 'large';
export type Position = 'top' | 'right' | 'bottom' | 'left'
export type ContextColor = 'success' | 'info' | 'warning' | 'error'
export type CssDimension = 'width' | 'height' | 'minWidth' | 'maxWidth' | 'minHeight' | 'maxHeight'
export type SelectionControlType = 'radio' | 'checkbox' | 'switch'
export type AlternateButtonType = 'fab' | 'icon' | 'toggle'

export type MouseEventsType = 'onClick' | 'onMouseUp' | 'onMouseOut' | 'onMouseMove' | 'onMouseDown' | 'onMouseOver' | 'onMouseEnter' | 'onMouseLeave'

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
  required?: boolean;
  disabled?: boolean;
  // onClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void
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



export const CONTEXT_COLORS: ContextColor[] = ['success', 'info', 'warning', 'error']
export const SELECTION_CONTROLS: SelectionControlType[] = ['radio', 'checkbox', 'switch']
export const POSITIONS: Position[] = ['top', 'right', 'bottom', 'left']
export const ALTERNATE_BUTTONS: AlternateButtonType[] = ['fab', 'icon', 'toggle']
export const SIZES: Size[] = ['small', 'medium', 'large']

export const CSS_DIMENSIONS: CssDimension[] = [
  'width',
  'height',
  'minWidth',
  'maxWidth',
  'minHeight',
  'maxHeight'
]


export const MOUSE_EVENTS: MouseEventsType[] = [
  'onClick',
  'onMouseUp',
  'onMouseOut',
  'onMouseMove',
  'onMouseDown',
  'onMouseOver',
  'onMouseEnter',
  'onMouseLeave'
]

export const DARK_PASS_DOWN: Array<'dark'> = ['dark']
export const CARD_PASS_DOWN: Array<'dark' | 'rounded' | 'disabled' | 'outlined' | 'bordered'> = [
  'dark',
  'rounded',
  'disabled',
  'outlined',
  'bordered'
]
export const CARD_CHILD_PASS_DOWN: Array<'dark' | 'rounded' | 'disabled'> = ['dark', 'rounded', 'disabled']
export const CARD_HEAD_PASS_DOWN: Array<'dark' | 'disabled'> = ['dark', 'disabled']
