import React from "react";
import { Typography } from "../../index";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
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
