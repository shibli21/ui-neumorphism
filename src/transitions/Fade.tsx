import React, { cloneElement, useState } from "react";

import TransitionWrapper from "./TransitionWrapper";
import { TransitionProps } from "react-transition-group/Transition";

type FadeProps = TransitionProps & {
  duration: number;
  children: React.ReactElement;
};

const Fade: React.FC<FadeProps> = ({ duration = 200, children, ...props }) => {
  const [status, setStatus] = useState("");

  const defaultStyle = {
    opacity: 0,
    transition: `opacity ${duration}ms ease-in-out`,
  };

  const transitionStyles: any = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  const updateStatus = (status: string) => {
    setStatus(status);
  };

  return (
    <TransitionWrapper onUpdate={updateStatus} {...props}>
      {cloneElement(children, {
        style: {
          ...defaultStyle,
          ...transitionStyles[status],
          ...children.props.style,
        },
      })}
    </TransitionWrapper>
  );
};

export default Fade;
