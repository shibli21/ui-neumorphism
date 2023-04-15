import React, {
  Children,
  ReactElement,
  ReactNode,
  cloneElement,
  createElement,
} from "react";
import { createPortal, findDOMNode } from "react-dom";

import { Card, Grow } from "../../index";

import {
  CSS_DIMENSIONS,
  CssDimensions,
  DEFAULT_PROPS,
  DefaultProps,
} from "../../assets";
import {
  callCallback,
  getModuleClasses,
  passDownProp,
  pickKeys,
  uid,
} from "../../util";
import styles from "./Tooltip.module.css";

interface TooltipProps extends DefaultProps, CssDimensions {
  bottom?: boolean;
  top?: boolean;
  left?: boolean;
  right?: boolean;
  visible?: boolean;
  content?: ReactNode;
  transition?: React.ComponentType<any>;
  transitionProps?: any;
  inset?: boolean;
  onOpen?: (active: boolean) => void;
  onClose?: (active: boolean) => void;
  children?: ReactNode;
}

interface TooltipState {
  id: string;
  active: boolean;
  pos: {
    top: number;
    left: number;
  };
}

class Tooltip extends React.Component<TooltipProps, TooltipState> {
  static displayName = "NuTooltip";

  static defaultProps: Partial<TooltipProps> = {
    bottom: true,
    transition: Grow,
    transitionProps: {},
    ...DEFAULT_PROPS,
  };

  node: Element | null = null;
  controlled = false;

  constructor(props: TooltipProps) {
    super(props);
    this.state = {
      id: uid(),
      active: false,
      pos: {
        top: 0,
        left: 0,
      },
    };
    this.controlled = props.visible !== undefined;
    this.calcPosition = this.calcPosition.bind(this);
    this.handleMouseOnToolTip = this.handleMouseOnToolTip.bind(this);
  }

  get canView(): boolean {
    return this.controlled ? this.props.visible! : this.state.active;
  }

  get origin(): string {
    const d = " center";
    const { top, left, bottom, right } = this.props;
    if (top) return "bottom" + d;
    if (left) return "right" + d;
    if (right) return "left" + d;
    if (bottom) return "top" + d;
    return "top" + d;
  }

  get styles(): React.CSSProperties {
    const sizeStyles: { [key: string]: string } = {};
    const { pos } = this.state;

    const pickedStyles: any = pickKeys(this.props, CSS_DIMENSIONS);
    Object.keys(pickedStyles).map(
      (key) => (sizeStyles[key] = `${pickedStyles[key]}px`)
    );

    return {
      top: `${pos.top}px`,
      left: `${pos.left}px`,
      ...sizeStyles,
    };
  }

  get tooltip(): ReactNode {
    const { content, transitionProps, transition } = this.props;
    const Transition = transition || Grow;
    const pickedProps = pickKeys(this.props, ["dark", "inset"]);
    return createPortal(
      <Transition
        origin={this.origin}
        {...transitionProps}
        in={this.canView}
        appear
      >
        <Card
          {...pickedProps}
          id={this.state.id}
          style={this.styles}
          className={`${this.getClasses("tooltip")}`}
        >
          {content}
        </Card>
      </Transition>,
      document.body
    );
  }

  get tooltipChildren() {
    return Children.map(this.props.children as ReactElement, (child, i) => {
      if (i === 0 && child) {
        const { onMouseLeave, onMouseOver, className: cc } = child.props || {};
        const cls = `${cc || ""} ${this.getClasses("cursor-pointer")}`.trim();
        const newProps = {
          ...child.props,
          className: cls,
          ref: (ref: any) => (this.node = findDOMNode(ref) as Element),
          onMouseEnter: (e: React.MouseEvent) =>
            this.handleMouseOnToolTip(e, onMouseOver),
          onMouseLeave: (e: React.MouseEvent) =>
            this.handleMouseOnToolTip(e, onMouseLeave),
        };

        return typeof child === "string"
          ? createElement("span", newProps, child)
          : cloneElement(child as React.ReactElement, newProps);
      }
    });
  }

  getClasses(type: string): string {
    switch (type) {
      case "tooltip":
        return getModuleClasses(styles, "nu-tooltip");
      default:
        return getModuleClasses(styles, type);
    }
  }

  calcPosition(): void {
    const { top, left, right } = this.props;

    const tooltip = document.getElementById(this.state.id);
    if (!tooltip) return;
    const tooltipDimensions = tooltip.getBoundingClientRect();
    if (!this.node) return;
    const nodeDimension = this.node.getBoundingClientRect();

    const {
      top: nT,
      left: nL,
      right: nR,
      width: nW,
      height: nH,
      bottom: nB,
    } = nodeDimension;
    const { width: tW, height: tH } = tooltipDimensions;

    const pos = { top: 0, left: 0 };

    if (top) {
      pos.top = nT - tH - 16;
      pos.left = nL + nW / 2 - tW / 2;
    } else if (left) {
      pos.top = nT - tH / 2 + nH / 2;
      pos.left = nL - tW - 16;
    } else if (right) {
      pos.top = nT - tH / 2 + nH / 2;
      pos.left = nR + 16;
    } else {
      pos.top = nB + 16;
      pos.left = nL + nW / 2 - tW / 2;
    }

    this.setState({ pos });
  }

  handleMouseOnToolTip(
    e: React.MouseEvent<Element, MouseEvent>,
    callback: any
  ) {
    const { onOpen, onClose } = this.props;
    const isOver = e.type === "mouseenter";

    if (!this.controlled) {
      this.setState({ active: isOver });
    }

    callCallback(callback, e);
    callCallback(isOver ? onOpen : onClose, isOver);
  }

  componentDidMount() {
    this.calcPosition();
    document.addEventListener("scroll", this.calcPosition, true);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.calcPosition, true);
  }

  render() {
    const { style, className } = this.props;
    const children = passDownProp(this.tooltipChildren, this.props, ["dark"]);
    return (
      <div style={style} className={className}>
        {children}
        {this.tooltip}
      </div>
    );
  }
}

export default Tooltip;
