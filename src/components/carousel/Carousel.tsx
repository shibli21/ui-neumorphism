import React, { Children, ReactElement, ReactNode } from "react";
import {
  CAROUSEL_DEFAULT_PROPS,
  CAROUSEL_PROP_TYPES,
  DefaultProps,
} from "../../assets/index";
import { SlideCarousel } from "../../index";
import { callCallback, getModuleClasses, passDownProp } from "../../util";
import styles from "./Carousel.module.css";

interface CarouselState {
  prevActive: number;
  disabled: boolean;
  active: number;
}

interface CarouselProps extends DefaultProps {
  children: ReactElement[];
  value?: number;
  onChange?: (e: { active: number }) => void;
  onDelimiterClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  interval?: number;
  cycle?: boolean;
  vertical?: boolean;
  reverse?: boolean;
  hideDelimiters?: boolean;
  delimiterIcon?: ReactNode;
  activeDelimiterIcon?: ReactNode;
  nextIcon?: ReactNode;
  prevIcon?: ReactNode;
  height?: string;
  continuous?: boolean;
  showArrows?: boolean;
  showIndicators?: boolean;
  showArrowsOnHover?: boolean;
  delay?: number;
}

class Carousel extends React.Component<CarouselProps, CarouselState> {
  private timer: NodeJS.Timeout | null = null;
  private disabledTimeout: NodeJS.Timeout | null = null;

  static displayName = "NuCarousel";

  static defaultProps = CAROUSEL_DEFAULT_PROPS;

  static propTypes = CAROUSEL_PROP_TYPES;

  constructor(props: CarouselProps) {
    super(props);
    this.state = {
      prevActive: 0,
      disabled: false,
      active: props.value || 0,
    };
  }

  private get axis(): "X" | "Y" {
    const { vertical } = this.props;
    return vertical ? "Y" : "X";
  }

  private get styles() {
    const { height } = this.props;
    return { height };
  }

  private get carouselItems() {
    const { active, prevActive } = this.state;
    const { children, reverse: reverseProp, continuous, dark } = this.props;

    let reverse = prevActive < active;
    if (continuous) {
      const lastIndex = Children.count(children) - 1;
      if (active === 0 && prevActive === lastIndex) reverse = true;
      if (prevActive === 0 && active === lastIndex) reverse = false;
    }

    reverse = reverseProp ? !reverse : reverse;

    return passDownProp(
      Children.map(children, (child, index) => {
        return (
          <SlideCarousel
            appear
            axis={this.axis}
            reverse={reverse}
            in={index === active}
          >
            {child}
          </SlideCarousel>
        );
      }),
      { dark },
      "dark"
    );
  }

  private get nextIcon() {
    const { nextIcon, showArrows, showArrowsOnHover } = this.props;
    if (!showArrows) return null;

    const classes = `${this.getClasses(
      "nu-carousel-arrow nu-carousel-arrow--next"
    )} ${
      !showArrowsOnHover ? this.getClasses("nu-carousel-arrow--always") : ""
    }`;
    const icon = (
      <div className={classes} onClick={() => this.handleIconClick("next")}>
        {nextIcon || <span>&rsaquo;</span>}
      </div>
    );
    return icon;
  }

  private get prevIcon() {
    const { prevIcon, showArrows, showArrowsOnHover } = this.props;
    if (!showArrows) return null;

    const classes = `${this.getClasses(
      "nu-carousel-arrow nu-carousel-arrow--prev"
    )} ${
      !showArrowsOnHover ? this.getClasses("nu-carousel-arrow--always") : ""
    }`;
    const icon = (
      <div className={classes} onClick={() => this.handleIconClick("prev")}>
        {prevIcon || <span>&rsaquo;</span>}
      </div>
    );
    return icon;
  }

  private getDelimiters(items: ReactElement[]) {
    const { active } = this.state;
    const { hideDelimiters } = this.props;
    if (hideDelimiters) return null;

    return items.map((item, index) => {
      const classes = `${this.getClasses("nu-carousel-delimiter")} ${
        index === active ? this.getClasses("nu-carousel-delimiter--active") : ""
      }`;
      return (
        <div
          key={index}
          className={classes}
          onClick={(e) => this.handleDelimiterClick(e, index)}
        />
      );
    });
  }

  getClasses(type: string) {
    const { dark } = this.props;
    switch (type) {
      case "main":
        return getModuleClasses(
          styles,
          `
            nu-carousel
            nu-carousel--${dark ? "dark" : "light"}
          `
        );
      default:
        return getModuleClasses(styles, type);
    }
  }

  nextSlide() {
    const { children } = this.props;
    const itemsLength = children.length;
    const { active, disabled } = this.state;
    if (itemsLength && !disabled) {
      const next = active + 1 >= itemsLength ? 0 : active + 1;
      this.updateActiveState(next, active);
    }
  }

  prevSlide() {
    const { children } = this.props;
    const itemsLength = children.length;
    const { active, disabled } = this.state;
    if (itemsLength && !disabled) {
      const next = active - 1 < 0 ? itemsLength - 1 : active - 1;
      this.updateActiveState(next, active);
    }
  }

  startTimer() {
    if (this.props.cycle) {
      this.timer = setInterval(() => {
        this.stopTimeout();
        this.nextSlide();
        this.startTimeout();
      }, this.props.interval);
    }
  }

  stopTimer() {
    if (this.props.cycle) {
      this.timer && clearInterval(this.timer);
    }
  }

  startTimeout() {
    this.setState({ disabled: true });
    this.disabledTimeout = setTimeout(() => {
      this.setState({ disabled: false });
    }, 300);
  }

  stopTimeout() {
    this.disabledTimeout && clearTimeout(this.disabledTimeout);
  }

  toggleClocks(action: "stop" | "start") {
    if (action === "stop") {
      this.stopTimer();
      this.stopTimeout();
    } else {
      this.startTimer();
      this.startTimeout();
    }
  }

  updateActiveState(active: number, prevActive: number) {
    this.setState({ active });
    this.setState({ prevActive });
  }

  handleIconClick(direction: "next" | "prev") {
    this.toggleClocks("stop");
    direction === "next" ? this.nextSlide() : this.prevSlide();
    this.toggleClocks("start");
  }

  handleDelimiterClick(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    active: number
  ) {
    const { onDelimiterClick } = this.props;

    this.toggleClocks("stop");
    this.updateActiveState(active, this.state.active);
    this.toggleClocks("start");

    callCallback(onDelimiterClick, e);
  }

  componentDidMount() {
    if (this.props.cycle) {
      this.startTimer();
    }
  }

  componentDidUpdate(props: CarouselProps, state: CarouselState) {
    const { active } = this.state;
    if (JSON.stringify(state.active) !== JSON.stringify(active)) {
      callCallback(props.onChange, { active });
    }
  }

  componentWillUnmount() {
    this.stopTimer();
    this.stopTimeout();
  }

  render() {
    const items = this.carouselItems;
    const { style, className, hideDelimiters } = this.props;
    return (
      <div
        style={{ ...this.styles, ...style }}
        className={`${this.getClasses("main")} ${className}`}
      >
        <div className={this.getClasses("nu-carousel-container")}>{items}</div>
        {hideDelimiters ? null : (
          <div className={this.getClasses("nu-carousel-controls")}>
            {this.getDelimiters(items)}
          </div>
        )}
        {this.nextIcon}
        {this.prevIcon}
      </div>
    );
  }
}

export default Carousel;
