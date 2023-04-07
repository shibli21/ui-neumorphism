import React from "react";

import styles from "./Divider.module.css";
import { getModuleClasses } from "../../util";

interface DividerProps {
  dark?: boolean;
  dense?: boolean;
  elevated?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const Divider: React.FC<DividerProps> = ({
  dark = false,
  dense = false,
  elevated = false,
  style,
  className,
}) => {
  const getClasses = () => {
    return getModuleClasses(
      styles,
      `
        nu-divider
        ${dense ? "nu-divider--dense" : ""}
        nu-divider--${dark ? "dark" : "light"}
        ${elevated ? "nu-divider--elevated" : ""}
      `
    );
  };

  return <hr style={style} className={`${getClasses()} ${className}`} />;
};

Divider.displayName = "NuDivider";

export default Divider;
