import React from "react";
import { getModuleClasses, passDownProp } from "../../util/index";
import styles from "./Card.module.css";
import {
  CARD_CHILD_PASS_DOWN,
  CARD_HEAD_PASS_DOWN,
  DefaultProps,
} from "../../assets";

interface CardHeaderProps extends DefaultProps {
  title?: React.ReactNode;
  avatar?: React.ReactNode;
  action?: React.ReactNode;
  rounded?: boolean;
  subtitle?: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  avatar,
  action,
  children,
  subtitle,
  className,
  dark,
  rounded,
  style,
  disabled,
}) => {
  const getClass = (classType: string) => {
    switch (classType) {
      case "wrapper":
        return getModuleClasses(
          styles,
          `
            nu-card-header
            nu-card-header--${dark ? "dark" : "light"}
            ${rounded ? "nu-card-header--rounded" : ""}
          `
        );
      case "content":
        return getModuleClasses(styles, "nu-header-content");
      case "avatar":
        return getModuleClasses(styles, "nu-header-avatar");
      case "content-left":
        return getModuleClasses(
          styles,
          "nu-header-content nu-header-content--left"
        );
      default:
        return "";
    }
  };

  const passDownProps = { dark, disabled };

  const cardTitle = passDownProp(title, passDownProps, CARD_HEAD_PASS_DOWN);
  const cardAvatar = passDownProp(avatar, passDownProps, CARD_HEAD_PASS_DOWN);
  const cardAction = passDownProp(action, passDownProps, CARD_HEAD_PASS_DOWN);
  const cardSubTitle = passDownProp(
    subtitle,
    passDownProps,
    CARD_HEAD_PASS_DOWN
  );
  const cardChildren = passDownProp(
    children,
    passDownProps,
    CARD_CHILD_PASS_DOWN
  );

  return (
    <div style={style} className={`${getClass("wrapper")} ${className}`}>
      {cardAvatar || cardTitle || cardSubTitle || cardAction ? (
        <div className={getClass("content")}>
          <div className={getClass("content-left")}>
            {cardAvatar ? (
              <div className={getClass("avatar")}>{cardAvatar}</div>
            ) : null}
            <div>
              {cardTitle}
              {cardSubTitle}
            </div>
          </div>
          {cardAction}
        </div>
      ) : null}
      {cardChildren}
    </div>
  );
};

CardHeader.displayName = "NuCardHeader";

export default CardHeader;
