import React, { FC, useEffect, useRef, useState } from "react";
import { TextField } from "../../index";
import { callCallback } from "../../util/index";
import { TextFieldProps } from "./TextField";

interface TextAreaProps extends TextFieldProps {
  autoExpand?: boolean;
}

const TextArea: FC<TextAreaProps> = (props) => {
  const [minHeight, setMinHeight] = useState(() => {
    const { dense, height } = props;
    const defaultHeight = dense ? 32 : 40;
    return Math.max(height || 0, defaultHeight);
  });

  const textareaRef = useRef<any>(null);

  useEffect(() => {
    if (!props.autoExpand) return;
    const textarea = textareaRef.current;

    if (!textarea) return;

    const outerHeight = parseInt(window.getComputedStyle(textarea).height, 10);
    const diff = outerHeight - textarea.clientHeight;
    textarea.style.height = 0;
    textarea.style.height = `${Math.max(
      minHeight,
      textarea.scrollHeight + diff
    )}px`;
  }, [props.autoExpand, minHeight]);

  function onInput(
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    prop: keyof TextAreaProps
  ) {
    if (!props.autoExpand) return;
    callCallback(props[prop], e);
  }

  const { autoExpand, inputStyles, ...others } = props;
  return (
    <TextField
      tag="textarea"
      ref={textareaRef}
      onInput={(e) => onInput(e, "onInput")}
      onKeyDown={(e) => onInput(e, "onKeyDown")}
      inputStyles={{ ...inputStyles }}
      {...others}
    />
  );
};

TextArea.displayName = "NuTextArea";

export default TextArea;
