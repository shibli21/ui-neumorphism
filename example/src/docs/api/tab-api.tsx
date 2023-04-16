import React from "react";
import { createApiDoc, defaultApiDoc, eventDoc } from "../common";

const style = (dark: boolean, type: string) =>
  createApiDoc(
    dark,
    type,
    "Boolean",
    "false",
    `Changes the Tab highlight/indicator style to ${type}.`
  );

export const tabsApi = (dark: boolean) => {
  return [
    ...defaultApiDoc(dark),
    eventDoc(dark, "Click"),
    eventDoc(dark, "Change"),
    style(dark, "rounded"),
    style(dark, "outlined"),
    style(dark, "underlined"),
    createApiDoc(
      dark,
      "color",
      "String",
      <div>
        <span style={{ color: "var(--primary-dark)" }}>--primary</span>
      </div>,
      "Applies specified color to the highlight/indicator."
    ),
    createApiDoc(
      dark,
      "disabled",
      "Boolean",
      "false",
      `Disables the ability to click or target the Tab.`
    ),
    createApiDoc(
      dark,
      "value",
      "Number",
      "0",
      "Current index value of the Tab to set active."
    ),
  ];
};
export const tabApi = (dark: boolean) => {
  return [
    ...defaultApiDoc(dark),
    eventDoc(dark, "Click"),
    eventDoc(dark, "MouseOut"),
    eventDoc(dark, "MouseOver"),
  ];
};

export const tabItemApi = (dark: boolean) => {
  return defaultApiDoc(dark);
};

export const tabItemsApi = (dark: boolean) => {
  return [
    ...defaultApiDoc(dark),
    eventDoc(dark, "Change"),
    createApiDoc(
      dark,
      "value",
      "Number",
      "0",
      "Current index value of the TabItem to display."
    ),
    createApiDoc(
      dark,
      "reverse",
      "Boolean",
      "false",
      "reverses the transition animation of TabItem childeren component."
    ),
    createApiDoc(
      dark,
      "height",
      "Number",
      "[computed height of content]",
      "Height of the TabItems component."
    ),
  ];
};
