import React, { Children, FC, ReactNode, useEffect, useState } from "react";

import { SlideCarousel } from "../../index";

import carouselStyles from "./Carousel.module.css";
import { getModuleClasses, callCallback, passDownProp } from "../../util";
import {
  CAROUSEL_PROP_TYPES,
  CAROUSEL_DEFAULT_PROPS,
  DefaultProps,
} from "../../assets";

interface CarouselProps extends DefaultProps {
  value?: number;
  cycle?: boolean;
  height?: number;
  reverse?: boolean;
  interval?: number;
  nextIcon?: ReactNode;
  prevIcon?: ReactNode;
  vertical?: boolean;
  onChange?: Function;
  showArrows?: boolean;
  continuous?: boolean;
  delimiterIcon?: ReactNode;
  hideDelimiters?: boolean;
  showArrowsOnHover?: boolean;
  activeDelimiterIcon?: ReactNode;
  onDelimiterClick?: Function;
  children: ReactNode;
}

const Carousel = ({
  activeDelimiterIcon,
  continuous,
  cycle,
  delimiterIcon,
  height = 400,
  hideDelimiters,
  interval = 5000,
  nextIcon,
  onChange,
  prevIcon,
  reverse,
  showArrows,
  showArrowsOnHover,
  vertical,
  value,
  onDelimiterClick,
  style,
  className,
  children,
  dark,
}: CarouselProps) => {
  let timer: any;
  let disabledTimeout: any;
  const [prevActive, setPrevActive] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [active, setActive] = useState(value || 0);

  function axis() {
    return vertical ? "Y" : "X";
  }

  function styles() {
    return { height };
  }

  function carouselItems() {
    let localReverse = prevActive < active;
    if (continuous && children && Array.isArray(children)) {
      const lastIndex = children.length - 1;
      if (active === 0 && prevActive === lastIndex) localReverse = true;
      if (prevActive === 0 && active === lastIndex) localReverse = false;
    }

    localReverse = reverse ? !localReverse : localReverse;

    return passDownProp(
      Children.map(children, (child: any, index) => {
        return (
          <SlideCarousel
            appear
            axis={axis()}
            reverse={localReverse}
            in={index === active}
          >
            {child}
          </SlideCarousel>
        );
      }),
      {
        dark,
      },
      ["dark"]
    );
  }

  function getNextIcon() {
    if (!showArrows) return null;

    const classes = `${getClasses(
      "nu-carousel-arrow nu-carousel-arrow--next"
    )} ${!showArrowsOnHover ? getClasses("nu-carousel-arrow--always") : ""}`;
    const icon = (
      <div className={classes} onClick={() => handleIconClick("next")}>
        {nextIcon || <span>&rsaquo;</span>}
      </div>
    );
    return icon;
  }

  function getPrevIcon() {
    if (!showArrows) return null;

    const classes = `${getClasses(
      "nu-carousel-arrow nu-carousel-arrow--prev"
    )} ${!showArrowsOnHover ? getClasses("nu-carousel-arrow--always") : ""}`;
    const icon = (
      <div className={classes} onClick={() => handleIconClick("prev")}>
        {prevIcon || <span>&rsaquo;</span>}
      </div>
    );
    return icon;
  }

  function getDelimiters(items: any[]) {
    return items.map((item: any, index: React.Key | null | undefined) => {
      return (
        <div
          key={index}
          className={`${
            !delimiterIcon ? getClasses("nu-carousel-delimiter") : ""
          } ${
            active === index && !delimiterIcon
              ? getClasses("nu-carousel-delimiter--active")
              : ""
          }`}
          onClick={(e) => handleDelimiterClick(e, index)}
        >
          {active === index
            ? activeDelimiterIcon || delimiterIcon
            : delimiterIcon}
        </div>
      );
    });
  }

  function getClasses(type: string) {
    switch (type) {
      case "main":
        return getModuleClasses(
          carouselStyles,
          `
            nu-carousel
            nu-carousel--${dark ? "dark" : "light"}
          `
        );
      default:
        return getModuleClasses(carouselStyles, type);
    }
  }

  function nextSlide() {
    const itemsLength = Children.count(children);

    if (itemsLength && !disabled) {
      const next = active + 1 >= itemsLength ? 0 : active + 1;
      updateActiveState(next, active);
    }
  }

  function prevSlide() {
    const itemsLength = Children.count(children);

    if (itemsLength && !disabled) {
      const next = active - 1 < 0 ? itemsLength - 1 : active - 1;
      updateActiveState(next, active);
    }
  }

  function startTimer() {
    if (cycle) {
      timer = setInterval(() => {
        stopTimeout();
        nextSlide();
        startTimeout();
      }, interval);
    }
  }

  function stopTimer() {
    if (cycle) {
      clearInterval(timer);
    }
  }

  function startTimeout() {
    setDisabled(true);
    disabledTimeout = setTimeout(() => {
      setDisabled(false);
    }, 300);
  }

  function stopTimeout() {
    clearTimeout(disabledTimeout);
  }

  function toggleClocks(action = "stop") {
    if (action === "stop") {
      stopTimer();
      stopTimeout();
    } else {
      startTimer();
      startTimeout();
    }
  }

  function updateActiveState(
    active: React.SetStateAction<number>,
    prevActive: React.SetStateAction<number>
  ) {
    setActive(active);
    setPrevActive(prevActive);
  }

  function handleIconClick(direction: string) {
    toggleClocks();
    if (direction === "next") nextSlide();
    else prevSlide();

    toggleClocks("start");
  }

  function handleDelimiterClick(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    active: any
  ) {
    toggleClocks();
    updateActiveState(active, active);
    toggleClocks("start");

    callCallback(onDelimiterClick, e);
  }

  // componentDidMount() {
  //   if (this.props.cycle) {
  //     this.startTimer();
  //   }
  // }

  // componentDidUpdate(props, state) {
  //   const { active } = this.state;
  //   if (JSON.stringify(state.active) !== JSON.stringify(active)) {
  //     callCallback(props.onChange, { active });
  //   }
  // }

  // componentWillUnmount() {
  //   this.stopTimer();
  //   this.stopTimeout();
  // }

  useEffect(() => {
    if (cycle) {
      startTimer();
    }

    return () => {
      stopTimer();
      stopTimeout();
    };
  }, [cycle, startTimer, stopTimer, stopTimeout]);

  useEffect(() => {
    if (JSON.stringify(active) !== JSON.stringify(active)) {
      callCallback(onChange, { active });
    }
  }, [active]);

  const items = carouselItems();
  return (
    <div
      style={{ ...styles(), ...style }}
      className={`${getClasses("main")} ${className}`}
    >
      <div className={getClasses("nu-carousel-container")}>{items}</div>
      {hideDelimiters ? null : (
        <div className={getClasses("nu-carousel-controls")}>
          {getDelimiters(items)}
        </div>
      )}
      {getNextIcon()}
      {getPrevIcon()}
    </div>
  );
};
Carousel.displayName = "NuCarousel";

export default Carousel;
