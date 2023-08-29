import React, {useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import HamburgerButton from '../../assets/HamburgerButton';
import Chat from '../../screens/Chat';
import HeaderRigthButtons from '../../screens/Chat/components/HeaderRigthButtons';

export type RootStackParamList = {
  Chat: undefined;
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

  //() => <Plus height={20} width={20} color="white" />

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
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
        drawerContent={drawerContent}>
        <Drawer.Screen name="Chat" component={Chat} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Stack;
