import React, { ComponentType } from "react";
import {
  NumberProp,
  Svg as RnSvg,
  SvgProps as RnSvgProps,
} from "react-native-svg";

export interface SvgProps extends RnSvgProps {
  size?: NumberProp;
}

export type SvgComponent = ComponentType<SvgProps>;

export default function Svg(props: SvgProps) {
  const { size = 16, ...rest } = props;

  return (
    <RnSvg
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0"
      height={size}
      width={size}
      color="white"
      {...rest}
    >
      {props.children}
    </RnSvg>
  );
}
