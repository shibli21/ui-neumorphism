import React, { cloneElement, useState } from "react";
import TransitionWrapper from "./TransitionWrapper";
import { TransitionStatus } from "react-transition-group";
import { TransitionProps } from "react-transition-group/Transition";

type SlideProps = TransitionProps & {
  axis?: string;
  reverse?: boolean;
  duration?: number;
  origin?: string;
  children: React.ReactElement;
};

interface TransitionStyles {
  enteringX: object;
  enteringXR: object;
  enteringY: object;
  enteringYR: object;
  entered: object;
  exiting: object;
  exited: object;
}

const Slide: React.FC<SlideProps> = ({
  axis = "Y",
  duration = 200,
  reverse = false,
  origin = "center center",
  children,

  ...props
}) => {
  const [status, setStatus] = useState<TransitionStatus>("entering");

  const defaultStyle = {
    transition: `all ${duration}ms ease-in-out`,
  };

  const transitionStyles: any = {
    enteringX: {
      opacity: 0,
      transform: "translateX(-50%)",
    },
    enteringXR: {
      opacity: 0,
      transform: "translateX(50%)",
    },
    enteringY: {
      opacity: 0,
      transform: "translateY(-50%)",
    },
    enteringYR: {
      opacity: 0,
      transform: "translateY(50%)",
    },
    entered: {
      opacity: 1,
      ...defaultStyle,
      transform: "translate(0)",
    },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  const getType = () => `${axis.toUpperCase()}${reverse ? "R" : ""}`;

  const getStatus = (status: TransitionStatus) =>
    status === "entering" ? `${status}${getType()}` : status;

  const updateStatus = (status: TransitionStatus) => setStatus(status);

  return (
    <TransitionWrapper
      axis={axis}
      reverse={reverse}
      duration={duration}
      origin={origin}
      onUpdate={updateStatus}
      {...props}
    >
      {cloneElement(children, {
        style: {
          opacity: 0,
          transformOrigin: origin,
          ...transitionStyles[getStatus(status)],
          ...(children as React.ReactElement).props.style,
        },
      })}
    </TransitionWrapper>
  );
};

Slide.displayName = "NuSlide";

export default Slide;
