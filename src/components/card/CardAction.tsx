import React from "react";
import {
  CARD_CHILD_PASS_DOWN,
  DEFAULT_PROPS,
  DefaultProps,
} from "../../assets/index";
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
  ...props
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

  const cardChildren = passDownProp(children, props, CARD_CHILD_PASS_DOWN);

  return (
    <div style={style} className={`${getClass()} ${className}`}>
      {cardChildren}
    </div>
  );
};

CardAction.defaultProps = DEFAULT_PROPS;

export default CardAction;
