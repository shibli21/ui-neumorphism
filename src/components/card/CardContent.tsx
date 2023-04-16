import React from "react";
import styles from "./Card.module.css";
import { CARD_CHILD_PASS_DOWN, DefaultProps } from "../../assets/index";
import { getModuleClasses, passDownProp } from "../../util";

interface CardContentProps extends DefaultProps {
  rounded?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

const CardContent: React.FC<CardContentProps> = ({
  dark,
  rounded,
  style,
  className,
  children,
  disabled = false,
}) => {
  const getClass = () => {
    return getModuleClasses(
      styles,
      `
        nu-card-content
        nu-card-content--${dark ? "dark" : "light"}
        ${rounded ? "nu-card-content--rounded" : ""}
      `
    );
  };

  const cardChildren = passDownProp(
    children,
    {
      dark,
      rounded,
      disabled,
    },
    CARD_CHILD_PASS_DOWN
  );

  return (
    <div style={style} className={`${getClass()} ${className}`}>
      {cardChildren}
    </div>
  );
};

CardContent.displayName = "NuCardContent";

export default CardContent;
