import * as React from 'react';
import {FC} from 'react';
import {ColorValue} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  color: ColorValue;
}

const Document: FC<Props> = ({width, height, color}) => (
  <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
    <Path
      fill={color}
      fillRule="evenodd"
      d="M4 1a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V7.414A2 2 0 0017.414 6L13 1.586A2 2 0 0011.586 1H4zm0 2h7.586L16 7.414V17H4V3zm2 2a1 1 0 000 2h5a1 1 0 100-2H6zm-1 5a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h8a1 1 0 100-2H6z"
    />
  </Svg>
);

export default Document;
