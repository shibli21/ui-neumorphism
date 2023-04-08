import React from "react";
import { Typography } from "../../index";
import { DefaultProps, TypographyProps } from "../../../assets";

interface Props extends TypographyProps {
  children?: React.ReactNode;
}

const H5: React.FC<Props> = (props: Props) => (
  <Typography {...props} type="h5">
    {props.children}
  </Typography>
);

H5.displayName = "NuH5";

export default H5;
