import React from "react";
import styles from "./Avatar.module.css";

import { getModuleClasses, uid, setCSSVariable } from "../../util";
import { withImage } from "../../hocs";
import { SIZES, Size } from "../../assets";

interface AvatarProps {
  alt?: string;
  src?: string;
  square?: boolean;
  rounded?: boolean;
  color?: string;
  bgColor?: string;
  style?: React.CSSProperties;
  className?: string;
  loaded?: boolean;
  children?: React.ReactNode;
  size?: Size | number;
}

const Avatar: React.FC<AvatarProps> = ({
  alt,
  src,
  square,
  rounded,
  color,
  bgColor,
  style,
  className,
  loaded,
  children,
  size = "medium",
}) => {
  const id = React.useRef(uid());
  const initials = React.useMemo(() => {
    const initials = alt?.match(/\b\w/g) || [];
    return ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
  }, [alt]);
  const isSizeNumber = React.useMemo(() => {
    if (typeof size === "number") return true;
  }, [size]);
  const sizeText = React.useMemo(
    () => SIZES.find((s) => s === size) || "medium",
    [size]
  );
  const getSize = React.useMemo(() => {
    const s = sizeText;
    return isSizeNumber
      ? size
      : s === "small"
      ? 24
      : s === "medium"
      ? 40
      : s === "large"
      ? 56
      : 40;
  }, [sizeText, isSizeNumber, size]);
  const variant = React.useMemo(
    () => (square ? "square" : rounded ? "rounded" : "circle"),
    [square, rounded]
  );
  const avatarChildren = React.useMemo(() => {
    if (src && loaded) {
      return <img alt={alt} src={src} width={getSize} height={getSize} />;
    } else if (children) {
      return children;
    } else if (alt) {
      return initials;
    }
  }, [src, loaded, alt, children, initials, getSize]);
  const avatarClass = React.useMemo(
    () =>
      getModuleClasses(
        styles,
        `
            nu-avatar
            nu-avatar--${variant}
            ${isSizeNumber ? "" : `nu-avatar--${sizeText}`}
          `
      ),
    [styles, variant, isSizeNumber, sizeText]
  );

  React.useEffect(() => {
    const elem = document.getElementById(id.current);
    setCSSVariable(elem, "--avatar-bg-color", bgColor);
    setCSSVariable(elem, "--avatar-text-color", color);
  }, [bgColor, color]);

  return (
    <div
      id={id.current}
      style={{ ...style, width: getSize, height: getSize }}
      className={`${avatarClass} ${className}`}
    >
      {avatarChildren}
    </div>
  );
};

Avatar.displayName = "NuAvatar";

export default withImage(Avatar);
