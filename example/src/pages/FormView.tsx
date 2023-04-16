import React from "react";

import { H4, H6, Subtitle1, Card } from "ui-neumorphism";
import DocCard from "../containers/DocCard.js";
const url =
  "https://github.com/AKAspanion/ui-neumorphism/blob/master/example/src/pages/ProgressLinearView.jsx";

const FormView = ({ dark }: { dark: boolean }) => {
  return (
    <Card flat dark={dark}>
      <span id="component"></span>
      <H4>Forms</H4>
      <H6>Forms are essential part of any application.</H6>
      <Subtitle1 className="mt-3">
        The <code>Form</code>component makes it easy to add validation to form
        inputs. <br />
        All input components have a rules prop which takes an array of
        functions. <br />
        These functions allow you to specify conditions in which the field is
        valid or invalid. <br />
        Whenever the value of an input is changed, each function in the array
        will receive the new value. <br />
        If a function returns false or a string, validation has failed.
      </Subtitle1>
      <DocCard url={url} className="mt-12" content={"coming soon.."} />
    </Card>
  );
};

export default FormView;
