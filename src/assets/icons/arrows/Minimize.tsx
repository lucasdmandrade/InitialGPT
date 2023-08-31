import * as React from 'react';
import {FC} from 'react';
import {ColorValue} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  color: ColorValue;
}

const Minimize: FC<Props> = ({width, height, color}) => (
  <Svg width={width} height={height} viewBox="0 0 16 16">
    <Path
      d="M15.707 1.707l-3 3L15 7l-1 1H8V2l1-1 2.293 2.293 3-3 1.414 1.414zM4.707 12.707L7 15l1-1V8H2L1 9l2.293 2.293-3 3 1.414 1.414 3-3z"
      fill={color}
    />
  </Svg>
);

export default Minimize;
