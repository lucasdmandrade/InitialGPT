import * as React from "react";
import { FC } from "react";
import { ColorValue } from "react-native";
import Svg, { Path } from "react-native-svg";

interface Props {
  width: number;
  height: number;
  color: ColorValue;
}

const Microphone: FC<Props> = ({ width, height, color }) => (
  <Svg width={width} height={height} viewBox="-5 0 32 32">
    <Path
      d="M118 333a7 7 0 007-7v-10a7 7 0 10-14 0v10a7 7 0 007 7zm11-5h-2c-.911 4.007-4.718 7-9 7s-8.089-2.993-9-7h-2c.883 4.799 5.063 8.51 10 8.955V339h-1a1 1 0 000 2h4a1 1 0 100-2h-1v-2.045c4.937-.445 9.117-4.156 10-8.955z"
      transform="translate(-107 -309)"
      fill={color}
      stroke="none"
      strokeWidth={1}
      fillRule="evenodd"
    />
  </Svg>
);

export default Microphone;
