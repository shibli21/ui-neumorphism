import React, { FC, Fragment } from 'react'
import { getModuleClasses, passDownProp, setCSSVariable, uid } from '../../util'
import styles from './Badge.module.css'

interface Props {
    max?: number;
    dot?: boolean;
    left?: boolean;
    inline?: boolean;
    bottom?: boolean;
    square?: boolean;
    content?: React.ReactNode;
    overlap?: boolean;
    visible?: boolean;
    label?: string;
    color?: string;
    bordered?: boolean;
    noPadding?: boolean;
    bgColor?: string;
    borderColor?: string;
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const Badge: FC<Props> = ({
  max,
  dot,
  left,
  inline,
  bottom,
  square,
  content,
  overlap,
  visible = true,
  label,
  color,
  bordered,
  noPadding,
  bgColor,
  borderColor,
  children,
  className,
  style,
  ...props
}) => {
  const id = uid()

  const isContentNumber = !isNaN(Number(content))
  const badgeContent = visible ? (
    <span aria-label={label} className={getModuleClasses(styles, 'badge')}>
      {dot ? null : (isContentNumber && max && Number(content) > max ? `${max}+` : content)}
    </span>
  ) : null

  const badgeChildren = inline && left ? (
    <Fragment>
      {badgeContent}
      {passDownProp(children, props, 'dark')}
    </Fragment>
  ) : (
    <Fragment>
      {passDownProp(children, props, 'dark')}
      {badgeContent}
    </Fragment>
  )

  const classes = {
    wrapper: getModuleClasses(styles, `nu-badge ${inline ? 'nu-badge--inline' : ''}`),
    badge: getModuleClasses(styles, `nu-badge--badge
      ${dot ? 'nu-badge--dot' : ''}
      ${square ? 'nu-badge--square' : ''}
      ${bordered ? 'nu-badge--bordered' : ''}
      ${noPadding ? 'nu-badge--nopadding' : ''}
      ${inline ? '' : ` ${overlap ? 'nu-badge--overlap' : ''}
        nu-badge--${left ? 'left' : 'right'}
        nu-badge--${bottom ? 'bottom' : 'top'}
        ${left && !bottom ? 'nu-badge--left-top' : ''}
        ${left && bottom ? 'nu-badge--left-bottom' : ''}
        ${!left && !bottom ? 'nu-badge--right-top' : ''}
        ${!left && bottom ? 'nu-badge--right-bottom' : ''}`
            }`)
  }

  React.useEffect(() => {
    const elem = document.getElementById(id)
    if (elem) {
      setCSSVariable(elem, '--badge-bg-color', bgColor)
      setCSSVariable(elem, '--badge-text-color', color)
      setCSSVariable(elem, '--badge-border-color', borderColor)
    }
  }, [id, bgColor, color, borderColor])

  return (
    <span id={id} className={`${classes.wrapper} ${className}`} style={style}>
      {badgeChildren}
    </span>
  )
}

Badge.displayName = 'NuBadge'

export default Badge
