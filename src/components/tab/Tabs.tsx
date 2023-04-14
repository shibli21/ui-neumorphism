import React, {
  Children,
  cloneElement,
  forwardRef,
  useEffect,
  useState,
} from "react";
import { findDOMNode } from "react-dom";

import { Tab } from "../../index";

import styles from "./Tab.module.css";

import { DefaultProps } from "../../assets";
import { callCallback, getModuleClasses, passDownProp } from "../../util";

interface TabsProps extends DefaultProps {
  children?: React.ReactNode;
  value?: number;
  rounded?: boolean;
  color?: string;
  disabled?: boolean;
  outlined?: boolean;
  underlined?: boolean;
  onClick?: (value: { event: React.MouseEvent; active: number }) => void;
  onChange?: (value: { active: number }) => void;
}

const Tabs = forwardRef(
  (
    {
      children,
      className,
      dark,
      style,
      color = "var(--primary)",
      onChange,
      onClick,
      outlined,
      rounded,
      underlined,
      value,
    }: TabsProps,
    ref: any
  ) => {
    const [wait, setWait] = useState(false);
    const [tabsMeta, setTabsMeta] = useState<any>({});
    const [disabled, setDisabled] = useState(false);
    const [active, setActive] = useState(value || 0);

    function selectorStyle() {
      const leftPos = getLeftPos(tabsMeta, active);
      const width = tabsMeta[active];

      if (!width) {
        return { display: "none" };
      }

      return { width: `${width}px`, left: `${leftPos}px` };
    }

    function tabItems() {
      return passDownProp(
        Children.map(children, (child: any, index) => {
          if (child.type === Tab) {
            const { onClick } = child.props;
            return cloneElement(child, {
              active: index === active,
              ref: (ref: React.ReactInstance | null | undefined) =>
                handleRef(ref, index),
              onClick: (e) => handleClick(e, index, onClick),
            });
          }
        }),
        { dark, color, disabled, rounded },
        ["dark", "color", "disabled", "rounded"]
      );
    }

    function getClasses(elem: string) {
      if (elem === "container") {
        return getModuleClasses(
          styles,
          `
          nu-tabs-wrapper
          nu-tabs-wrapper--${dark ? "dark" : "light"}
          ${rounded ? "nu-tabs-wrapper--rounded" : ""}
          ${outlined ? "nu-tabs-wrapper--outlined" : ""}
          ${underlined ? "nu-tabs-wrapper--underlined" : ""}
        `
        );
      } else {
        return getModuleClasses(styles, elem);
      }
    }

    function getLeftPos(meta: any, value: number) {
      let width = 0;
      for (let i = 0; i < value; i++) width += meta[i];
      return width;
    }

    function pauseClick() {
      setWait(true);
      setTimeout(() => setWait(false), 250);
    }

    function handleClick(
      event: React.MouseEvent<HTMLElement, MouseEvent>,
      active: React.SetStateAction<number>,
      click: any
    ) {
      if (wait) return;

      setActive(active);

      callCallback(click, event);
      callCallback(onChange, { active });
      callCallback(onClick, { event, active });

      pauseClick();
    }

    function handleRef(
      ref: React.ReactInstance | null | undefined,
      index: number
    ) {
      const tab = findDOMNode(ref) as HTMLElement;

      if (!tab) return;

      const { width } = tab.getBoundingClientRect();

      if (tabsMeta[index] === width) return;

      setTabsMeta({ ...tabsMeta, [index]: width });
    }

    useEffect(() => {
      if (value !== undefined) {
        setActive(value);
      }
    }, [value]);

    return (
      <div style={style} className={`${getClasses("container")} ${className}`}>
        {tabItems()}
        <div
          style={selectorStyle()}
          className={getClasses("nu-tab-selector")}
        />
      </div>
    );
  }
);

Tabs.displayName = "NuTabs";

export default Tabs;
