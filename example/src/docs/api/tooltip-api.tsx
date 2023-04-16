import {
  createApiDoc,
  cssDimensionsApi,
  defaultApiDoc,
  positionApi,
} from "../common";

export const tooltipApi = (dark: boolean) => {
  return [
    ...defaultApiDoc(dark),
    ...cssDimensionsApi(dark, "tooltip"),
    ...positionApi(dark, "tooltip"),
    createApiDoc(
      dark,
      "inset",
      "Boolean",
      "false",
      "Reverses the tooltip's elevation."
    ),
    createApiDoc(
      dark,
      "content",
      "Node, isRequired",
      "",
      "Content of the tooltip."
    ),
    createApiDoc(
      dark,
      "transition",
      "Grow | Fade",
      "Grow",
      "Transition style for the tooltip."
    ),
    createApiDoc(
      dark,
      "visible",
      "Boolean",
      "false",
      "Controls whether the tooltip is visible or hidden."
    ),
  ];
};
