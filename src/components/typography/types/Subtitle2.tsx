import React, { FC } from "react";
import { Typography } from "../../index";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Subtitle2: FC<Props> = (props) => {
  return (
    <Typography {...props} type="subtitle-2">
      {props.children}
    </Typography>
  );
};

Subtitle2.displayName = "NuSubtitle2";

export default Subtitle2;
