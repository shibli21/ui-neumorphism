import React from 'react'

export type Size = 'small' | 'medium' | 'large';
export type Position = 'top' | 'right' | 'bottom' | 'left'
export type ContextColor = 'success' | 'info' | 'warning' | 'error'

export interface DefaultProps {
    dark?: Boolean;
    className?: String;
    style?: React.CSSProperties;
}
