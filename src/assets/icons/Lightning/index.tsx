import * as React from 'react';
import {FC} from 'react';
import {ColorValue} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  color: ColorValue;
}

const Lightning: FC<Props> = ({width, height, color}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24">
    <Path
      d="M18.496 10.709l-8.636 8.88c-.24.246-.638-.039-.482-.345l3.074-6.066a.3.3 0 00-.268-.436H5.718a.3.3 0 01-.214-.51l8.01-8.115c.232-.235.618.023.489.328L11.706 9.86a.3.3 0 00.28.417l6.291-.078a.3.3 0 01.22.509z"
      stroke={color}
      fill={color}
    />
  </Svg>
);

export default Lightning;