import React from "react";

interface RootCSSVariables {
  '--light-bg': string;
  '--light-bg-dark-shadow': string;
  '--light-bg-light-shadow': string;
  '--dark-bg': string;
  '--dark-bg-dark-shadow': string;
  '--dark-bg-light-shadow': string;
  '--white': string;
  '--black': string;
  '--primary': string;
  '--primary-dark': string;
  '--primary-light': string;
  '--g-text-color-light': string;
  '--g-text-color-disabled-light': string;
  '--g-text-color-secondary-light': string;
  '--g-text-color-dark': string;
  '--g-text-color-disabled-dark': string;
  '--g-text-color-secondary-dark': string;
  '--g-bg-color-disabled-light': string;
  '--g-bg-color-disabled-dark': string;
}

const defaultRootCSSVariables: RootCSSVariables = {
  '--light-bg': '#E4EBF5',
  '--light-bg-dark-shadow': '#bec8e4',
  '--light-bg-light-shadow': '#ffffff',
  '--dark-bg': '#444444',
  '--dark-bg-dark-shadow': '#363636',
  '--dark-bg-light-shadow': '#525252',
  '--white': '#ffffff',
  '--black': '#000000',
  '--primary': '#f71b94',
  '--primary-dark': '#aa0660',
  '--primary-light': '#fa7ac0',
  '--g-text-color-light': 'rgba(0, 0, 0, 0.87)',
  '--g-text-color-disabled-light': 'rgba(0, 0, 0, 0.38)',
  '--g-text-color-secondary-light': 'rgba(0, 0, 0, 0.60)',
  '--g-text-color-dark': 'rgba(255, 255, 255, 0.87)',
  '--g-text-color-disabled-dark': 'rgba(255, 255, 255, 0.38)',
  '--g-text-color-secondary-dark': 'rgba(255, 255, 255, 0.60)',
  '--g-bg-color-disabled-light': '#dee5e8',
  '--g-bg-color-disabled-dark': '#727272',
};

export const setCSSVariable = (
  element: HTMLElement | null | undefined,
  variable: string,
  value: string | undefined
) => {
  if (element && value) {
    element.style.setProperty(variable, String(value));
  }
};

export const getDefaultThemeVariables = (): RootCSSVariables => {
  return defaultRootCSSVariables;
};

export const overrideThemeVariables = (themeObject: Partial<RootCSSVariables>) => {
  const root = document.querySelector(':root') as HTMLElement;
  const themeVariables = Object.keys(themeObject)
  if (root && themeObject) {
    themeVariables.forEach((themeVar) => {
      const varValue = themeObject[themeVar as keyof RootCSSVariables]
      if (varValue && themeVar.startsWith('--')) {
        setCSSVariable(root, themeVar as keyof RootCSSVariables, varValue)
      }
    })
  }
}
  ;

export const detectElementInDOM = (
  path: Element[] = [],
  element: string = 'null'
) => {
  return path
    .map((elem) => elem.nodeName)
    .join('-')
    .toLowerCase()
    .includes(element.toLowerCase());
};

export const findClickInside = (event: React.MouseEvent | MouseEvent, node: HTMLElement): boolean => {
  let currentNode = event.target as Node | null;
  try {
    while (currentNode != null) {
      if (currentNode === node) {
        // click is inside
        return true;
      }
      currentNode = currentNode.parentNode;
    }
    // click is outside
    return false;
  } catch (err) {
    throw new Error(err as string);
  }
};
