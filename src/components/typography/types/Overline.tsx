import React, { FC } from "react";
import { Typography } from "../../index";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Overline: FC<Props> = ({ children, ...props }) => {
  return (
    <Typography {...props} type="overline">
      {children}
    </Typography>
  );
};

Overline.displayName = "NuOverline";

export default Overline;
