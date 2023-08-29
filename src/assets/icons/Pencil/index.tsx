import * as React from 'react';
import {FC} from 'react';
import {ColorValue} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  color: ColorValue;
}

const Pencil: FC<Props> = ({width, height, color}) => (
  <Svg width={width} height={height} viewBox="-6.5 0 32 32">
    <Path
      fill={color}
      d="M19.28 10.32c0-.24-.08-.44-.24-.6L15.92 6.6c-.32-.32-.84-.32-1.2 0l-2.36 2.36L1.04 20.32c-.12.12-.2.28-.24.44L0 24.68c-.04.28.04.56.24.76.16.16.36.24.6.24H1l3.92-.8c.16-.04.32-.12.44-.24l13.68-13.68c.16-.2.24-.4.24-.64zM4.32 23.24l-2.44.48.52-2.4 10.56-10.56 1.92 1.92L4.32 23.24zm11.76-11.72L14.16 9.6l1.2-1.2 1.92 1.92-1.2 1.2z"
    />
  </Svg>
);

export default Pencil;
