import React, { FC } from "react";

import { TypographyProps } from "../../../assets/index";
import { Typography } from "../../index";

interface Props extends TypographyProps {
  children?: React.ReactNode;
}

const H4: FC<Props> = ({ children, ...props }) => {
  return (
    <Typography {...props} type="h4">
      {children}
    </Typography>
  );
};

H4.displayName = "NuH4";

export default H4;
