import * as React from 'react';
import {FC} from 'react';
import {ColorValue} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  color: ColorValue;
}

const Maximize: FC<Props> = ({width, height, color}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24">
    <Path
      d="M21 9V3h-6M3 15v6h6M21 3l-7.5 7.5M10.5 13.5L3 21"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Maximize;
