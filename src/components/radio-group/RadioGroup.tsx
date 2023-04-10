import React, { Children, cloneElement, FC, ReactNode, useState } from "react";
import { DefaultProps } from "../../assets";
import { callCallback, getModuleClasses, passDownProp, uid } from "../../util";
import Radio from "../radio/Radio";
import radioStyles from "./RadioGroup.module.css";

interface RadioGroupProps extends DefaultProps {
  id?: any;
  value?: any;
  disabled?: boolean;
  vertical?: boolean;
  onChange?: (params: { event: any; id: any; value: any }) => void;
  children: ReactNode;
}

const RadioGroup: FC<RadioGroupProps> = ({
  id,
  value,
  disabled,
  vertical = false,
  onChange,
  children,
  className,
  style,
  ...props
}: RadioGroupProps) => {
  const [state, setState] = useState({
    id: `${id || uid()}`,
    active: value,
    key: 1,
  });

  const handleChange = (
    { event, checked, value }: any,
    childOnChange: ((params: any) => void) | undefined
  ) => {
    const { id } = state;
    if (checked) {
      setState({ ...state, active: value, key: state.key + 1 });
    }
    callCallback(onChange, { event, id, value });
    callCallback(childOnChange, { event, checked, value });
  };

  const getClasses = () =>
    getModuleClasses(
      radioStyles,
      `
        nu-radio-group
        ${vertical ? "nu-radio-group--vertical" : ""}
      `
    );

  const radios = passDownProp(
    Children.map(children, (child: any) => {
      if (child.type === Radio) {
        const { value, onChange } = child.props;
        return cloneElement(child, {
          checked: state.active === value,
          onChange: (e) => handleChange(e, onChange),
        });
      }
    }),
    props,
    ["dark", "color", "disabled"]
  );

  return (
    <div
      key={state.key}
      style={style}
      className={`${getClasses()} ${className}`}
    >
      {radios}
    </div>
  );
};

RadioGroup.displayName = "NuRadioGroup";

export default RadioGroup;
