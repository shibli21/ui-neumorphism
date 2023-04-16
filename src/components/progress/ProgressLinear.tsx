import React, { FC, useEffect } from "react";
import { DefaultProps } from "../../assets";
import { getModuleClasses, setCSSVariable, uid } from "../../util";
import styles from "./Progress.module.css";

interface ProgressLinearProps extends DefaultProps {
  height?: number;
  active?: boolean;
  striped?: boolean;
  bordered?: boolean;
  fillHeight?: boolean;
  value?: number;
  color?: string;
  indeterminate?: boolean;
  disabled?: boolean;
}

const ProgressLinear: FC<ProgressLinearProps> = ({
  value = 0,
  height = 9,
  active = true,
  dark,
  bordered,
  color,
  striped,
  fillHeight,
  indeterminate,
  className,
  disabled,
  style,
}) => {
  const [id, setId] = React.useState(uid());

  const getValue = () => {
    return value > 100 ? 100 : value < 0 ? 0 : value;
  };

  const getClasses = (classType: string) => {
    switch (classType) {
      case "progress":
        return getModuleClasses(
          styles,
          `
            nu-progress-linear
            nu-progress-linear--${dark ? "dark" : "light"}
            ${bordered ? "nu-progress-linear--bordered" : ""}
          `
        );
      case "bg":
        return getModuleClasses(
          styles,
          `
            nu-progress-linear--bg
            ${striped ? "nu-progress-linear--striped" : ""}
            ${indeterminate ? "nu-progress-linear--indeterminate" : ""}
          `
        );
      case "bg-wrapper":
        return getModuleClasses(
          styles,
          `
            nu-progress-linear--bg-wrapper
            ${fillHeight ? "nu-progress-linear--bg-filled" : ""}
          `
        );
    }
  };

  const getHeightStyle = (height: number) => {
    return {
      height: `${active ? height : 0}px`,
      borderRadius: `${height * 2}px`,
    };
  };

  useEffect(() => {
    const elem = document.getElementById(id);
    if (!disabled) {
      setCSSVariable(elem, "--selector-bg", color);
    }
  }, [id, disabled, color]);

  return (
    <div
      aria-valuemin={0}
      role="progressbar"
      aria-valuemax={100}
      aria-valuenow={getValue()}
      style={{ ...style, ...getHeightStyle(height) }}
      className={`${getClasses("progress")} ${className}`}
    >
      <div
        style={{ borderRadius: `${height * 2}px` }}
        className={`${getClasses("bg-wrapper")}`}
      >
        <div
          id={id}
          className={`${getClasses("bg")}`}
          style={{
            width: `${indeterminate ? 100 : getValue()}%`,
            ...getHeightStyle(fillHeight ? height : height - 5),
          }}
        />
      </div>
    </div>
  );
};

ProgressLinear.displayName = "NuProgressLinear";

export default ProgressLinear;
