import React, {useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import HamburgerButton from '../../assets/HamburgerButton';
import Chat from '../../screens/Chat';
import HeaderRigthButtons from '../../screens/Chat/components/HeaderRigthButtons';
import ChatDetails from '../../screens/ChatDetails';

export type RootStackParamList = {
  Chat: undefined;
  ChatDetails: undefined;
};

const Drawer = createDrawerNavigator<RootStackParamList>();

const Stack = () => {
  const drawerContent = useCallback(
    (props: DrawerContentComponentProps) => (
      <HamburgerButton onPress={props.navigation.toggleDrawer} />
    ),
    [],
  );

  const drawerIcon = useCallback(
    () => <HamburgerButton onPress={() => {}} />,
    [],
  );

  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={drawerContent}>
        <Drawer.Screen
          name="Chat"
          component={Chat}
          options={{
            headerRight: HeaderRigthButtons,
            headerRightContainerStyle: {marginRight: 15},
            headerTitleContainerStyle: {marginLeft: 0},
            title: '',
            headerStyle: {backgroundColor: '#191a20'},
            headerShadowVisible: false,
            headerTransparent: false,
            headerTintColor: '#fff',
            drawerStyle: {
              backgroundColor: '#191a20',
            },
            drawerIcon: drawerIcon,
          }}
        />

        <Drawer.Screen name="ChatDetails" component={ChatDetails} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Stack;
