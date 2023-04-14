import React, { forwardRef } from "react";

import { DefaultProps } from "../../assets/index";
import { getModuleClasses } from "../../util";
import styles from "./Tab.module.css";

interface TabItemProps extends DefaultProps {
  children: React.ReactNode;
}

const TabItem = forwardRef(
  ({ children, className, dark, style }: TabItemProps, ref: any) => {
    const getClasses = (elem: string) => {
      return getModuleClasses(styles, elem);
    };

    return (
      <div
        ref={ref}
        style={style}
        className={`${getClasses("nu-tab-item")} ${className}`}
      >
        {children}
      </div>
    );
  }
);

TabItem.displayName = "NuTabItem";

export default TabItem;
