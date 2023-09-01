import * as React from 'react';
import {FC} from 'react';
import {ColorValue} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  color?: ColorValue;
  arrowColor?: ColorValue;
}

const Mail: FC<Props> = ({width, height, color = '#FFF'}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20 4a3 3 0 013 3v10a3 3 0 01-3 3H4a3 3 0 01-3-3V7a3 3 0 013-3h16zm-.747 2H4.747l6.633 5.237a1 1 0 001.24 0L19.253 6zM3 7.169V17a1 1 0 001 1h16a1 1 0 001-1V7.169l-7.141 5.638a3 3 0 01-3.718 0L3 7.168z"
      fill={color}
    />
  </Svg>
);

export default Mail;
