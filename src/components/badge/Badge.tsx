import React, { FC, useState, useEffect, Fragment } from "react";
import styles from "./Badge.module.css";
import {
  getModuleClasses,
  setCSSVariable,
  uid,
  passDownProp,
} from "../../util/index";
import { DefaultProps } from "../../assets";

interface Props extends DefaultProps {
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
  style,
  className,
  ...props
}) => {
  const [id] = useState(uid());

  const getClasses = (name: string) => {
    switch (name) {
      case "wrapper":
        return getModuleClasses(
          styles,
          `
            nu-badge
            ${inline ? "nu-badge--inline" : ""}
          `
        );
      case "badge":
        return getModuleClasses(
          styles,
          `
            nu-badge--badge
            ${dot ? "nu-badge--dot" : ""}
            ${square ? "nu-badge--square" : ""}
            ${bordered ? "nu-badge--bordered" : ""}
            ${noPadding ? "nu-badge--nopadding" : ""}
            ${
              inline
                ? ""
                : `
              ${overlap ? "nu-badge--overlap" : ""}
              nu-badge--${left ? "left" : "right"}
              nu-badge--${bottom ? "bottom" : "top"}
              ${left && !bottom ? "nu-badge--left-top" : ""}
              ${left && bottom ? "nu-badge--left-bottom" : ""}
              ${!left && !bottom ? "nu-badge--right-top" : ""}
              ${!left && bottom ? "nu-badge--right-bottom" : ""}`
            }
          `
        );
      default:
        return "";
    }
  };

  const isContentNumber = !isNaN(Number(content));
  const badgeContent = visible && (
    <span aria-label={label} className={getClasses("badge")}>
      {dot
        ? null
        : isContentNumber
        ? content && max && Number(content) > max
          ? `${max}+`
          : content
        : content}
    </span>
  );

  const badgeChildren = passDownProp(children, props, "dark");

  useEffect(() => {
    const elem = document.getElementById(id);
    if (elem) {
      setCSSVariable(elem, "--badge-bg-color", bgColor);
      setCSSVariable(elem, "--badge-text-color", color);
      setCSSVariable(elem, "--badge-border-color", borderColor);
    }
  }, [id, bgColor, color, borderColor]);

  return (
    <span
      style={style}
      id={id}
      className={`${getClasses("wrapper")} ${className}`}
    >
      {inline && left ? (
        <Fragment>
          {badgeContent}
          {badgeChildren}
        </Fragment>
      ) : (
        <Fragment>
          {badgeChildren}
          {badgeContent}
        </Fragment>
      )}
    </span>
  );
};

Badge.displayName = "NuBadge";

export default Badge;
