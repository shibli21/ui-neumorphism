import React, { FC } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import {
  Body1,
  Button,
  Card,
  Divider,
  H4,
  H6,
  Subtitle1,
  ToggleButton,
  ToggleButtonGroup,
  overrideThemeVariables,
} from "ui-neumorphism";

import CodeBlock from "../containers/CodeBlock";
import {
  ThemeType,
  importCode,
  themeUtilCode,
  themes,
} from "../docs/code/home.js";
//@ts-ignore
import { FitnessApp } from "../examples/index.js";

interface HomeProps extends RouteComponentProps {
  dark: boolean;
}

const Home: FC<HomeProps> = ({ dark, ...props }) => {
  const [theme, setTheme] = React.useState("default");

  function handleThemeChange(e: any) {
    const theme: ThemeType = e.active || "default";
    setTheme(theme);
    overrideThemeVariables(themes[theme]);
  }

  function handleExampleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    props.history.push("/examples");
  }

  return (
    <Card flat dark={dark} className="py-2">
      <Subtitle1>
        <code>ui-neumorphism</code> is a react component library designed on the
        "new skeuomorphism" UI/UX trend.
      </Subtitle1>
      <br />
      <FitnessApp dark={dark} />
      <Card flat className="text-center my-12">
        <Button
          outlined
          color="var(--primary)"
          onClick={(e) => handleExampleClick(e)}
        >
          Show more
        </Button>
      </Card>
      <H4 className="mt-12">Installation</H4>
      <Divider dense className="mt-1 mb-3" />
      <CodeBlock noCollapse dark={dark} lang="bash">
        {`npm install --save ui-neumorphism`}
      </CodeBlock>
      <H4 className="mt-12">Usage</H4>
      <Divider dense className="mt-1 mb-3" />
      <Body1 className="mb-2">
        Components in this package can be imported as individual React
        component.
      </Body1>
      <CodeBlock noCollapse dark={dark}>
        {`import { Card, Button } from 'ui-neumorphism'`}
      </CodeBlock>
      <Body1 className="mb-2 mt-4">
        Quick usage example to get you started:
      </Body1>
      <CodeBlock noCollapse dark={dark}>
        {importCode}
      </CodeBlock>
      <H4 className="mt-12">Theming</H4>
      <Divider dense className="mt-1 mb-3" />
      <Body1 className="mb-2">In neumorphism UI, theming is dead simple.</Body1>
      <Body1 className="mb-4">
        It is accomplished by using and modifying root css variables for colors.
      </Body1>
      <Body1 className="mb-4">
        To change the theme, you modify the root css variables directly or with
        the help of <code>overrideThemeVariables()</code>&nbsp;function, like
        this:
      </Body1>
      <CodeBlock noCollapse dark={dark}>
        {themeUtilCode}
      </CodeBlock>
      <Body1 className="mt-4">
        Using the power of CSS variables, you can change the theme anywhere in
        the entire application.
      </Body1>
      <H6 className="mb-1 mt-10">Live theme example</H6>
      <Body1 className="mb-1">
        Toggle below buttons to see change in theme
      </Body1>
      <ToggleButtonGroup
        style={{ margin: "8px" }}
        onChange={(e) => handleThemeChange(e)}
      >
        {[1, 2, 3, 4].map((i) => {
          return (
            <ToggleButton
              key={i}
              text={false}
              className="mt-3 px-3 mr-6"
              value={`${dark ? "dark" : "light"}-${i}`}
            >
              {`${dark ? "Dark" : "Light"} ${i}`}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
      <H4 className="mt-12">Author</H4>
      <Divider dense className="mt-1 mb-3" />
      <Body1>Ankit Kumar Pandit</Body1>
      <br />
    </Card>
  );
};

export default withRouter(Home);
