import React, { Children, cloneElement, useEffect, useState } from "react";

import { ToggleButton } from "../index";

import { CARD_PASS_DOWN, DefaultProps } from "../../assets";
import { callCallback, passDownProp } from "../../util";
import { ToggleButtonProps } from "../button-toggle/ToggleButton";
import { ButtonProps } from "../button/Button";

type ButtonGroupValue = string | string[];

interface ToggleButtonGroupProps
  extends DefaultProps,
    Omit<ButtonProps, "onClick" | "onChange"> {
  multiple?: boolean;
  mandatory?: boolean;
  color?: string;
  value?: ButtonGroupValue;
  onChange?: (active: ButtonGroupValue) => void;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement>,
    active: ButtonGroupValue
  ) => void;
  children: React.ReactElement[] | React.ReactElement;
}

const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = (props) => {
  const [active, setActive] = useState(props.value);
  const [key, setKey] = useState(1);

  useEffect(() => {
    if (JSON.stringify(props.value) !== JSON.stringify(active)) {
      callCallback(props.onChange, { active });
    }
  }, [props.value, active]);

  const handleClick = (event: any, child: React.ReactElement) => {
    let activeValue: ButtonGroupValue = "";
    const { selected, value } = event;
    const { multiple, mandatory, onClick } = props;
    if (selected && value) {
      if (multiple) {
        activeValue = [...(active || []), value];
      } else {
        activeValue = value;
      }
    } else {
      if (multiple && Array.isArray(active)) {
        activeValue = (active || []).filter((a) => a !== value);
        if (mandatory && !active.length) {
          activeValue = [value];
        }
      } else {
        if (mandatory && value) {
          activeValue = value;
        }
      }
    }

    setActive(activeValue);
    setKey(key + 1);

    callCallback(onClick, { event, active: activeValue });
  };

  const buttons = passDownProp(
    Children.map(props.children, (child) => {
      if (child.type === ToggleButton) {
        let selected = false;
        const { value } = child.props;

        if (Array.isArray(active)) {
          const trimmedActive = props.multiple
            ? active
            : active.filter((a, i) => i === 0);
          selected = !!trimmedActive.find((a) => a === value);
        } else {
          selected = active === value;
        }

        return cloneElement(child, {
          selected,
          key,
          onChange: (e: any) => handleClick(e, child),
        });
      }
    }),
    props,
    ["size", "color", ...CARD_PASS_DOWN]
  );

  return (
    <div style={props.style} className={props.className}>
      {buttons}
    </div>
  );
};

ToggleButtonGroup.displayName = "NuToggleButtonGroup";

export default ToggleButtonGroup;
