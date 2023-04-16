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
  text = true,
  ...otherProps
}) => {
  const [isActive, setIsActive] = useState<boolean>(selected || false);
  const [buttonColor, setButtonColor] = useState<string>(
    selected && color ? color : ""
  );
  const [key, setKey] = useState<number>(1);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const isActiveValue = !isActive;
    setIsActive(isActiveValue);
    setButtonColor(isActiveValue && color ? color : "");
    setKey(key + 1);

    onClick && callCallback(onClick, { event, value });
    onChange &&
      callCallback(onChange, { event, selected: isActiveValue, value });
  };

  const handleMouseOut = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive) {
      setButtonColor("");
    }
    onMouseOut && callCallback(onMouseOut, event);
  };

  const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
    color && setButtonColor(color);
    onMouseOver && callCallback(onMouseOver, event);
  };

  return (
    <Button
      {...otherProps}
      text={text}
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
