import React, { FC } from "react";
import { Typography } from "../../index";
import { TypographyProps } from "../../../assets";

interface Subtitle1Props extends TypographyProps {
  children?: React.ReactNode;
}

const Subtitle1: FC<Subtitle1Props> = (props) => {
  return (
    <Typography {...props} type="subtitle-1">
      {props.children}
    </Typography>
  );
};

Subtitle1.displayName = "NuSubtitle1";

export default Subtitle1;
