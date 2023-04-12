import React, { useEffect, useState } from "react";

import styles from "./Alert.module.css";

import {
  callCallback,
  getModuleClasses,
  setCSSVariable,
  uid,
} from "../../util";

import { CONTEXT_COLORS, POSITIONS } from "../../assets/index";

import IconButton from "../button-icon/IconButton";
import Card from "../card/Card";
import Spacer from "../spacer/Spacer";

export interface AlertProps {
  visible?: boolean;
  onClose?: (visible: boolean) => void;
  rounded?: boolean;
  closeIcon?: React.ReactNode;
  closable?: boolean;
  icon?: React.ReactNode;
  dense?: boolean;
  border?: string;
  color?: string;
  outlined?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  type?: string;
  className?: string;
  inset?: boolean;
  flat?: boolean;
  bordered?: boolean;
}

const Alert: React.FC<AlertProps> = ({
  visible = true,
  onClose,
  rounded,
  closeIcon,
  closable,
  icon,
  dense,
  border,
  color,
  outlined,
  children,
  style,
  type,
  className,
  bordered,
  flat,
  inset,
  ...otherProps
}) => {
  const [id] = useState(uid());

  const alertType = CONTEXT_COLORS.find((t) => t === type) || null;
  const alertBorder = POSITIONS.find((t) => t === border) || null;

  const alertClasses = getModuleClasses(
    styles,
    `
      nu-alert
      ${dense ? "nu-alert--dense" : ""}
      ${alertType ? `nu-alert--${alertType}` : ""}
      ${outlined ? "nu-alert--outlined" : ""}
      ${closable ? "nu-alert--closable" : ""}
      ${alertBorder ? `nu-alert--border-${alertBorder}` : ""}
    `
  );

  useEffect(() => {
    const elem = document.getElementById(id);

    setCSSVariable(elem, "--text-color", color);
  }, [id, color]);

  const alertIcon =
    icon && !dense ? (
      <span className={getModuleClasses(styles, "nu-alert-icon")}>{icon}</span>
    ) : null;

  const alertClose = closable ? (
    <IconButton
      size="small"
      outlined={false}
      bordered={false}
      rounded={rounded}
      onClick={() => callCallback(onClose, false)}
      className={getModuleClasses(styles, "nu-alert-close")}
    >
      {closeIcon || (
        <span className={getModuleClasses(styles, "nu-alert-close--icon")}>
          ×
        </span>
      )}
    </IconButton>
  ) : null;

  const alertChildren = (
    <div className={getModuleClasses(styles, "nu-alert-children")}>
      {children}
    </div>
  );

  return visible ? (
    <Card
      style={style}
      id={id}
      className={alertClasses + " " + className}
      flat={flat}
      bordered={bordered}
      inset={inset}
      {...otherProps}
    >
      {alertIcon}
      {alertChildren}
      <Spacer />
      {alertClose}
    </Card>
  ) : null;
};

export default Alert;
