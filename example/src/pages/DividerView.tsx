import React from "react";

import { Body2, Card, Divider, H4, H6 } from "ui-neumorphism";

import ApiCard from "../containers/ApiCard";
import DocCard from "../containers/DocCard";
import { dividerApi } from "../docs/api/divider-api";
import { divider } from "../docs/code/divider-code";
const url =
  "https://github.com/AKAspanion/ui-neumorphism/blob/master/example/src/pages/DividerView.jsx";
const DividerView = ({ dark }: { dark: boolean }) => {
  return (
    <Card flat dark={dark}>
      <H4>Divider</H4>
      <H6>A divider is a line that separates content into clear groups.</H6>
      <DocCard
        url={url}
        content={
          <Card flat className="fill-width text-center px-12">
            <Divider />
            <br />
            <Body2>Default</Body2>
            <br />
            <br />
            <Divider dense />
            <br />
            <Body2>Dense</Body2>
            <br />
            <br />
            <Divider elevated />
            <br />
            <Body2>Elevated</Body2>
            <br />
            <br />
            <Divider dense elevated />
            <br />
            <br />
            <Body2>Dense & Elevated</Body2>
          </Card>
        }
        code={[divider, dark]}
      />
      <Divider dense className="mt-6" />
      <H4 className="mt-12">
        <a href="#api">API</a>
      </H4>
      <ApiCard dark={dark} entity="Divider" data={dividerApi(dark)} />
    </Card>
  );
};

export default DividerView;
