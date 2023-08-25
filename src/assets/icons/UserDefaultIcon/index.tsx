import * as React from 'react';
import {FC} from 'react';
import {ColorValue} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  color?: ColorValue;
}

const UserDefaultIcon: FC<Props> = ({width, height, color = '#494c4e'}) => (
  <Svg width={width} height={height} viewBox="0 0 18 18">
    <Path
      fill={color}
      d="M9 0a9 9 0 00-9 9 8.654 8.654 0 00.05.92 9 9 0 0017.9 0A8.654 8.654 0 0018 9a9 9 0 00-9-9zm5.42 13.42c-.01 0-.06.08-.07.08a6.975 6.975 0 01-10.7 0c-.01 0-.06-.08-.07-.08a.512.512 0 01-.09-.27.522.522 0 01.34-.48c.74-.25 1.45-.49 1.65-.54a.16.16 0 01.03-.13.49.49 0 01.43-.36l1.27-.1a2.077 2.077 0 00-.19-.79v-.01a2.814 2.814 0 00-.45-.78 3.83 3.83 0 01-.79-2.38A3.38 3.38 0 018.88 4h.24a3.38 3.38 0 013.1 3.58 3.83 3.83 0 01-.79 2.38 2.814 2.814 0 00-.45.78v.01a2.077 2.077 0 00-.19.79l1.27.1a.49.49 0 01.43.36.16.16 0 01.03.13c.2.05.91.29 1.65.54a.49.49 0 01.25.75z"
    />
  </Svg>
);

export default UserDefaultIcon;
