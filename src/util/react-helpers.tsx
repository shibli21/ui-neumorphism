import { Children, cloneElement, ReactElement } from "react";

export const isMyReactComponent = (component: any): boolean => {
  let componentName = "";
  if (component && component.type && typeof component.type !== "string") {
    componentName = component.type.displayName;
  }
  if (!componentName) {
    return false;
  }

  return componentName.includes("Nu");
};

export const passDownProp = (
  children: any,
  props: any,
  propName: string | string[]
): ReactElement[] => {
  return Children.map(children, (child: ReactElement) => {
    if (isMyReactComponent(child)) {
      const newProps = {
        ...child.props,
      };
      if (typeof propName === "string") {
        newProps[propName] =
          child.props[propName] === undefined
            ? props[propName]
            : child.props[propName];
      } else if (Array.isArray(propName)) {
        propName.forEach((prop) => {
          newProps[prop] =
            child.props[prop] === undefined ? props[prop] : child.props[prop];
        });
      }
      return cloneElement(child, newProps);
    } else {
      return child;
    }
  });
};
