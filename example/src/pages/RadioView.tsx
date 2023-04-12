import React, { useState } from "react";

import {
  RadioGroup,
  Subtitle1,
  Divider,
  Radio,
  Card,
  H4,
  H6,
  H5,
} from "ui-neumorphism";

import DocCard from "../containers/DocCard";
import ApiCard from "../containers/ApiCard";
import { radioGroupApi, radioApi } from "../docs/api/selection-control-api";
import { radio, radioStandalone } from "../docs/code/selection-control-code";
const url =
  "https://github.com/AKAspanion/ui-neumorphism/blob/master/example/src/pages/RadioView.jsx";

const RadioView = ({ dark }: { dark: boolean }) => {
  const [selectedValue, setSelectedValue] = useState("1");
  const [key, setKey] = useState(1);

  function onChange(e: any) {
    console.log("RadioGroup onChange event:", e);
  }

  const onSelect = (e: any) => {
    const { value: selectedValue } = e;
    setSelectedValue(selectedValue);
    setKey(key + 1);
    console.log("Radio onChange event:", e);
  };

  return (
    <Card flat dark={dark}>
      <H4>Radio</H4>
      <H6>Radio buttons allow the user to select one option from a set.</H6>
      <Subtitle1 className="mt-3">
        Use radio buttons when the user needs to see all available options.
        <br />
        Radio buttons should have the most commonly used option selected by
        default.
      </Subtitle1>
      <DocCard
        url={url}
        className="mt-12"
        title={<H5>RadioGroup</H5>}
        subtitle={
          <Subtitle1>
            <code>RadioGroup</code> is a wrapper used to group Radio components
            that provides an easier API.
          </Subtitle1>
        }
        content={
          <RadioGroup
            value="1"
            className="mt-6"
            color="var(--primary)"
            onChange={onChange}
          >
            <Radio value="1" label="Female" />
            <Radio value="2" label="Male" />
            <Radio value="3" label="Other" disabled />
          </RadioGroup>
        }
        code={[radio, dark]}
      />
      <DocCard
        url={url}
        className="mt-12"
        title={<H5>Standalone radio buttons</H5>}
        subtitle={
          <Subtitle1>
            Radio can also be used standalone, without the&nbsp;
            <code>RadioGroup</code> wrapper.
          </Subtitle1>
        }
        content={
          <Card flat key={key} className="text-center mt-6">
            <Radio
              value="1"
              color="#299ae6"
              label="Selection 1"
              onChange={onSelect}
              checked={selectedValue === "1"}
            />
            <Radio
              value="2"
              color="red"
              label="Selection 2"
              onChange={onSelect}
              checked={selectedValue === "2"}
            />
            <Radio
              value="3"
              color="green"
              label="Selection 3"
              onChange={onSelect}
              checked={selectedValue === "3"}
            />
            <Radio
              value="4"
              label="Selection 4"
              onChange={onSelect}
              checked={selectedValue === "4"}
            />
            <Radio
              value="5"
              disabled
              color="#299ae6"
              label="Selection 5"
              onChange={onSelect}
              checked={selectedValue === "5"}
            />
            <Subtitle1 className="mt-6">
              Selected Value: "{selectedValue}"
            </Subtitle1>
          </Card>
        }
        code={[radioStandalone, dark]}
      />
      <DocCard
        url={url}
        className="mt-12"
        title={<H5>Orientation</H5>}
        subtitle={
          <Subtitle1>
            RadioGroup wrapper can be used with <code>vertical</code> flag to
            stack them vertically.
          </Subtitle1>
        }
        content={
          <RadioGroup
            vertical
            value="1"
            color="var(--error)"
            onChange={onChange}
          >
            <Radio value="1" label="Female" />
            <Radio value="2" label="Male" />
            <Radio value="3" label="Other" disabled />
          </RadioGroup>
        }
        code={[radio, dark, ["vertical"]]}
      />
      <Divider dense className="mt-6" />
      <H4 className="mt-12">
        <a href="#api">API</a>
      </H4>
      <ApiCard dark={dark} entity="RadioGroup" data={radioGroupApi(dark)} />
      <div className="mt-12"></div>
      <ApiCard dark={dark} entity="Radio" data={radioApi(dark)} />
    </Card>
  );
};

export default RadioView;
