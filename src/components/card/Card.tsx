import React from "react";
import { CSS_DIMENSIONS } from "../../assets/index";
import { ProgressLinear } from "../../index";
import { getModuleClasses, pickKeys } from "../../util/index";
import styles from "./Card.module.css";

interface CssDimensions {
  width?: number;
  height?: number;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
}

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

const Card: React.FC<CardProps> = ({
  id,
  dark,
  style,
  loading,
  children,
  className,
  disabled = false,
  flat,
  inset,
  rounded,
  outlined,
  bordered,
  elevation,
  ...props
}) => {
  const getClass = () => {
    const cardElevation = !isNaN(Number(elevation)) ? String(elevation) : null;
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

  return (
    <div
      id={id}
      style={{ ...style, ...sizeStyles }}
      className={`${getClass()} ${className}`}
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
      {React.Children.map(children, (child) => {
        return React.isValidElement(child)
          ? React.cloneElement(child, {
              ...props,
            })
          : child;
      })}
    </div>
  );
};

Card.displayName = "NuCard";

export default Card;
