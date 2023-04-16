import React from "react";
import { Card, H4, H6 } from "ui-neumorphism";
import DocCard from "../containers/DocCard.js";

const url =
  "https://github.com/AKAspanion/ui-neumorphism/blob/master/example/src/pages/ExpansionPanelView.jsx";
const ExpansionPanelView = ({ dark }: { dark: boolean }) => {
  return (
    <Card flat dark={dark}>
      <span id="component"></span>
      <H4>
        <a href="#component">ExpansionPanel</a>
      </H4>
      <H6>
        The ExpansionPanel component is used to segment content and show/hide
        when clicked, reducing vertical space with large amounts of information.
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

export default ExpansionPanelView;
