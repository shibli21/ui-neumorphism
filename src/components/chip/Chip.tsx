import {
  DetailedReactHTMLElement,
  cloneElement,
  createElement,
  useEffect,
  useState,
} from "react";
import React from "react";
import styles from "./Chip.module.css";

import {
  getModuleClasses,
  uid,
  callCallback,
  setCSSVariable,
} from "../../util";
import { SIZES, CONTEXT_COLORS, DefaultProps } from "../../assets/";

interface ChipProps extends DefaultProps {
  closable?: boolean;
  closeIcon?: DetailedReactHTMLElement<any, any>;
  color?: string;
  dark?: boolean;
  flat?: boolean;
  label?: boolean;
  active?: boolean;
  outlined?: boolean;
  bordered?: boolean;
  type?: string;
  size?: string;
  link?: string;
  action?: any;
  append?: any;
  prepend?: any;
  onAction?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}

const Chip: React.FC<ChipProps> = (props) => {
  const [id, setId] = useState(uid());

  const getClasses = (type: string) => {
    const { dark, flat, label, active, outlined, bordered } = props;
    switch (type) {
      case "chip":
        return getModuleClasses(
          styles,
          `
            nu-chip
            nu-chip--${size}
            ${flat ? "nu-chip--flat" : ""}
            ${label ? "nu-chip--label" : ""}
            ${active ? "nu-chip--active" : ""}
            nu-chip--${dark ? "dark" : "light"}
            ${outlined ? "nu-chip--outlined" : ""}
            ${bordered ? "nu-chip--bordered" : ""}
            ${props.type ? `nu-chip--${props.type}` : ""}
          `
        );
      default:
        return getModuleClasses(styles, type);
    }
  };

  const action = (() => {
    if (props.action) {
      return cloneElement(props.action, {
        key: uid(),
        className: getClasses("nu-action"),
        onClick: (e) => handleActionClick(e),
      });
    } else if (props.closable) {
      return props.closeIcon ? (
        cloneElement(props.action, {
          key: uid(),
          className: getClasses("nu-action"),
          onClick: (e) => handleActionClick(e),
        })
      ) : (
        <span
          key={uid()}
          className={getClasses("nu-action nu-action--close")}
          onClick={(e) => handleActionClick(e)}
        >
          ×
        </span>
      );
    } else {
      return null;
    }
  })();

  const size = SIZES.find((s) => s === props.size) || "medium";

  const type = CONTEXT_COLORS.find((t) => t === props.type) || null;

  const actionClass = action || props.closable ? "nu-append--with-action" : "";

  const append = props.append
    ? cloneElement(props.append, {
        className: `${getClasses(`nu-append ${actionClass}`)}`,
      })
    : null;

  const prepend = props.prepend
    ? cloneElement(props.prepend, { className: getClasses("nu-prepend") })
    : null;

  const setColor = () => {
    const elem = document.getElementById(id);
    setCSSVariable(elem, "--text-color", props.color);
  };

  const handleActionClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    callCallback(props.onAction, e);
  };

  useEffect(() => {
    setColor();
  }, []);

  useEffect(() => {
    setColor();
  }, [props.color]);

  const linkProps: any = {};
  const { link, style, children, className } = props;
  const tag = link ? "a" : "span";
  if (link) linkProps.href = link;

  return createElement(
    tag,
    {
      style,
      key: uid(),
      ...linkProps,
      id,
      className: `${getClasses("chip")} ${className}`,
    },
    [prepend, children, append, action]
  );
};

Chip.displayName = "NuChip";

export default Chip;
