import * as React from 'react';
import {FC} from 'react';
import {ColorValue} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  color: ColorValue;
}

const Plus: FC<Props> = ({width, height, color}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 64 64"
    fillRule="evenodd"
    clipRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={2}>
    <Path d="M-896 -64H384V736H-896z" fill="none" />
    <Path
      d="M30.034 29.948V7.965h3.741v21.983h22.203v3.741H33.775v22.203h-3.741V33.689H8.026v-3.741h22.008z"
      fill={color}
    />
  </Svg>
);

export default Plus;
