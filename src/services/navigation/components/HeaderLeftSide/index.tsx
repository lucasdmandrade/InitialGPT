import React, {FC, ReactNode} from 'react';
import {Text, View} from 'react-native';

interface OwnProps {
  title: string;
  Icon: ReactNode;
}

const HeaderLeftSide: FC<OwnProps> = ({title, Icon}) => (
  <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 15}}>
    {Icon}
    <Text
      style={{color: 'white', fontSize: 20, fontWeight: '500', marginLeft: 10}}>
      {title}
    </Text>
  </View>
);

export default HeaderLeftSide;
