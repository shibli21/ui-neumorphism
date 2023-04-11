import React, { useEffect, useState } from "react";
import { DefaultProps } from "../../assets";
import { withImage } from "../../index";
import { getModuleClasses } from "../../util";
import styles from "../parallax/Parallax.module.css";

interface ParallaxProps extends DefaultProps {
  speed?: number;
  alt?: string;
  src?: string;
  height?: number;
  containerId?: string;
  loaded?: boolean;
  imageWidth: number;
  imageHeight: number;
}

const Parallax: React.FC<ParallaxProps> = ({
  speed = 1,
  alt,
  src,
  height = 400,
  containerId,
  imageHeight,
  imageWidth,
  className,
  dark,
  loaded,
  style,
  ...props
}) => {
  const [parallax, setParallax] = useState(0);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  const getClass = (type: string) => getModuleClasses(styles, type);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const parallaxDist = imageHeight - height;
      let parallax = 0;
      let scrollTop = 0;
      let windowHeight = 0;
      let percentScrolled = 0;
      let windowScrollHeight = 1;
      if (container) {
        windowHeight = container.offsetHeight;
        scrollTop = Math.round(container.scrollTop);
        windowScrollHeight = container.scrollHeight;
        percentScrolled = scrollTop / (windowScrollHeight - windowHeight);
      } else {
        const doc = document.documentElement || document.body;
        scrollTop = doc.scrollTop;
        windowHeight = doc.clientHeight;
        windowScrollHeight = doc.scrollHeight;
        percentScrolled = scrollTop / (windowScrollHeight - windowHeight);
      }
      parallax = Math.round(parallaxDist * percentScrolled * speed);
      setParallax(parallax);
    };

    const containerElement =
      containerId && document.getElementById(containerId);
    if (containerElement) {
      containerElement.addEventListener("scroll", handleScroll);
      setContainer(containerElement);
    } else {
      document.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      } else {
        document.removeEventListener("scroll", handleScroll);
      }
    };
  }, [container, containerId, speed, props]);

  const parallaxImage =
    src && loaded ? (
      <div className={getClass("nu-parallax--img-container")}>
        <img
          alt={alt}
          src={src}
          className={getClass("nu-parallax--img")}
          style={{ transform: `translate(-50%, ${parallax}px)` }}
        />
      </div>
    ) : null;

  return (
    <div
      style={{ ...style, height: `${height}px` }}
      className={`${getClass("nu-parallax")} ${className}`}
    >
      {parallaxImage}
    </div>
  );
};

Parallax.displayName = "NuParallax";

export default withImage(Parallax);
