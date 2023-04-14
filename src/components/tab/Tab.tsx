import React, { forwardRef, useState } from "react";
import { DefaultProps } from "../../assets/index";
import { callCallback, getModuleClasses, pickKeys } from "../../util";
import Button from "../button/Button";
import styles from "./Tab.module.css";

interface TabProps extends DefaultProps {
  active?: boolean;
  color?: string;
  onMouseOut?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onMouseOver?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: React.ReactNode;
  disabled?: boolean;
}

const Tab = forwardRef(
  (
    {
      style,
      className,
      children,
      active,
      color,
      dark,
      onClick,
      disabled,
      onMouseOut,
      onMouseOver,
    }: TabProps,
    ref: any
  ) => {
    const [stateColor, setStateColor] = useState("");
    const currentColor = active ? color : stateColor;
    const classes = getClasses("tab");

    function getClasses(elem: string) {
      if (elem === "tab") {
        return getModuleClasses(
          styles,
          `
          nu-tab
          nu-tab--${dark ? "dark" : "light"}
        `
        );
      } else {
        return getModuleClasses(styles, elem);
      }
    }

    function handleMouseOut(
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
      setStateColor("");
      callCallback(onMouseOut, e);
    }

    function handleMouseOver(
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
      setStateColor(color || "");
      callCallback(onMouseOver, e);
    }

    return (
      <Button
        ref={ref}
        text
        noPress
        style={style}
        dark={dark}
        onClick={onClick}
        disabled={disabled}
        color={currentColor}
        onMouseOut={handleMouseOut}
        onMouseOver={handleMouseOver}
        className={`${classes} ${className}`}
      >
        {children}
      </Button>
    );
  }
);

Tab.displayName = "NuTab";

export default Tab;
