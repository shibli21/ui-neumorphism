import React from "react";

import { Typography } from "../../index";
import { TypographyProps } from "../../../assets";

interface Props extends TypographyProps {
  children?: React.ReactNode;
}

const H3: React.FC<Props> = (props) => {
  return (
    <Typography {...props} type="h3">
      {props.children}
    </Typography>
  );
};

H3.displayName = "NuH3";

export default H3;
