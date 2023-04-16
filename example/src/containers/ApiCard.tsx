import { mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useState } from "react";
import { Card, H5, H6, Table, TextField, useResize } from "ui-neumorphism";
import CodeBlock from "./CodeBlock";

interface ApiCardProps {
  dark: boolean;
  style?: React.CSSProperties;
  entity: string;
  className?: string;
  data: any[];
}

const ApiCard: React.FC<ApiCardProps> = ({
  dark,
  style,
  entity,
  className,
  data,
}) => {
  const size = useResize();

  const [search, setSearch] = useState("");

  const handleSearch = (value: string) => {
    setSearch(value.toLowerCase());
  };

  const sortedItems = data.sort((a, b) =>
    a.title === b.title ? 0 : +(a.title > b.title) || -1
  );

  const items = sortedItems.filter((e) =>
    e.title.toLowerCase().includes(search)
  );

  const headers = [
    { text: "Name", value: "name", verticalAlign: "top" },
    { text: "Type", value: "type", verticalAlign: "top" },
    { text: "Default", value: "initial", verticalAlign: "top" },
    { text: "Description", value: "description", verticalAlign: "top" },
  ];

  const searchField = (
    <TextField
      dark={dark}
      label="Search"
      onChange={(e) => handleSearch(e.value)}
      append={<Icon path={mdiMagnify} size={1} />}
    />
  );

  const searchProps =
    size === "sm"
      ? { description: searchField, actions: null }
      : { description: null, actions: searchField };

  return (
    <>
      <span id="api"></span>
      <Card flat dark={dark} style={style} className={`mb-3 ${className}`}>
        <H6>The API documentation of the {entity} component.</H6>
        <H5 className="mt-4 mb-3">Import</H5>
        <CodeBlock lang="jsx" noCollapse dark={!!dark}>
          {`import { ${entity} } from 'ui-neumorphism'`}
        </CodeBlock>
        <H5 className="mt-6 mb-3">Props</H5>
        <Table outlined headers={headers} items={items} {...searchProps} />
      </Card>
    </>
  );
};

export default ApiCard;
