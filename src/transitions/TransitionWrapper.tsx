import React, { ReactNode } from "react";
import { Transition } from "react-transition-group";

import { callCallback } from "../util";
import { TransitionProps } from "react-transition-group/Transition";

export type UpdateState =
  | "enter"
  | "entered"
  | "exiting"
  | "exited"
  | "exit"
  | "entering";

type TransitionWrapperProps = TransitionProps & {
  onUpdate?: (state: UpdateState) => void;
  children: ReactNode;
};

class TransitionWrapper extends React.Component<TransitionWrapperProps> {
  static displayName = "NuTransitionWrapper";

  static defaultProps: Partial<TransitionWrapperProps> = {
    timeout: 0,
  };

  constructor(props: TransitionWrapperProps) {
    super(props);
    this.state = { updated: 0 };
    this.handleExit = this.handleExit.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleExited = this.handleExited.bind(this);
    this.handleExiting = this.handleExiting.bind(this);
    this.handleEntered = this.handleEntered.bind(this);
    this.handleEntering = this.handleEntering.bind(this);
  }

  update(data: UpdateState) {
    callCallback(this.props.onUpdate, data);
  }

  handleExit() {
    this.update("exit");
  }

  handleEnter() {
    this.update("enter");
  }

  handleExited() {
    this.update("exited");
  }

  handleExiting() {
    this.update("exiting");
  }

  handleEntered() {
    this.update("entered");
  }

  handleEntering() {
    this.update("entering");
  }

  componentDidMount() {
    this.setState({ updated: 1 });
  }

  render() {
    const { children, onUpdate, ...otherProps } = this.props;
    return (
      <Transition
        onExit={this.handleExit}
        onEnter={this.handleEnter}
        onExited={this.handleExited}
        onEntered={this.handleEntered}
        onExiting={this.handleExiting}
        onEntering={this.handleEntering}
        {...otherProps}
      >
        {children}
      </Transition>
    );
  }
}

export default TransitionWrapper;
