import * as React from 'react';
import {FC} from 'react';
import {ColorValue} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  color: ColorValue;
}

const MoreOptions: FC<Props> = ({width, height, color}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24">
    <Path
      d="M14 5a2 2 0 11-4 0 2 2 0 014 0zM14 12a2 2 0 11-4 0 2 2 0 014 0zM12 21a2 2 0 100-4 2 2 0 000 4z"
      fill={color}
    />
  </Svg>
);

export default MoreOptions;
