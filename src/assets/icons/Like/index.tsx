import * as React from 'react';
import {FC} from 'react';
import {ColorValue} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  color: ColorValue;
}

const Like: FC<Props> = ({width, height, color}) => (
  <Svg width={width} height={height} viewBox="0 0 48 48" fill="none">
    <Path
      d="M4.189 22.173A2 2 0 016.181 20H10a2 2 0 012 2v19a2 2 0 01-2 2H7.834a2 2 0 01-1.993-1.827l-1.652-19zM18 21.375c0-.836.52-1.584 1.275-1.94 1.649-.778 4.458-2.341 5.725-4.454 1.633-2.724 1.941-7.645 1.991-8.772.007-.158.003-.316.024-.472.271-1.953 4.04.328 5.485 2.74.785 1.308.885 3.027.803 4.37-.089 1.436-.51 2.823-.923 4.201l-.88 2.937h10.857a2 2 0 011.925 2.543l-5.37 19.016A2 2 0 0136.986 43H20a2 2 0 01-2-2V21.375z"
      stroke={color}
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Like;
