import React, { FC } from "react";

import { TypographyProps } from "../../../assets/index";
import Typography from "../Typography";

interface Body1Props extends TypographyProps {
  children: React.ReactNode;
}

const Body1: FC<Body1Props> = ({ style, className, children, dark }) => {
  return (
    <Typography dark={dark} style={style} className={className} type="body-1">
      {children}
    </Typography>
  );
};

Body1.displayName = "NuBody1";

export default Body1;
