import React from "react";

import { Typography } from "../../index";

interface Props {
  disabled?: boolean;
  secondary?: boolean;
  dark?: boolean;
  style?: React.CSSProperties;
  className?: string;
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
