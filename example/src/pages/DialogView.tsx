import React, { useState } from "react";

import { Card, H4, H6, Dialog, Button } from "ui-neumorphism";

import DocCard from "../containers/DocCard";
import ApiCard from "../containers/ApiCard";
import { dialogApi } from "../docs/api/dialog-api";

const url =
  "https://github.com/AKAspanion/ui-neumorphism/blob/master/example/src/pages/DialogView.jsx";
const DialogView = ({ dark }: { dark: boolean }) => {
  const [visible, setVisible] = useState(false);

  return (
    <Card flat dark={dark}>
      <span id="component"></span>
      <H4>
        <a href="#component">Dialog</a>
      </H4>
      <H6>
        The Dialog component inform users about a specific task and may contain
        critical information, require decisions, or involve multiple tasks.
      </H6>
      <DocCard
        url={url}
        content={
          <Card flat className="d-flex align-center justify-center flex-wrap">
            <Button onClick={() => setVisible(true)}>open</Button>
            <Dialog
              minWidth={300}
              visible={visible}
              onClose={() => setVisible(false)}
            >
              <Card className="pa-4 ma-4">
                dialog <br /> <br />
                <Button onClick={() => setVisible(false)}>close</Button>
              </Card>
            </Dialog>
          </Card>
        }
      />
      <H4 className="mt-12">
        <a href="#api">API</a>
      </H4>
      <ApiCard dark={dark} entity="Dialog" data={dialogApi(dark)} />
    </Card>
  );
};

export default DialogView;
