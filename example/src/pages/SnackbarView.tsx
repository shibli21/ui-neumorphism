import React from "react";

import { Card, H4, H6 } from "ui-neumorphism";

// import { toggle, toggleLabel, switchApi } from '../docs/'

import DocCard from "../containers/DocCard.js";
// import ApiCard from '../containers/ApiCard.tsx'

const url =
  "https://github.com/AKAspanion/ui-neumorphism/blob/master/example/src/pages/SnackbarView.jsx";

const SnackbarView = ({ dark }: { dark: boolean }) => {
  return (
    <Card flat dark={dark}>
      <H4>
        <a href="#component">Menu</a>
      </H4>
      <H6>
        The Menu component shows a menu at the position of the element used to
        activate it.
      </H6>
      <DocCard
        url={url}
        content={
          <Card flat className="d-flex align-center justify-center flex-wrap">
            Coming soon..
          </Card>
        }
      />
      <H4 className="mt-12">
        <a href="#api">API</a>
      </H4>
      Coming soon..
    </Card>
  );
};

export default SnackbarView;
