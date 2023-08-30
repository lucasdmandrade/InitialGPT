import * as React from 'react';
import {FC} from 'react';
import {ColorValue} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  color: ColorValue;
}

const Close: FC<Props> = ({width, height, color}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24">
    <Path
      d="M20.746 3.329a1 1 0 00-1.415 0l-7.294 7.294-7.294-7.294a1 1 0 10-1.414 1.414l7.294 7.294-7.294 7.294a1 1 0 001.414 1.415l7.294-7.295 7.294 7.295a1 1 0 001.415-1.415l-7.295-7.294 7.295-7.294a1 1 0 000-1.414z"
      fill={color}
    />
  </Svg>
);

export default Close;
