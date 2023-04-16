import React, { useState } from "react";

import { Card } from "ui-neumorphism";
import CodeBlock from "./CodeBlock.js";

interface DocCardProps {
  url?: string;
  code?: any[];
  dark?: boolean;
  style?: React.CSSProperties;
  title?: React.ReactNode;
  content?: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
}

const DocCard = (props: DocCardProps) => {
  const { url, code, dark, style, title, content, subtitle, className } = props;

  const [darkTheme, setDarkTheme] = useState(props.dark);

  const handleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const localDark = darkTheme === undefined ? false : true;

  return (
    <Card flat dark={dark} style={style} className={className}>
      {title}
      {subtitle}
      <Card dark={localDark ? darkTheme : dark} outlined className="mt-4">
        <Card flat outlined={false} className="d-flex justify-center py-12">
          {content}
        </Card>
        <CodeBlock
          dark={localDark ? darkTheme : dark}
          url={url}
          lang="jsx"
          onThemeChange={handleTheme}
        >
          {code
            ? code[0](localDark ? darkTheme : code[1], ...(code[2] || []))
            : null}
        </CodeBlock>
      </Card>
    </Card>
  );
};

DocCard.displayName = "NuDocCard";

export default DocCard;
