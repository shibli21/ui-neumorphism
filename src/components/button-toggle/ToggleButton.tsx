import React, { FC, useState } from "react";

import { callCallback } from "../../util";
import { Button } from "../index";
import { ButtonProps } from "../button/Button";

export interface ToggleButtonProps extends ButtonProps {
  value?: any;
  selected?: boolean;
  color?: string;
}

const ToggleButton: FC<ToggleButtonProps> = ({
  children,
  value,
  selected,
  color,
  onClick,
  onChange,
  onMouseOut,
  onMouseOver,
  ...otherProps
}) => {
  const [isActive, setIsActive] = useState<boolean>(selected || false);
  const [buttonColor, setButtonColor] = useState<string>(
    selected && color ? color : ""
  );
  const [key, setKey] = useState<number>(1);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const isActiveValue = !isActive;
    setIsActive(isActiveValue);
    setButtonColor(isActiveValue && color ? color : "");
    setKey(key + 1);

    callCallback(onClick, { event, value });
    callCallback(onChange, { event, selected: isActiveValue, value });
  };

  const handleMouseOut = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isActive) {
      setButtonColor("");
    }
    callCallback(onMouseOut, event);
  };

  const handleMouseOver = (event: React.MouseEvent<HTMLButtonElement>) => {
    color && setButtonColor(color);
    callCallback(onMouseOver, event);
  };

  return (
    <Button
      {...otherProps}
      type="toggle"
      block={false}
      depressed={false}
      key={key}
      color={buttonColor}
      active={isActive}
      onClick={handleClick}
      onMouseOut={handleMouseOut}
      onMouseOver={handleMouseOver}
    >
      {children}
    </Button>
  );
};

ToggleButton.displayName = "NuToggleButton";

export default ToggleButton;
