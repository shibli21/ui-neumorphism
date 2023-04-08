import React, { createElement, FC } from "react";

import styles from "./Typography.module.css";
import { getModuleClasses } from "../../util";
import { TypographyProps } from "../../assets";

type TypographyType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "caption"
  | "overline"
  | "subtitle-1"
  | "subtitle-2"
  | "body-1"
  | "body-2";

interface Props extends TypographyProps {
  children: React.ReactNode;
  type: TypographyType;
}

const mapping = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  caption: "p",
  overline: "p",
  "subtitle-1": "p",
  "subtitle-2": "p",
  "body-1": "p",
  "body-2": "p",
};

const Typography: FC<Props> = ({
  type = "body-1",
  component,
  disabled,
  secondary,
  dark,
  style,
  className,
  children,
}) => {
  const getTypographyType = () => {
    return disabled ? "disabled" : secondary ? "secondary" : "primary";
  };

  const getMapping = () => {
    return component || mapping[type];
  };

  const getClass = () => {
    return getModuleClasses(
      styles,
      `
        nu-typography
        nu-${type}
        nu-typography--${getTypographyType()}
        nu-typography--${dark ? "dark" : "light"}
      `
    );
  };

  return createElement(
    getMapping(),
    {
      style,
      className: `${getClass()} ${className}`,
    },
    children
  );
};

Typography.displayName = "NuTypography";

export default Typography;
