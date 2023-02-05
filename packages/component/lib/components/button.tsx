import React, { forwardRef, PropsWithChildren } from "react";
import { getElement } from "../element";

export type ButtonProps = {
  onClick?: (e: MouseEvent) => void;
  active?: boolean;
  disabled?: boolean;
  [index: string]: any;
};

class Button extends React.Component<ButtonProps> {
  render() {
    const ButtonElement = getElement("button");
    if (!ButtonElement) return null;
    return React.createElement<any>(ButtonElement, this.props);
  }
}

export { Button };
