import React from "react";

import { Typography } from "../../index";
import { TypographyProps } from "../../../assets/index";

interface Props extends TypographyProps {
  children?: React.ReactNode;
}

const Caption: React.FC<Props> = (props) => {
  return (
    <Typography {...props} type="caption">
      {props.children}
    </Typography>
  );
};

Caption.displayName = "NuCaption";

export default Caption;
