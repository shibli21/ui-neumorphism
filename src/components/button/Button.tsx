import React from 'react'
import styles from './Button.module.css'
import { getModuleClasses, passDownProp, pickKeys } from '../../util'
import { MOUSE_EVENTS, SIZES } from '../../assets/index'

interface ButtonProps {
  id?: string;
  type?: string;
  style?: React.CSSProperties;
  color?: string;
  bgColor?: string;
  disabled?: boolean;
  outlined?: boolean;
  children?: React.ReactNode;
  className?: string;
  dark?: boolean;
  size?: typeof SIZES[number];
  text?: boolean;
  block?: boolean;
  active?: boolean;
  noPress?: boolean;
  rounded?: boolean;
  bordered?: boolean;
  depressed?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  id,
  type,
  style,
  color,
  bgColor,
  disabled,
  outlined,
  children,
  className,
  dark,
  size = 'medium',
  text,
  block,
  active,
  noPress,
  rounded,
  bordered,
  depressed,
  ...props
}) => {
  const getValidSize = (size: typeof SIZES[number]) =>
    SIZES.find((s) => s === size) || 'medium'

  const getClasses = (classType: 'container' | 'input') => {
    switch (classType) {
      case 'container':
        return getModuleClasses(
          styles,
          `
            nu-button
            cursor-pointer
            nu-button--${type}
            ${text ? 'nu-button--text' : ''}
            ${block ? 'nu-button--block' : ''}
            ${active ? 'nu-button--active' : ''}
            nu-button--${getValidSize(size)}
            nu-button--${dark ? 'dark' : 'light'}
            ${rounded ? 'nu-button--rounded' : ''}
            ${noPress ? 'nu-button--no-press' : ''}
            ${outlined ? 'nu-button--outlined' : ''}
            ${bordered ? 'nu-button--bordered' : ''}
            ${disabled ? 'nu-button--disabled' : ''}
            ${depressed ? 'nu-button--depressed' : ''}
          `
        )
      case 'input':
        return getModuleClasses(styles, 'nu-button-inner')
      default:
        break
    }
  }

  const btnChildren = passDownProp(children, props, 'dark')

  return (
    <div
      id={id}
      {...pickKeys(props, MOUSE_EVENTS)}
      className={`${getClasses('container')} ${className}`}
      style={{
        ...style,
        color: disabled ? undefined : color,
        backgroundColor: disabled ? undefined : bgColor,
        border: disabled ? undefined : outlined ? `1px solid ${color}` : undefined
      }}
    >
      <button className={getClasses('input')}>
        {type ? btnChildren : btnChildren || 'button'}
      </button>
    </div>
  )
}

Button.displayName = 'NuButton'

export default Button
