import React from "react";
import { CARD_CHILD_PASS_DOWN, DefaultProps } from "../../assets/index";
import { getModuleClasses, passDownProp } from "../../util";
import styles from "./Card.module.css";

interface CardActionProps extends DefaultProps {
  rounded?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

const CardAction: React.FC<CardActionProps> = ({
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
        nu-card-action
        nu-card-action--${dark ? "dark" : "light"}
        ${rounded ? "nu-card-action--rounded" : ""}
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

CardAction.displayName = "NuCardAction";

export default CardAction;
