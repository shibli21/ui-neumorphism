import React, { FC } from "react";
import { Typography } from "../../index";
import { TypographyProps } from "../../../assets";

interface Subtitle2Props extends TypographyProps {
  children?: React.ReactNode;
}

const Subtitle2: FC<Subtitle2Props> = (props) => {
  return (
    <Typography {...props} type="subtitle-2">
      {props.children}
    </Typography>
  );
};

Subtitle2.displayName = "NuSubtitle2";

export default Subtitle2;
