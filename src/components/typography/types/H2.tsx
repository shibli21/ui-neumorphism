import React from "react";

import { TypographyProps } from "../../../assets/index";
import { Typography } from "../../index";

interface Props extends TypographyProps {
  children?: React.ReactNode;
}

const H2: React.FC<Props> = (props) => {
  return (
    <Typography {...props} type="h2">
      {props.children}
    </Typography>
  );
};

H2.displayName = "NuH2";

export default H2;
