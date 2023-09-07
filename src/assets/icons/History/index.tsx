import * as React from 'react';
import {FC} from 'react';
import {ColorValue} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  color: ColorValue;
}

const History: FC<Props> = ({width, height, color}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.011 11.575l1.282-1.282a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414l1.301 1.3C3.221 6.26 7.613 2 13 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.983 9.983 0 01-7.777-3.714 1 1 0 011.554-1.258 8 8 0 10-1.766-5.454zM13 5a1 1 0 011 1v5.586l2.707 2.707a1 1 0 01-1.414 1.414l-3-3A1 1 0 0112 12V6a1 1 0 011-1z"
      fill={color}
    />
  </Svg>
);

export default History;
