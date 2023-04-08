import React from "react";

import { Typography } from "../../index";
import { TypographyProps } from "../../../assets/index";

interface Props extends TypographyProps {
  children?: React.ReactNode;
}

const Body2: React.FC<Props> = (props) => {
  return (
    <Typography {...props} type="body-2">
      {props.children}
    </Typography>
  );
};

Body2.displayName = "NuBody2";

export default Body2;
