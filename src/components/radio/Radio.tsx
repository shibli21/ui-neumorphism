import React from "react";
import { SelectionControlProps } from "../../assets/index";
import { callCallback } from "../../util";
import SelectionControl from "../selection-control/SelectionControl";

export interface RadioProps extends SelectionControlProps {
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    id?: string | undefined,
    checked?: boolean | undefined,
    value?: string | undefined
  ) => void;
}

const Radio: React.FC<RadioProps> = (props: RadioProps) => {
  const handleChange = ({
    event,
    id,
    checked,
  }: {
    event: React.ChangeEvent<HTMLInputElement>;
    id: string;
    checked: boolean;
  }) => {
    const { value, onChange } = props;
    callCallback(onChange, { event, id, checked, value });
  };

  return (
    <SelectionControl
      type="radio"
      {...props}
      onChange={(e: {
        event: React.ChangeEvent<HTMLInputElement>;
        id: string;
        checked: boolean;
      }) => handleChange(e)}
    />
  );
};

Radio.displayName = "NuRadio";

export default Radio;
