import React, { FC } from 'react'
import { Button } from '../index'

interface IconButtonProps {
  children?: React.ReactNode;
  text?: boolean;
}

const IconButton: FC<IconButtonProps> = ({
  children,
  text = true,
  ...otherProps
}) => {
  return (
    <Button
      {...otherProps}
      type='icon'
      block={false}
      depressed={false}
      text={text}
    >
      {children}
    </Button>
  )
}

IconButton.displayName = 'NuIconButton'

export default IconButton
