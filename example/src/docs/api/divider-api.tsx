import { createApiDoc, defaultApiDoc } from "../common";

export const dividerApi = (dark: boolean) => {
  return [
    ...defaultApiDoc(dark),
    createApiDoc(
      dark,
      "dense",
      "Boolean",
      "false",
      "Reduces height of the divider."
    ),
    createApiDoc(
      dark,
      "elevated",
      "Boolean",
      "false",
      "Gives an elevation for alternate style."
    ),
  ];
};
