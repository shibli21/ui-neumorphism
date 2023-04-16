import React, { FC, ReactElement, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

import styles from "./Dialog.module.css";

import { CSS_DIMENSIONS, CssDimensions, DefaultProps } from "../../assets";
import { Grow } from "../../transitions";
import {
  callCallback,
  findClickInside,
  getModuleClasses,
  passDownProp,
  pickKeys,
} from "../../util";

interface DialogProps extends DefaultProps, CssDimensions {
  visible?: boolean;
  children: ReactElement | ReactElement[];
  persistent?: boolean;
  onClose?: (e: React.MouseEvent) => void;
}

const Dialog: FC<DialogProps> = ({
  visible = false,
  style,
  className,
  children,
  dark,
  onClose,
  persistent,
  ...props
}) => {
  const handleClickInside = (e: React.MouseEvent) => {
    const contentDOM = document.getElementById(
      "nudialogcontent"
    ) as HTMLElement;
    const isContentClicked = findClickInside(e, contentDOM);
    if (!isContentClicked && !persistent) {
      onClose && callCallback(onClose, true);
    }
  };

  const changeBodyAttrs = () => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  useEffect(() => {
    changeBodyAttrs();
  }, [visible]);

  const dialogChildren = passDownProp(children, props, "dark");

  const pickedStyles: any = pickKeys(props, CSS_DIMENSIONS);
  const sizeStyles = Object.keys(pickedStyles).reduce(
    (acc, key) => ({ ...acc, [key]: `${pickedStyles[key]}px` }),
    {}
  );

  const getClasses = (name: string) => {
    switch (name) {
      case "dialog":
        return getModuleClasses(
          styles,
          `
            nu-dialog
            nu-dialog--${dark ? "dark" : "light"}
          `
        );
      default:
        return getModuleClasses(styles, name);
    }
  };

  return visible
    ? createPortal(
        <div
          role="dialog"
          onClick={handleClickInside}
          className={getClasses("dialog")}
        >
          <div className={getClasses("nu-dialog-overlay")} />
          <Grow appear in={true}>
            <div
              role="document"
              id="nudialogcontent"
              style={{ ...sizeStyles, ...style }}
              className={`${getClasses("nu-dialog-content")} ${className}`}
            >
              {dialogChildren}
            </div>
          </Grow>
        </div>,
        document.body
      )
    : null;
};

Dialog.displayName = "NuDialog";

export default Dialog;
