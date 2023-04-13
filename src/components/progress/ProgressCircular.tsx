import React, { useEffect } from "react";
import { DefaultProps } from "../../assets";
import { getModuleClasses, setCSSVariable, uid } from "../../util";
import styles from "./Progress.module.css";

interface ProgressCircularProps extends DefaultProps {
  children?: React.ReactNode;
  className?: string;
  label?: string;
  style?: React.CSSProperties;
  indeterminate?: boolean;
  size?: number;
  flat?: boolean;
  width?: number;
  rotate?: number;
  elevated?: boolean;
  value?: number;
  color?: string;
  disabled?: boolean;
}

const ProgressCircular: React.FC<ProgressCircularProps> = ({
  size = 36,
  width = 2,
  style,
  label,
  children,
  className,
  indeterminate,
  dark,
  flat,
  elevated,
  value = 0,
  rotate = 0,
  color,
  disabled,
}) => {
  const [id, setId] = React.useState(uid());

  const radius = () => {
    return Number(size / 2);
  };

  const circumference = () => {
    return 2 * Math.PI * radius();
  };

  const strokeDashArray = () => {
    return Math.round(circumference() * 1000) / 1000;
  };

  const strokeDashArrayOffset = () => {
    return calcStrokeDashArrayOffset(normalizedValue());
  };

  const viewBox = () => {
    return `${viewBoxSize()} ${viewBoxSize()} ${2 * viewBoxSize()} ${
      2 * viewBoxSize()
    }`;
  };

  const viewBoxSize = () => {
    return radius() / (1 - Number(width) / Number(size));
  };

  const normalizedValue = () => {
    return value ? (value > 100 ? 100 : value < 0 ? 0 : value) : 0;
  };

  const normalizedRotation = () => {
    return rotate ? (rotate > 360 ? 360 : rotate < 0 ? 0 : rotate) : 0;
  };

  useEffect(() => {
    const elem = document.getElementById(id);
    if (!disabled) {
      setCSSVariable(elem, "--selector-bg", color);
    }
  }, [id, disabled, color]);

  const getClasses = (classType: string) => {
    if (classType === "progress") {
      return getModuleClasses(
        styles,
        ` nu-progress-circular
          nu-progress-circular--${flat ? "flat" : ""}
          nu-progress-circular--${dark ? "dark" : "light"}
          nu-progress-circular--${elevated ? "elevated" : "not-elevated"}
        `
      );
    } else {
      return getModuleClasses(styles, `nu-progress-circular--${classType}`);
    }
  };

  const calcStrokeDashArrayOffset = (value: number) => {
    return ((100 - value) / 100) * circumference();
  };

  return (
    <div
      id={id}
      aria-valuemin={0}
      role="progressbar"
      aria-valuemax={100}
      aria-valuenow={normalizedValue()}
      className={`${getClasses("progress")} ${className}`}
      style={{
        ...style,
        width: `${size + 9}px`,
        height: `${size + 9}px`,
      }}
    >
      <div
        className={`${getClasses("svg")}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          transform: `translate3d(-50%, -50%, 0) rotate(${normalizedRotation}deg)`,
        }}
      >
        <svg
          className={`${indeterminate ? getClasses("indeterminate") : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox={viewBox()}
        >
          <circle
            r={radius()}
            cx={2 * viewBoxSize()}
            cy={2 * viewBoxSize()}
            className={`${getClasses("circle")}`}
            style={{
              strokeWidth: `${width}`,
              strokeDasharray: strokeDashArray(),
              strokeDashoffset: indeterminate
                ? calcStrokeDashArrayOffset(0)
                : strokeDashArrayOffset(),
            }}
          />
        </svg>
      </div>
      <div
        className={`${getClasses("outer")}`}
        style={{
          width: `${size + 5}px`,
          height: `${size + 5}px`,
        }}
      />
      <div
        className={`${getClasses("inner")}`}
        style={{
          width: `${size - width * 2 - 6}px`,
          height: `${size - width * 2 - 6}px`,
        }}
      />
      <label
        className={`${getClasses("label")}`}
        style={{ fontSize: `${radius() * 0.6}px` }}
      >
        {children || label}
      </label>
    </div>
  );
};

ProgressCircular.displayName = "NuProgressCircular";

export default ProgressCircular;
