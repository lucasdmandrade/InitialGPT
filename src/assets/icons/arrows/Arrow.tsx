import * as React from 'react';
import {FC} from 'react';
import {ColorValue} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  color: ColorValue;
  direction?: Directions;
}

enum directions {
  up = '0',
  right = '90',
  down = '180',
  left = '270',
}

type Directions = 'up' | 'right' | 'down' | 'left';

const Arrow: FC<Props> = ({width, height, color, direction = 'up'}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    style={{transform: [{rotate: `${directions[direction]}deg`}]}}>
    <Path
      d="M12 5v14m0-14l-6 6m6-6l6 6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Arrow;
