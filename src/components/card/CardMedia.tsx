import React, { FunctionComponent } from "react";
import { DefaultProps } from "../../assets/index";
import { H6 } from "../../index";
import { getModuleClasses } from "../../util/index";
import styles from "./Card.module.css";

interface CardMediaProps extends DefaultProps {
  height?: number;
  src?: string;
  title?: string;
  rounded?: boolean;
  disabled?: boolean;
}

const CardMedia: FunctionComponent<CardMediaProps> = ({
  height = 160,
  src,
  title,
  rounded,
  disabled,
  style,
  className,
  dark,
}) => {
  const getClass = (classType: string) => {
    switch (classType) {
      case "media":
        return getModuleClasses(
          styles,
          `
            nu-card-media
            nu-card-media--${dark ? "dark" : "light"}
            ${rounded ? "nu-card-media--rounded" : ""}
            ${disabled ? "nu-card-media--disabled" : ""}
          `
        );
      case "title":
        return getModuleClasses(styles, "nu-card-media-title");
      default:
        return "";
    }
  };

  return (
    <div
      title={title}
      style={{
        ...style,
        height: `${height}px`,
        backgroundImage: `url(${src})`,
      }}
      className={`${getClass("media")} ${className}`}
    >
      {title ? (
        <H6 dark={dark} className={`${getClass("title")}`}>
          {title}
        </H6>
      ) : null}
    </div>
  );
};

CardMedia.displayName = "NuCardMedia";

export default CardMedia;
