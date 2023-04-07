import React from "react";
import { SelectionControlProps } from "../../assets/index";
import SelectionControl from "../selection-control/SelectionControl";

interface SwitchProps extends SelectionControlProps {}

const Switch: React.FC<SwitchProps> = (props) => {
  return <SelectionControl type="switch" {...props} />;
};

Switch.displayName = "NuSwitch";

export default Switch;
