import React, { FC } from "react";
import { Typography } from "../../index";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Subtitle1: FC<Props> = (props) => {
  return (
    <Typography {...props} type="subtitle-1">
      {props.children}
    </Typography>
  );
};

Subtitle1.displayName = "NuSubtitle1";

export default Subtitle1;
