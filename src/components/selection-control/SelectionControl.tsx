import React from "react";
import { MOUSE_EVENTS, SelectionControlProps } from "../../assets/index";
import {
  callCallback,
  getModuleClasses,
  pickKeys,
  setCSSVariable,
  uid,
} from "../../util";
import Body1 from "../typography/types/Body1";

import checkboxStyles from "../checkbox/Checkbox.module.css";
import radioStyles from "../radio/Radio.module.css";
import switchStyles from "../switch/Switch.module.css";

export type SelectionControlType = "radio" | "checkbox" | "switch";

interface Props extends SelectionControlProps {
  type: SelectionControlType;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onChange?: ({
    event,
    id,
    checked,
  }: {
    event: React.ChangeEvent<HTMLInputElement>;
    id: string;
    checked: boolean;
  }) => void;
  onMouseOut?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onMouseOver?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onMouseUp?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onMouseMove?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onMouseDown?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

const SelectionControl: React.FC<Props> = (props) => {
  const { color, disabled, dark, style, label, className } = props;

  const [isChecked, setIsChecked] = React.useState<boolean>(
    props.checked || false
  );

  const styles = React.useMemo<any>(() => {
    return {
      radioStyles,
      switchStyles,
      checkboxStyles,
    };
  }, []);

  const idRef = React.useRef<string>(props.id || uid());

  const stylesRef = React.useRef({
    radioStyles,
    switchStyles,
    checkboxStyles,
  });

  const typeRef = React.useRef<SelectionControlType>(props.type);

  const getModuleClass = (elem: string) => {
    const type = getInputType(typeRef.current);
    const style = styles[`${type}Styles`];

    const disabledInputClass = disabled ? `nu-${type}--disabled` : "";
    const disabledLabelClass = disabled
      ? `nu-${type}-label--disabled`
      : "cursor-pointer";

    switch (elem) {
      case "container":
        return getModuleClasses({}, "selection-control-container");
      case "input":
        return getModuleClasses(
          style,
          `
        nu-${type}
        ${disabledInputClass}
        nu-${type}--${dark ? "dark" : "light"}
      `
        );
      case "label":
        return getModuleClasses(
          style,
          `
        nu-${type}-label
        ${disabledLabelClass}
      `
        );
      default:
        return "";
    }
  };

  const getInputType = (type: SelectionControlType) => {
    return (
      ["radio", "checkbox", "switch"].find((i) => i === type) || "checkbox"
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newIsChecked = event.target.checked;
    setIsChecked(newIsChecked);

    const { onChange } = props;
    callCallback(onChange, { event, id: idRef.current, checked: newIsChecked });
  };

  React.useEffect(() => {
    const elem = document.getElementById(idRef.current);
    if (!disabled) {
      setCSSVariable(elem, "--selector-bg", color);
    }
  }, [disabled, color]);

  const inputType = getInputType(typeRef.current);

  const events = pickKeys(props, MOUSE_EVENTS);
  const attrs = pickKeys(props, ["name", "value", "required", "disabled"]);

  return (
    <div
      style={style}
      className={`${getModuleClass("container")} ${className}`}
    >
      <input
        {...attrs}
        {...events}
        id={idRef.current}
        checked={isChecked}
        className={getModuleClass("input")}
        onChange={handleChange}
        type={inputType === "switch" ? "checkbox" : inputType}
      />
      <label htmlFor={idRef.current} className={getModuleClass("label")}>
        <Body1 dark={dark} disabled={disabled}>
          {label}
        </Body1>
      </label>
    </div>
  );
};

SelectionControl.displayName = "NuSelectionControl";

export default SelectionControl;
