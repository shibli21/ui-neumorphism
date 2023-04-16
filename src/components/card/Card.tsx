import React, { forwardRef } from "react";
import {
  CARD_PASS_DOWN,
  CSS_DIMENSIONS,
  CssDimensions,
} from "../../assets/index";
import { ProgressLinear } from "../../index";
import { getModuleClasses, passDownProp, pickKeys } from "../../util/index";
import styles from "./Card.module.css";

interface CardProps extends CssDimensions {
  id?: string;
  dark?: boolean;
  style?: React.CSSProperties;
  loading?: boolean;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  flat?: boolean;
  inset?: boolean;
  rounded?: boolean;
  outlined?: boolean;
  bordered?: boolean;
  elevation?: number;
}

const Card = forwardRef(
  (
    {
      id,
      dark,
      style,
      loading,
      children,
      className,
      disabled = false,
      elevation,
      flat = false,
      inset = false,
      rounded = false,
      outlined = false,
      bordered = false,
      ...props
    }: CardProps,
    ref: any
  ) => {
    const getClass = () => {
      const cardElevation = !isNaN(Number(elevation))
        ? String(elevation)
        : null;
      return getModuleClasses(
        styles,
        `
        nu-card
        ${flat ? "nu-card--flat" : ""}
        elevation-${cardElevation || 1}
        ${inset ? "nu-card--inset" : ""}
        nu-card--${dark ? "dark" : "light"}
        ${rounded ? "nu-card--rounded" : ""}
        ${bordered ? "nu-card--bordered" : ""}
        ${outlined ? "nu-card--outlined" : ""}
      `
      );
    };

    const sizeStyles: any = {};

    const pickedStyles: any = pickKeys(props, CSS_DIMENSIONS);

    Object.keys(pickedStyles).map((key) => {
      sizeStyles[key] = `${pickedStyles[key]}px`;
    });

    const cardChildren = passDownProp(
      children,
      {
        dark: dark,
        bordered: bordered,
        rounded: rounded,
        outlined: outlined,
        disabled: disabled,
      },
      CARD_PASS_DOWN
    );

    return (
      <div
        id={id}
        style={{ ...style, ...sizeStyles }}
        className={`${getClass()} ${className}`}
        ref={ref}
      >
        {loading ? (
          <ProgressLinear
            active
            fillHeight
            height={4}
            dark={dark}
            indeterminate
            color="var(--primary)"
          />
        ) : null}
        {cardChildren}
      </div>
    );
  }
);

Card.displayName = "NuCard";

export default Card;
