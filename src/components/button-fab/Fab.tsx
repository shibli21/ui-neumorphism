import React, { FC } from "react";
import { Button } from "../index";
import styles from "./Fab.module.css";
import { getModuleClasses } from "../../util";
import { DefaultProps, Size } from "../../assets";
import { ButtonProps } from "../button/Button";

interface FabProps extends DefaultProps, ButtonProps {
  animation?: boolean;
  children?: React.ReactNode;
  fixed?: boolean;
  top?: boolean;
  right?: boolean;
  bottom?: boolean;
  left?: boolean;
  absolute?: boolean;
}

const Fab: FC<FabProps> = ({
  animation = true,
  children,
  style,
  className,
  fixed,
  top,
  right,
  bottom,
  left,
  absolute,
  size,
  ...otherProps
}) => {
  const getClasses = () => {
    return getModuleClasses(
      styles,
      `
        nu-fab
        ${top ? "nu-fab--top" : ""}
        ${left ? "nu-fab--left" : ""}
        ${right ? "nu-fab--right" : ""}
        ${bottom ? "nu-fab--bottom" : ""}
        ${fixed ? "nu-fab--fixed" : ""}
        ${absolute ? "nu-fab--absolute" : ""}
        ${animation ? "nu-fab--animation" : ""}
      `
    );
  };

  return (
    <div style={style} className={`${getClasses()} ${className}`}>
      <Button
        {...otherProps}
        size={size}
        rounded
        type="fab"
        text={false}
        block={false}
        outlined={false}
        depressed={false}
      >
        {children}
      </Button>
    </div>
  );
};

Fab.displayName = "NuFab";

export default Fab;
