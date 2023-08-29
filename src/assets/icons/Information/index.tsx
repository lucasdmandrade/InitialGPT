import * as React from 'react';
import {FC} from 'react';
import {ColorValue} from 'react-native';
import Svg, {Circle, G, Path} from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  color: ColorValue;
}

const Information: FC<Props> = ({width, height, color}) => (
  <Svg width={width} height={height} viewBox="0 0 48 48">
    <G data-name="Layer 2">
      <Path fill="none" data-name="invisible box" d="M0 0H48V48H0z" />
      <G data-name="icons Q2">
        <Path
          d="M24 2a22 22 0 1022 22A21.9 21.9 0 0024 2zm0 40a18 18 0 1118-18 18.1 18.1 0 01-18 18z"
          fill={color}
        />
        <Path
          d="M24 20a2 2 0 00-2 2v12a2 2 0 004 0V22a2 2 0 00-2-2z"
          fill={color}
        />
        <Circle cx={24} cy={14} r={2} fill={color} />
      </G>
    </G>
  </Svg>
);

export default Information;
