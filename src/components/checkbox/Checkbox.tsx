import React from "react";

import { callCallback } from "../../util";
import { SelectionControlProps } from "../../assets";
import SelectionControl from "../selection-control/SelectionControl";

interface CheckboxProps extends Omit<SelectionControlProps, "onChange"> {
  onChange?: ({
    event,
    id,
    checked,
  }: {
    event: React.ChangeEvent<HTMLInputElement>;
    id: string;
    checked: boolean;
  }) => void;
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const handleChange = ({
    event,
    id,
    checked,
  }: {
    event: React.ChangeEvent<HTMLInputElement>;
    id: string;
    checked: boolean;
  }) => {
    const { onChange } = props;
    callCallback(onChange, { event, id, value: checked });
  };

  return (
    <SelectionControl
      {...props}
      type="checkbox"
      onChange={(e: {
        event: React.ChangeEvent<HTMLInputElement>;
        id: string;
        checked: boolean;
      }) => handleChange(e)}
    />
  );
};

Checkbox.displayName = "NuCheckbox";

export default Checkbox;
