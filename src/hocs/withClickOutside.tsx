import React, { Component, RefObject } from "react";
import { findDOMNode } from "react-dom";
import { findClickInside } from "../util";

interface WithClickOutsideProps {
  [key: string]: any;
}

interface WithClickOutsideState {}

const withClickOutside = <P extends object>(
  WrappedComponent: React.ComponentType<P & WithClickOutsideProps>
) => {
  const componentName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  return class WithClickOutside extends Component<
    P & WithClickOutsideProps,
    WithClickOutsideState
  > {
    static displayName = `WithClickOutside(${componentName})`;

    public node: any = null;

    constructor(props: P & WithClickOutsideProps) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
      document.addEventListener("click", this.handleClick);
    }

    componentWillUnmount() {
      document.removeEventListener("click", this.handleClick);
    }

    handleClick = (e: MouseEvent) => {
      const parentNode = findDOMNode(this.node) as HTMLElement;
      const isClickInside = findClickInside(e, parentNode);
      if (isClickInside) {
        this.clickHandler(e, "Inside");
      } else {
        this.clickHandler(e, "Outside");
      }
    };

    clickHandler(e: MouseEvent, type: string = "Outside") {
      if (typeof this.node.props[`handleClick${type}`] === "function") {
        this.node.props[`handleClick${type}`](e);
        return;
      }

      if (typeof this.node[`handleClick${type}`] === "function") {
        this.node[`handleClick${type}`](e);
        return;
      }
      if (type === "Outside") {
        throw new Error(
          `${componentName}: needs a handleClickOutside function to handle outside clicks`
        );
      }
    }

    render() {
      return (
        <WrappedComponent
          ref={(ref: any) => (this.node = ref)}
          {...this.props}
        />
      );
    }
  };
};

export default withClickOutside;
