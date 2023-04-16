import { createApiDoc, cssDimensionsApi, defaultApiDoc } from "../common";

export const dialogApi = (dark: boolean) => {
  return [
    ...defaultApiDoc(dark),
    ...cssDimensionsApi(dark, "dialog"),
    createApiDoc(
      dark,
      "visible",
      "Boolean",
      "false",
      "Controls whether the dialog is visible or hidden."
    ),
    createApiDoc(
      dark,
      "persistent",
      "Boolean",
      "false",
      "Clicking outside of the children will not call the onClose callback."
    ),
  ];
};
