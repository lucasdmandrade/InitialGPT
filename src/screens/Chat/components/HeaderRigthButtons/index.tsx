import React from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';
import {StackNavigationProp} from '@react-navigation/stack';
import Information from '../../../../assets/icons/Information';
import MoreOptions from '../../../../assets/icons/MoreOptions';
import Pencil from '../../../../assets/icons/Pencil';
import Plus from '../../../../assets/icons/Plus';
import Trash from '../../../../assets/icons/Trash';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../../services/navigation';
import changeTitleEmitter, {
  EVENTS,
} from '../../../../services/events/ChangeTitleModalEmitter';
import deleteChatEmittter, {
  EVENTS as DELET_EVENT,
} from '../../../../services/events/DeletChatEmitter';

const HeaderRigthButtons = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        style={{marginRight: 25}}
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'Chat'}],
          });
        }}>
        <Plus height={20} width={20} color="white" />
      </TouchableOpacity>

      <Menu>
        <MenuTrigger style={{marginRight: 15}}>
          <MoreOptions height={20} width={20} color="white" />
        </MenuTrigger>
        <MenuOptions
          optionsContainerStyle={{
            backgroundColor: '#2d2f39',
          }}>
          <MenuOption
            onSelect={() => navigation.navigate('ChatDetails')}
            style={{flexDirection: 'row'}}>
            <Information height={20} width={20} color="white" />
            <Text style={{color: 'white', marginLeft: 5}}>Chat Details</Text>
          </MenuOption>

          <MenuOption
            onSelect={() => changeTitleEmitter.emit(EVENTS.openModal)}
            style={{flexDirection: 'row'}}>
            <Pencil height={20} width={20} color="white" />
            <Text style={{color: 'white', marginLeft: 5}}>Rename</Text>
          </MenuOption>

          <MenuOption
            onSelect={() => deleteChatEmittter.emit(DELET_EVENT.deletChat)}
            style={{flexDirection: 'row'}}>
            <Trash height={20} width={20} color="white" />
            <Text style={{color: 'white', marginLeft: 5}}>Delete</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default HeaderRigthButtons;
