import React, { Children, cloneElement, useEffect, useState } from "react";
import { findDOMNode } from "react-dom";

import { SlideCarousel } from "../../index";

import styles from "./Tab.module.css";

import { DefaultProps } from "../../assets/index";
import { callCallback, getModuleClasses, passDownProp } from "../../util";

interface TabItemsProps extends DefaultProps {
  height?: number;
  children?: React.ReactNode;
  reverse?: boolean;
  value: number;
  onChange?: (value: { active: number; previous: number }) => void;
}

const TabItems = ({
  height,
  children,
  className,
  dark,
  onChange,
  reverse,
  style,
  value,
}: TabItemsProps) => {
  let timeout: any;
  const [tHeight, setTHeight] = useState(height);
  const [color, setColor] = useState(value);
  const [previous, setPrevious] = useState(0);

  function tabItems() {
    let isReverse = previous < value;
    isReverse = reverse ? !isReverse : isReverse;
    return passDownProp(
      Children.map(children, (child: any, index) => {
        return (
          <SlideCarousel
            appear
            axis="X"
            duration={200}
            reverse={isReverse}
            in={index === value}
          >
            {cloneElement(child, {
              ref: (ref: React.ReactInstance) =>
                handleRef(ref, index === value),
            })}
          </SlideCarousel>
        );
      }),
      { dark },
      ["dark"]
    );
  }

  function getClasses(elem: string) {
    if (elem === "container") {
      return getModuleClasses(
        styles,
        `
          nu-tab-items-wrapper
          nu-tab-items-wrapper--${dark ? "dark" : "light"}
        `
      );
    } else {
      return getModuleClasses(styles, elem);
    }
  }

  function clearHeightTimeout() {
    clearTimeout(timeout);
  }

  function handleRef(item: React.ReactInstance, check = false) {
    if (!check) return;
    const tabItem = findDOMNode(item) as HTMLElement;

    if (!tabItem) return;

    clearHeightTimeout();

    timeout = setTimeout(() => {
      const height = tabItem.scrollHeight;

      if (height === tHeight) return;

      setTHeight(height);
    }, 250);
  }

  useEffect(() => {
    if (previous !== value) {
      callCallback(onChange, { active: value, previous: previous });
      setPrevious(value);
    }
  }, [value, onChange]);

  useEffect(() => () => clearHeightTimeout(), []);

  return (
    <div
      style={{ height: `${tHeight}px`, ...style }}
      className={`${getClasses("container")} ${className}`}
    >
      <div className={getClasses("nu-tab-items-container")}>{tabItems()}</div>
    </div>
  );
};

TabItems.displayName = "NuTabItems";

export default TabItems;
