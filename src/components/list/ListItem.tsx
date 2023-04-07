import React, { FC } from "react";

import styles from "./List.module.css";
import { getModuleClasses, pickKeys } from "../../util";
import { DEFAULT_PROPS, DEFAULT_PROPS_TYPE } from "../../assets/index";

interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  link?: boolean;
  dense?: boolean;
  active?: boolean;
  raised?: boolean;
  rounded?: boolean;
  inActive?: boolean;
  disabled?: boolean;
  twoLineSubtitle?: boolean;
  dark?: boolean;
}

const ListItem: FC<ListItemProps> = ({
  title,
  subtitle,
  link,
  dense,
  active,
  raised,
  rounded,
  inActive,
  disabled,
  twoLineSubtitle,
  dark,
  style,
  className,
  onClick,
}) => {
  const getClasses = (elem?: string) => {
    if (elem === "list-item") {
      return getModuleClasses(
        styles,
        `
          nu-list-item
          ${link ? "nu-list-item--link" : ""}
          ${dense ? "nu-list-item--dense" : ""}
          ${active ? "nu-list-item--active" : ""}
          ${raised ? "nu-list-item--raised" : ""}
          ${rounded ? "nu-list-item--rounded" : ""}
          ${inActive ? "nu-list-item--inactive" : ""}
          ${disabled ? "nu-list-item--disabled" : ""}
          ${twoLineSubtitle ? "nu-list-item--two-line" : ""}
          nu-list-item--${dark ? "dark" : "light"}
        `
      );
    } else {
      return getModuleClasses(styles, elem);
    }
  };

  const titleElement = title && (
    <div className={getClasses("nu-list-item-title")}>{title}</div>
  );
  const subtitleElement = subtitle && (
    <div className={getClasses("nu-list-item-subtitle")}>{subtitle}</div>
  );

  const events = pickKeys({ onClick }, ["onClick"]);

  return (
    <div
      {...events}
      style={style}
      className={`${getClasses("list-item")} ${className}`}
    >
      {titleElement}
      {subtitleElement}
    </div>
  );
};

ListItem.defaultProps = DEFAULT_PROPS;
ListItem.propTypes = DEFAULT_PROPS_TYPE;
ListItem.displayName = "NuListItem";

export default ListItem;
