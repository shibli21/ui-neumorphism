import React, { Children, cloneElement, useState } from "react";

import styles from "./List.module.css";
import { passDownProp, callCallback, getModuleClasses } from "../../util";
import { DefaultProps } from "../../assets/index";
import ListItem from "./ListItem";

interface ListItemGroupProps extends DefaultProps {
  value?: number;
  dark?: boolean;
  link?: boolean;
  dense?: boolean;
  raised?: boolean;
  rounded?: boolean;
  inActive?: boolean;
  disabled?: boolean;
  twoLineSubtitle?: boolean;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent, active: number | undefined) => void;
  onChange?: (event: { active: number }) => void;
}

const ListItemGroup: React.FC<ListItemGroupProps> = (props) => {
  const [active, setActive] = useState(props.value);

  const children = passDownProp(
    Children.map(props.children, (child: any, index) => {
      if (child.type === ListItem) {
        return cloneElement(child, {
          active: active === index,
          onClick: (e) => handleClick(e, index, child.props.onClick),
        });
      }
    }),
    props,
    [
      "dark",
      "link",
      "dense",
      "raised",
      "rounded",
      "inActive",
      "disabled",
      "twoLineSubtitle",
    ]
  );

  const getClasses = (elem: string) => {
    const { dark } = props;
    if (elem === "list") {
      return getModuleClasses(
        styles,
        `
          nu-list
          nu-list-item--${dark ? "dark" : "light"}
        `
      );
    } else {
      return getModuleClasses(styles, elem);
    }
  };

  const handleClick = (
    event: React.MouseEvent,
    index: number,
    click?: (event: React.MouseEvent) => void
  ) => {
    const prevActive = active;
    const newActive = prevActive === index ? undefined : index;

    setActive(newActive);

    const { onClick, onChange } = props;

    click && callCallback(click, event);
    onChange && callCallback(onChange, { active: newActive });
    onClick && callCallback(onClick, { event, active: newActive });
  };

  return (
    <div
      style={props.style}
      className={`${getClasses("list")} ${props.className}`}
    >
      {children}
    </div>
  );
};

ListItemGroup.displayName = "NuListItemGroup";

export default ListItemGroup;
