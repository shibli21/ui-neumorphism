import React from "react";

import { Switch, Card, H4, H5, H6, Subtitle1 } from "ui-neumorphism";

import DocCard from "../containers/DocCard";
import ApiCard from "../containers/ApiCard";
import { switchApi } from "../docs/api/selection-control-api";
import { toggle, toggleLabel } from "../docs/code/selection-control-code";

const url =
  "https://github.com/AKAspanion/ui-neumorphism/blob/master/example/src/pages/SwitchView.jsx";
const SwitchView = ({ dark }: { dark: boolean }) => {
  return (
    <Card flat dark={dark}>
      <span id="component"></span>
      <H4>
        <a href="#component">Switch</a>
      </H4>
      <H6>Switches toggle the state of a single setting on or off.</H6>
      <Subtitle1 className="mt-3">
        Switches are the preferred way to adjust settings on mobile. The option
        that the switch controls, as well as the state it’s in, should be made
        clear from the corresponding inline label.
      </Subtitle1>
      <DocCard
        url={url}
        content={
          <Card flat className="d-flex align-center justify-center flex-wrap">
            <Switch color="var(--error)" checked />
            <Switch color="var(--primary)" />
            <Switch />
            <Switch disabled />
            <Switch disabled checked />
            <Switch checked color="var(--success)" />
          </Card>
        }
        code={[toggle, dark, ["Switch"]]}
      />
      <DocCard
        url={url}
        className="mt-12"
        title={<H5>Switch with label</H5>}
        subtitle={<Subtitle1>Switch can be provided with a label.</Subtitle1>}
        content={
          <Card flat className="d-flex align-center justify-center flex-wrap">
            <Switch color="var(--error)" label="Switch" checked />
            <Switch label="Primary" color="var(--primary)" />
            <Switch label="Default" />
            <Switch disabled label="Disabled" />
            <Switch disabled checked label="Checked & Disabled" />
            <Switch checked label="Checked" color="var(--success)" />
          </Card>
        }
        code={[toggleLabel, dark, ["Switch"]]}
      />
      <H4 className="mt-12">
        <a href="#api">API</a>
      </H4>
      <ApiCard dark={dark} entity="Switch" data={switchApi(dark)} />
    </Card>
  );
};

export default SwitchView;
