import React from "react";
import { Typography } from "../../index";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const H5: React.FC<Props> = (props: Props) => (
  <Typography {...props} type="h5">
    {props.children}
  </Typography>
);

H5.displayName = "NuH5";

export default H5;
