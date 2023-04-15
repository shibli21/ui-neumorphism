import React, { Component, ComponentType } from "react";

export interface WithImageState {
  loaded: boolean;
  width: number;
  height: number;
}

export type WithImageProps<P> = {
  src?: string;
  loaded?: boolean;
  imageWidth?: number;
  imageHeight?: number;
  children?: React.ReactNode;
} & P;

const withImage = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  config: object = {}
) => {
  return class WithImage extends React.Component<
    WithImageProps<P>,
    WithImageState
  > {
    image?: HTMLImageElement;

    static displayName = `WithImage(${
      WrappedComponent.displayName || WrappedComponent.name || "Component"
    })`;

    constructor(props: P) {
      super(props);
      this.state = {
        loaded: false,
        height: 0,
        width: 0,
      };
    }

    setLoaded() {
      const { src } = this.props as WithImageProps<P>;
      if (!src) {
        return null;
      }
      this.image = new Image();
      this.image.src = src;
      this.image.onload = () => {
        const { width, height } = this.image!;
        this.setState((state) => ({ ...state, width, height, loaded: true }));
      };
      this.image.onerror = () => {
        this.setState((state) => ({
          ...state,
          width: 0,
          height: 0,
          loaded: false,
        }));
      };
    }

    componentDidMount() {
      this.setLoaded();
    }

    componentDidUpdate({ src }: WithImageProps<P>) {
      const { src: propSrc } = this.props as WithImageProps<P>;
      if (propSrc !== src) {
        this.setLoaded();
      }
    }

    componentWillUnmount() {
      if (this.image) {
        this.image.onerror = null;
        this.image.onload = null;
      }
    }

    render() {
      const { loaded, width, height } = this.state;
      return (
        <WrappedComponent
          {...this.props}
          loaded={loaded}
          imageWidth={width}
          imageHeight={height}
        />
      );
    }
  };
};

export default withImage;
