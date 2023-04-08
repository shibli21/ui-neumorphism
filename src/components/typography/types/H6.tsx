import React from "react";
import { TypographyProps } from "../../../assets";
import { Typography } from "../../index";

interface Props extends TypographyProps {
  children?: React.ReactNode;
}

const H6: React.FC<Props> = (props) => {
  return (
    <Typography {...props} type="h6">
      {props.children}
    </Typography>
  );
};

H6.displayName = "NuH6";

export default H6;
