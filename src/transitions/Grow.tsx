import React, { cloneElement, useState } from "react";

import TransitionWrapper from "./TransitionWrapper";

type TransitionStyles = {
  [key: string]: React.CSSProperties;
};

type GrowProps = {
  duration?: number;
  origin?: string;
  children: React.ReactElement;
  appear?: boolean;
  in?: boolean;
};

const Grow: React.FC<GrowProps> = ({
  duration = 200,
  origin = "center center",
  children,
  ...props
}) => {
  const [status, setStatus] = useState("");

  const transition = { transition: `all ${duration}ms ease-in-out` };

  const transitionStyles: TransitionStyles = {
    entering: {
      opacity: 1,
      transform: "scale(0)",
      visibility: "visible",
    },
    entered: {
      opacity: 1,
      transform: "scale(1.0)",
      ...transition,
    },
    exiting: {
      opacity: 0,
      transform: "scale(0)",
      ...transition,
    },
    exited: {
      opacity: 0,
      visibility: "hidden",
    },
  };

  const updateStatus = (newStatus: string) => {
    setStatus(newStatus);
  };

  return (
    <TransitionWrapper
      onUpdate={updateStatus}
      timeout={{ exit: duration }}
      {...props}
    >
      {cloneElement(children, {
        style: {
          opacity: 0,
          transformOrigin: origin,
          ...transitionStyles[status],
          ...(children as any)?.props?.style,
        },
      })}
    </TransitionWrapper>
  );
};

Grow.displayName = "NuGrow";

export default Grow;
