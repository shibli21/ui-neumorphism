import React from "react";

import { Card, H4, H6, TextArea } from "ui-neumorphism";

import DocCard from "../containers/DocCard";
import ApiCard from "../containers/ApiCard";
import { textAreaApi } from "../docs/api/input-api";

const url =
  "https://github.com/AKAspanion/ui-neumorphism/blob/master/example/src/pages/TextareaView.jsx";

const TextareaView = ({ dark }: { dark: boolean }) => {
  return (
    <Card flat dark={dark}>
      <span id="component"></span>
      <H4>
        <a href="#component">TextArea</a>
      </H4>
      <H6>
        The TextArea component is used for collecting large amounts of textual
        data.
      </H6>
      <DocCard
        url={url}
        content={
          <Card flat className="d-flex align-center justify-center flex-wrap">
            <TextArea label="Text area" />
            <TextArea dense label="Text area" />
            <TextArea height={94} label="Text area" />
            <TextArea outlined label="Text area" />
            <TextArea dense autoExpand label="Text area" />
            <TextArea height={94} bordered label="Text area" />
            <TextArea height={94} autoExpand label="Text area" />
            <TextArea loading label="Text area" />
            <TextArea outlined height={94} label="Text area" />
            <TextArea disabled label="Text area" />
            <TextArea rounded height={56} label="Text area" />
            <TextArea rounded width={320} label="Text area" />
            ``
          </Card>
        }
      />
      <H4 className="mt-12">
        <a href="#api">API</a>
      </H4>
      <ApiCard dark={dark} entity="TextArea" data={textAreaApi(dark)} />
    </Card>
  );
};

export default TextareaView;
