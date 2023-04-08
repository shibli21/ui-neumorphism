import React from "react";

import { TypographyProps } from "../../../assets/index";
import { Typography } from "../../index";

interface Props extends TypographyProps {
  children?: React.ReactNode;
}

const H1: React.FC<Props> = (props) => {
  return (
    <Typography {...props} type="h1">
      {props.children}
    </Typography>
  );
};

H1.displayName = "NuH1";

export default H1;
