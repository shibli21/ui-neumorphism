import React, { cloneElement, FC, useState } from "react";

import { callCallback } from "../util";
import TransitionWrapper from "./TransitionWrapper";
import { TransitionProps } from "react-transition-group/Transition";

type SlideCarouselProps = {
  axis?: string;
  reverse?: boolean;
  duration?: number;
  origin?: string;
  onUpdate?: (status: string) => void;
  children: React.ReactElement;
} & Omit<TransitionProps, "addEndListener">;

type TransitionStyles = {
  [key: string]: React.CSSProperties;
};
const SlideCarousel: FC<SlideCarouselProps> = ({
  axis = "Y",
  duration = 250,
  reverse = false,
  origin = "center center",
  onUpdate,
  children,
  ...props
}) => {
  const slideTransition = {
    transition: `transform ${duration}ms ease-in-out`,
  };

  const transitionStyles: TransitionStyles = {
    enteringX: { transform: "translateX(-100%)" },
    enteringXR: { transform: "translateX(100%)" },
    enteringY: { transform: "translateY(-100%)" },
    enteringYR: { transform: "translateY(100%)" },
    entered: {
      transform: "translate(0px)",
      ...slideTransition,
    },
    exitingX: {
      ...slideTransition,
      transform: "translateX(100%)",
    },
    exitingXR: {
      ...slideTransition,
      transform: "translateX(-100%)",
    },
    exitingY: {
      ...slideTransition,
      transform: "translateY(100%)",
    },
    exitingYR: {
      ...slideTransition,
      transform: "translateY(-100%)",
    },
  };

  const [status, setStatus] = useState("");

  const type = `${axis.toUpperCase()}${reverse ? "R" : ""}`;

  const getStatus = (status: string) =>
    status === "entering" || status === "exiting" ? `${status}${type}` : status;

  const updateStatus = (status: string) => {
    setStatus(status);

    onUpdate && callCallback(onUpdate, status);
  };

  const display = status ? (status === "exited" ? "none" : undefined) : "none";

  return (
    <TransitionWrapper
      timeout={{ exit: duration }}
      onUpdate={updateStatus}
      {...props}
    >
      {cloneElement(children, {
        style: {
          display,
          top: "0",
          position: "absolute",
          transformOrigin: origin,
          ...transitionStyles[getStatus(status)],
          ...children.props.style,
        },
      })}
    </TransitionWrapper>
  );
};

SlideCarousel.displayName = "NuSlideCarousel";

export default SlideCarousel;
