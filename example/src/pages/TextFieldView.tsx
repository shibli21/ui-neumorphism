import React from "react";

import { H4, H6, Card, Subtitle1, TextField, H5 } from "ui-neumorphism";

import DocCard from "../containers/DocCard";
import ApiCard from "../containers/ApiCard";
import { textFieldApi } from "../docs/api/input-api";

const url =
  "https://github.com/AKAspanion/ui-neumorphism/blob/master/example/src/pages/TextFieldView.jsx";

const TextFieldView = ({ dark }: { dark: boolean }) => {
  const onChange = (e: any) => {
    console.log(e.target.value);
  };

  return (
    <Card flat dark={dark}>
      <H4>
        <a href="#component">Text</a>
      </H4>
      <H6>Text fields let users enter and edit text.</H6>
      <Subtitle1 className="mt-3">
        Text fields allow users to enter text into a UI. They typically appear
        in forms and dialogs.
      </Subtitle1>
      <DocCard
        url={url}
        className="mt-12"
        title={<H5>TextField</H5>}
        subtitle={
          <Subtitle1>
            Text fields components are used for collecting user provided
            information.
          </Subtitle1>
        }
        content={
          <Card flat className="d-flex align-center justify-center flex-wrap">
            <TextField label="Text" className="my-3"></TextField>
            <TextField
              prepend="$"
              append="%"
              label="Append & Prepend"
              className="my-3"
            ></TextField>
            <TextField
              label="Password"
              className="my-3"
              type="password"
            ></TextField>
            <TextField
              label="Number"
              className="my-3"
              type="number"
            ></TextField>
            <TextField label="Bordered" className="my-3" bordered></TextField>
            <TextField
              loading
              label={<div>Loading</div>}
              className="my-3"
              rules={[
                (v: string) => v !== "" || "Cant be empty",
                (v: string) => v.trim() !== "" || "Cant be only white space",
              ]}
            ></TextField>
            <TextField disabled className="my-3" label="Disabled"></TextField>
            <TextField label="Rounded" rounded className="my-3"></TextField>
            <TextField label="Readonly" className="my-3" readonly></TextField>
            <TextField label="Dense" className="my-3" dense></TextField>
            <TextField
              label="Dense & Rounded"
              className="my-3"
              dense
              rounded
              onChange={onChange}
            ></TextField>
            <TextField
              label="Outlined"
              className="my-3"
              outlined
              onChange={onChange}
            ></TextField>
            <TextField
              label="Outlined & Rounded"
              className="my-3"
              outlined
              rounded
              onChange={onChange}
            ></TextField>
            <TextField
              label="Disabled & Outlined"
              className="my-3"
              outlined
              disabled
              onChange={onChange}
            ></TextField>
          </Card>
        }
      />
      <H4 className="mt-12">
        <a href="#api">API</a>
      </H4>
      <ApiCard dark={dark} entity="TextField" data={textFieldApi(dark)} />
    </Card>
  );
};

export default TextFieldView;
