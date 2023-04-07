import React from "react";

interface ListProps extends React.HTMLAttributes<HTMLDivElement> {}

const List: React.FC<ListProps> = ({ className, ...restProps }) => {
  return (
    <div className={className} {...restProps}>
      list
    </div>
  );
};

List.displayName = "NuList";

export default List;
