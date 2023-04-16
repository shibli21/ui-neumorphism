import React, { PropsWithChildren, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism, okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import Icon from "@mdi/react";
import { mdiCodeTags, mdiGithub, mdiInvertColors } from "@mdi/js";
import {
  IconButton,
  Subtitle2,
  Card,
  Spacer,
  ToggleButton,
} from "ui-neumorphism";

interface CodeBlockProps {
  url?: string;
  dark?: boolean;
  noCollapse?: boolean;
  title?: string;
  lang?: string;
  onThemeChange?: () => void;
  open?: boolean;
  children: string | string[];
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  url,
  dark,
  noCollapse,
  title,
  lang,
  onThemeChange,
  children,
  ...props
}) => {
  const [open, setOpen] = useState(noCollapse ? true : !!props.open);

  return (
    <Card flat dark={dark}>
      {noCollapse ? null : (
        <Card flat className="pl-4 pr-1 py-1 d-flex align-center">
          <Subtitle2>{title}</Subtitle2>
          <Spacer />
          {url ? (
            <IconButton
              className="ml-1"
              onClick={() => window.open(url, "_blank")}
            >
              <Icon path={mdiGithub} size={1} />
            </IconButton>
          ) : null}
          <ToggleButton className="ml-1" onChange={onThemeChange}>
            <Icon path={mdiInvertColors} size={1} />
          </ToggleButton>
          {children ? (
            <IconButton className="ml-1" onClick={() => setOpen(!open)}>
              <Icon path={mdiCodeTags} size={1} />
            </IconButton>
          ) : null}
        </Card>
      )}
      <div className={`code-block ${!open ? "code-block-closed" : ""}`}>
        <SyntaxHighlighter
          children={children}
          language={lang || "javascript"}
          style={dark ? okaidia : prism}
        />
      </div>
    </Card>
  );
};

export default CodeBlock;
