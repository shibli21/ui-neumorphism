import React, { FC, ReactNode } from "react";
import { DefaultProps } from "../../assets/index";
import { getModuleClasses, passDownProp } from "../../util/index";
import styles from "./Carousel.module.css";

interface CarouselItemProps extends DefaultProps {
  children?: ReactNode;
}

const CarouselItem: FC<CarouselItemProps> = ({
  style,
  className,
  children,
  dark,
  ...props
}) => {
  const getClasses = (type: string) => getModuleClasses(styles, type);

  return (
    <div
      style={style}
      className={`${getClasses("nu-carousel-item")} ${className}`}
    >
      {passDownProp(children, props, ["dark"])}
    </div>
  );
};

CarouselItem.displayName = "NuCarouselItem";

export default CarouselItem;
