import React from "react";

import Icon from "@mdi/react";
import {
  mdiRun,
  mdiStar,
  mdiBroom,
  mdiSpeaker,
  mdiOpacity,
  mdiTrashCanOutline,
} from "@mdi/js";

import { Card, H4, Divider, H6, Subtitle1, IconButton } from "ui-neumorphism";

import DocCard from "../containers/DocCard.js";
import ApiCard from "../containers/ApiCard.js";
import { iconButtons } from "../docs/code/button-code.js";
import { iconButtonApi } from "../docs/api/button-api.js";

const url =
  "https://github.com/AKAspanion/ui-neumorphism/blob/master/example/src/pages/IconButtonView.jsx";

const IconButtonView = ({ dark }: { dark: boolean }) => {
  return (
    <Card flat dark={dark}>
      <span id="component"></span>
      <H4>
        <a href="#component">Icon Button</a>
      </H4>
      <H6>Icon buttons are commonly found in app bars and toolbars.</H6>
      <Subtitle1 className="mt-3">
        Icons are appropriate for buttons that allow a single choice to be
        selected or deselected, such as adding or removing a star to an item.
      </Subtitle1>
      <DocCard
        url={url + "#L45-L72"}
        content={
          <Card
            flat
            outlined={false}
            className="mt-6 d-flex justify-center align-center flex-wrap"
          >
            <IconButton className="ma-12" size="small">
              <Icon path={mdiRun} size={0.8} />
            </IconButton>
            <IconButton
              rounded
              text={false}
              color="var(--error)"
              className="ma-12"
            >
              <Icon path={mdiOpacity} size={1} />
            </IconButton>
            <IconButton disabled className="ma-12">
              <Icon path={mdiTrashCanOutline} size={1} />
            </IconButton>
            <IconButton
              text={false}
              size="large"
              className="ma-12"
              color="var(--warning)"
            >
              <Icon path={mdiStar} size={1} />
            </IconButton>
            <IconButton color="var(--primary)" className="ma-12" rounded>
              <Icon path={mdiSpeaker} size={1} />
            </IconButton>
            <IconButton color="var(--success)" className="ma-12" outlined>
              <Icon path={mdiBroom} size={1} />
            </IconButton>
          </Card>
        }
        code={[iconButtons, dark]}
      />
      <Divider dense className="mt-6" />
      <H4 className="mt-12">
        <a href="#api">API</a>
      </H4>
      <ApiCard dark={dark} entity="IconButton" data={iconButtonApi(dark)} />
    </Card>
  );
};

export default IconButtonView;
