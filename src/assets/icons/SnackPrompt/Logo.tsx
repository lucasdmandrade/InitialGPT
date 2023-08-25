import * as React from 'react';
import {FC} from 'react';
import {ColorValue} from 'react-native';
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  color?: ColorValue;
  arrowColor?: ColorValue;
}

const Logo: FC<Props> = ({
  width,
  height,
  color = '#FF88EC',
  arrowColor = '#fff',
}) => (
  <Svg width={width} height={height} viewBox="0 0 40 40">
    <G clipPath="url(#clip0_10990_5911)">
      <Path
        d="M37.473 16.727a5.29 5.29 0 01-5.253-3.244 5.094 5.094 0 01-1.517.342 4.996 4.996 0 01-5.337-4.628 4.977 4.977 0 01.367-2.226c-2.076-.6-3.652-2.426-3.811-4.694a5.314 5.314 0 01.317-2.16 20.146 20.146 0 00-2.252-.134C8.957 0 0 8.956 0 20.004c0 11.049 8.956 20.004 20.004 20.004 11.049 0 20.004-8.955 20.004-20.004 0-1.334-.133-2.635-.383-3.894a5.288 5.288 0 01-2.143.625l-.009-.008z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30.78 20.1L19.625 8.942 8.47 20.1l1.06 1.06 9.345-9.347v17.57h1.5v-17.57l9.345 9.347 1.06-1.06zm-10.966-8.847l-.189-.19-.19.19h.38z"
        fill={arrowColor}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_10990_5911">
        <Path fill={arrowColor} d="M0 0H40V40H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default Logo;
