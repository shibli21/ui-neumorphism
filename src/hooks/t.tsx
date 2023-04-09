import React, { useEffect } from "react";
import { Transition } from "react-transition-group";

import { callCallback } from "../util";
import {
  TransitionProps,
  TransitionStatus,
} from "react-transition-group/Transition";

type TransitionWrapperProps = TransitionProps & {
  onUpdate?: (status: TransitionStatus) => void;
};

const TransitionWrapper: React.FC<TransitionWrapperProps> = ({
  children,
  onUpdate,
  timeout = 0,
  ...otherProps
}) => {
  const update = (status: TransitionStatus) => {
    if (onUpdate) {
      callCallback(onUpdate, status);
    }
  };

  const handleExited = () => update("exited");
  const handleExiting = () => update("exiting");
  const handleEntered = () => update("entered");
  const handleEntering = () => update("entering");

  useEffect(() => {
    update("entered");
  }, []);

  return (
    <Transition
      onExited={handleExited}
      onEntered={handleEntered}
      onExiting={handleExiting}
      onEntering={handleEntering}
      timeout={timeout}
      {...otherProps}
    >
      {children}
    </Transition>
  );
};

export default TransitionWrapper;
