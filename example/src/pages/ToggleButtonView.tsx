import React, { useState } from "react";

import Icon from "@mdi/react";
import {
  mdiFormatBold,
  mdiFormatItalic,
  mdiFormatUnderline,
  mdiFormatAlignLeft,
  mdiFormatAlignRight,
  mdiFormatAlignCenter,
  mdiFormatAlignJustify,
} from "@mdi/js";

import {
  H4,
  H6,
  H5,
  Card,
  Divider,
  Subtitle1,
  ToggleButton,
  ToggleButtonGroup,
} from "ui-neumorphism";

import DocCard from "../containers/DocCard";
import ApiCard from "../containers/ApiCard";
import { toggleButtonGroupApi, toggleButtonApi } from "../docs/api/button-api";
import {
  toggleButtons,
  toggleStandalone,
  toggleSizes,
} from "../docs/code/button-code";

const url =
  "https://github.com/AKAspanion/ui-neumorphism/blob/master/example/src/pages/ToggleButtonViewx";

const ToggleButtonView = ({ dark }: { dark: boolean }) => {
  const [standaloneActive, setStandaloneActive] = useState(1);
  const [mandatoryActive, setMandatoryActive] = useState("1");
  const [multipleActive, setMultipleActive] = useState([]);
  const [active, setActive] = useState(["1"]);
  const [key, setKey] = useState(1);

  const handleStandaloneChange = (e: any) => {
    setStandaloneActive(e.value);
    setKey(key + 1);
  };

  const mandatoryGroupChange = (e: any) => {
    setMandatoryActive(e.active);
  };

  const multipleGroupChange = (e: any) => {
    setMultipleActive(e.active);
  };

  const handleChange = (e: any) => {
    setActive(e.active);
    setKey(key + 1);
  };

  return (
    <Card flat dark={dark}>
      <H4>
        <a href="#component">
          <H4>Toggle Buttons</H4>
        </a>
      </H4>
      <H6>Toggle buttons can be used to group related options.</H6>
      <Subtitle1 className="mt-3">
        To emphasize groups of related Toggle buttons, a group should share a
        common container.
        <br />
        The <code>ToggleButtonGroup</code> controls the selected state of its
        child buttons when given its own value prop.
      </Subtitle1>
      <DocCard
        className="mt-12"
        url={url + "#L101-L118"}
        title={<H5>Mandatory selection</H5>}
        subtitle={
          <Subtitle1>
            Mandatory <code>ToggleButtonGroup</code> always has a value.
          </Subtitle1>
        }
        content={
          <Card flat outlined={false}>
            <Card
              flat
              className="mt-4 d-flex flex-wrap align-center justify-center"
            >
              <ToggleButtonGroup
                value="1"
                mandatory
                text={false}
                color="var(--primary)"
                onChange={mandatoryGroupChange}
              >
                {[
                  mdiFormatAlignLeft,
                  mdiFormatAlignCenter,
                  mdiFormatAlignRight,
                  mdiFormatAlignJustify,
                ].map((icon, i) => (
                  <ToggleButton key={i} disabled={i === 3} value={`${i + 1}`}>
                    <Icon path={icon} size={0.9} />
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Card>
            <div className="text-center mx-auto pt-6">
              {`{ active: ${JSON.stringify(mandatoryActive)} }`}
            </div>
          </Card>
        }
        code={[toggleButtons, dark, ["mandatory"]]}
      />
      <DocCard
        className="mt-12"
        url={url + "#L144-L159"}
        title={<H5>Multiple selection</H5>}
        subtitle={
          <Subtitle1>
            Multiple <code>ToggleButtonGroup</code> allows user to select
            multiple values and returns all value as an array.
          </Subtitle1>
        }
        content={
          <Card flat outlined={false}>
            <Card
              flat
              outlined={false}
              className="mt-4 d-flex flex-wrap align-center justify-center"
            >
              <ToggleButtonGroup multiple onChange={multipleGroupChange}>
                {[mdiFormatBold, mdiFormatItalic, mdiFormatUnderline].map(
                  (icon, i) => (
                    <ToggleButton
                      key={i}
                      value={`${i + 1}`}
                      color="var(--primary)"
                    >
                      <Icon path={icon} size={0.9} />
                    </ToggleButton>
                  )
                )}
              </ToggleButtonGroup>
            </Card>
            <div className="text-center mx-auto pt-6">
              {`{ active: ${JSON.stringify(multipleActive)} }`}
            </div>
          </Card>
        }
        code={[toggleButtons, dark, ["multiple"]]}
      />
      <DocCard
        className="mt-12"
        url={url + "#L186-L198"}
        title={<H5>Standalone ToggleButtons</H5>}
        subtitle={
          <Subtitle1>
            ToggleButtons can be used without the&nbsp;
            <code>ToggleButtonGroup</code> wrapper. You need to implement your
            own selection logic.
          </Subtitle1>
        }
        content={
          <Card key={key} flat outlined={false}>
            <Card
              flat
              outlined={false}
              className="mt-4 d-flex flex-wrap align-center justify-center"
            >
              {[mdiFormatBold, mdiFormatItalic, mdiFormatUnderline].map(
                (icon, i) => (
                  <ToggleButton
                    key={i}
                    value={i + 1}
                    color="var(--primary)"
                    selected={standaloneActive === i + 1}
                    onChange={(e) => handleStandaloneChange(e)}
                  >
                    <Icon path={icon} size={0.9} />
                  </ToggleButton>
                )
              )}
            </Card>
            <div className="text-center mx-auto pt-6">
              {`{ active: ${JSON.stringify(standaloneActive)} }`}
            </div>
          </Card>
        }
        code={[toggleStandalone, dark]}
      />
      <DocCard
        className="mt-12"
        url={url + "#L218-L246"}
        title={<H5>Sizes</H5>}
        subtitle={
          <Subtitle1>
            Use <code>size</code> property to change button size.
          </Subtitle1>
        }
        content={
          <Card key={key} flat outlined={false}>
            {["small", "medium", "large"].map((s: any, i) => (
              <Card
                flat
                key={i}
                outlined={false}
                className="mt-4 d-flex flex-wrap align-center justify-center"
              >
                <ToggleButtonGroup
                  key={i}
                  size={s}
                  multiple
                  value={active}
                  className="mt-4"
                  onChange={(e) => handleChange(e)}
                >
                  {[mdiFormatBold, mdiFormatItalic, mdiFormatUnderline].map(
                    (icon, i) => (
                      <ToggleButton
                        key={i}
                        value={`${i + 1}`}
                        color="var(--primary)"
                      >
                        <Icon path={icon} size={0.9} />
                      </ToggleButton>
                    )
                  )}
                </ToggleButtonGroup>
              </Card>
            ))}
            <div className="text-center mx-auto pt-6">
              {`{ active: ${JSON.stringify(active)} }`}
            </div>
          </Card>
        }
        code={[toggleSizes, dark]}
      />
      <Divider dense className="mt-6" />
      <H4 className="mt-12">
        <a href="#api">API</a>
      </H4>
      <ApiCard
        dark={dark}
        entity="ToggleButtonGroup"
        data={toggleButtonGroupApi(dark)}
      />
      <div className="mt-12"></div>
      <ApiCard dark={dark} entity="ToggleButton" data={toggleButtonApi(dark)} />
    </Card>
  );
};

export default ToggleButtonView;
