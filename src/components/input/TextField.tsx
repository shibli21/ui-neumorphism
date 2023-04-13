import React, {
  FC,
  ReactNode,
  createElement,
  forwardRef,
  useEffect,
  useState,
} from "react";

import { callCallback, getModuleClasses, pickKeys, uid } from "../../util";
import styles from "../input/Input.module.css";

import { Caption, ProgressLinear, Subtitle1 } from "../../index";

export interface TextFieldProps {
  id?: string;
  name?: string;
  type?: string;
  tag?: string;
  value?: string;
  width?: number;
  height?: number;
  readonly?: boolean;
  autofocus?: boolean;
  inputStyles?: React.CSSProperties;
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
  rules?: any[];
  counter?: boolean;
  hideExtra?: boolean;
  uncontrolled?: boolean;
  dark?: boolean;
  hint?: string;
  dense?: boolean;
  rounded?: boolean;
  outlined?: boolean;
  bordered?: boolean;
  style?: React.CSSProperties;
  className?: string;
  label?: string | ReactNode;
  append?: ReactNode;
  prepend?: ReactNode;
  onChange?: (event: any) => void;
  onBlur?: (event: any) => void;
  onFocus?: (event: any) => void;
  onInput?: (event: any) => void;
  onKeyDown?: (event: any) => void;
  onKeyUp?: (event: any) => void;
}

const TextField = forwardRef((props: TextFieldProps, ref: any) => {
  const {
    type = "text",
    tag = "input",
    value: propsValue,
    id: propsId,
    name,
    width,
    height,
    readonly,
    autofocus,
    inputStyles,
    placeholder,
    loading,
    disabled,
    rules = [],
    counter,
    hideExtra,
    uncontrolled,
    dark,
    hint,
    dense,
    rounded,
    outlined,
    bordered,
    style,
    className,
    label,
    append,
    prepend,
  } = props;

  const [value, setValue] = useState(propsValue || "");
  const [valid, setValid] = useState(true);
  const [focused, setFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [id] = useState(propsId || uid());
  const [count, setCount] = useState((propsValue || "").length);

  const canShowLabel = !placeholder && !value;
  const isDisabled = loading ? true : disabled;

  const getClasses = (classType: string, flag?: boolean) => {
    if (classType === "container") {
      return getModuleClasses(
        styles,
        `
              nu-text-field-container
              ${dense ? "nu-text-field-container--dense" : ""}
              ${rounded ? "nu-text-field-container--rounded" : ""}
              ${disabled ? "nu-text-field-container--disabled" : ""}
              `
      );
    } else if (classType === "text-field") {
      return getModuleClasses(
        styles,
        `
              nu-text-field
              nu-text-field--${dark ? "dark" : "light"}
              ${rounded ? "nu-text-field--rounded" : ""}
              ${outlined ? "nu-text-field--outlined" : ""}
              ${bordered ? "nu-text-field--bordered" : ""}
              ${readonly ? "nu-text-field--readonly" : ""}
              ${isDisabled ? "nu-text-field--disabled" : ""}
              `
      );
    } else if (classType === "error") {
      return getModuleClasses(
        styles,
        `nu-text-field-${flag ? "hint" : "error"}`
      );
    } else {
      return getModuleClasses(styles, `nu-text-field-${classType}`);
    }
  };

  const handleChange = (event: any) => {
    const eventValue = event.target.value;
    setCount(eventValue.length);

    if (!hideExtra) {
      validate(eventValue);
    }

    if (!uncontrolled) {
      setValue(eventValue);
    }

    callCallback(props.onChange, {
      event,
      id,
      value: eventValue,
      valid,
    });
  };

  const handleFocus = (event: any) => {
    setFocused(true);
    callCallback(props.onFocus, {
      event,
      id,
    });
  };

  const handleBlur = (event: any) => {
    setFocused(false);
    callCallback(props.onBlur, {
      event,
      id,
    });
  };

  const validate = (value: any) => {
    let isValid = true;
    let message = "Invalid";

    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      const ruleValid = rule(value);

      if (ruleValid !== true) {
        message = ruleValid;
        isValid = false;
        break;
      }
    }

    if (counter !== undefined && value.length > counter) {
      isValid = false;
      message = `Max ${counter} characters`;
    }

    setValid(isValid);
    setErrorMessage(message);
  };

  useEffect(() => {
    if (propsValue !== value && uncontrolled) {
      propsValue && setValue(propsValue);
    }
  }, [propsValue]);

  const input = () => {
    const className = `${getClasses("text-field")} ${
      tag === "textarea" ? getClasses("text-area") : ""
    }`;
    const events = pickKeys(props, ["onInput", "onKeyUp", "onKeyDown"]);

    const inputProps = {
      id: id,
      className,
      type: type,
      name: name,
      value: value,
      readOnly: readonly,
      autoFocus: autofocus,
      placeholder: placeholder,
      disabled: isDisabled,
      onBlur: (e: any) => handleBlur(e),
      onFocus: (e: any) => handleFocus(e),
      onChange: (e: any) => handleChange(e),
      tabIndex: isDisabled ? -1 : undefined,
      style: {
        width: `${width}px`,
        height: `${height}px`,
        minHeight: `${height}px`,
        ...inputStyles,
      },
      ...events,
    };
    return tag === "textarea" ? (
      <textarea {...inputProps} ref={ref} />
    ) : (
      <input {...inputProps} ref={ref} />
    );
  };

  return (
    <div style={style} className={`${getClasses("wrapper")} ${className}`}>
      {prepend ? (
        <div className={`${getClasses("prepend")}`}>{prepend}</div>
      ) : null}
      <div className={`${getClasses("container")}`}>
        {canShowLabel ? (
          <label htmlFor={id} className={`${getClasses("label")}`}>
            <Subtitle1
              secondary
              dark={dark}
              component="div"
              disabled={disabled}
            >
              {label}
            </Subtitle1>
          </label>
        ) : null}
        {loading ? (
          <ProgressLinear
            fillHeight
            height={2}
            dark={dark}
            indeterminate
            className={`${getClasses("loading")}`}
          />
        ) : null}
        {input()}
       

        {hideExtra && !counter ? null : (
          <div className={`${getClasses("caption-wrapper", valid)}`}>
            {hideExtra ? (
              hint
            ) : (
              <Caption
                secondary
                dark={dark}
                component="div"
                className={`${getClasses("error", valid)}`}
              >
                {valid ? hint : errorMessage}
              </Caption>
            )}
            {counter ? (
              <Caption
                secondary
                dark={dark}
                component="div"
                className={`${getClasses("counter")}`}
              >
                {count}/{counter}
              </Caption>
            ) : null}
          </div>
        )}
      </div>
      {append ? (
        <div className={`${getClasses("append")}`}>{append}</div>
      ) : null}
    </div>
  );
});

TextField.displayName = "NuTextField";

export default TextField;
