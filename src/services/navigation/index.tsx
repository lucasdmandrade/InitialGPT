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
import SingIn from '../../screens/SingIn';
import DrawerComponent from './components/Drawer';

export type RootStackParamList = {
  SingIn: undefined;
  Chat: undefined;
  ChatDetails: undefined;
  WebView: undefined;
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

  const linking = {
    prefixes: ['meuapp://', 'https://meuapp.com'],
    config: {
      screens: {
        Home: 'Chat',
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Drawer.Navigator drawerContent={DrawerComponent}>
        <Drawer.Screen
          name="SingIn"
          component={SingIn}
          options={{
            header: () => undefined,
          }}
        />

        <Drawer.Screen
          name="Chat"
          component={Chat}
          options={{
            title: '',
            headerRight: HeaderRigthButtons,
            headerRightContainerStyle: {marginRight: 15},
            headerTitleContainerStyle: {marginLeft: 0},
            headerStyle: {backgroundColor: '#191a20'},
            headerShadowVisible: false,
            headerTransparent: false,
            headerTintColor: '#fff',
            drawerActiveTintColor: 'red',
            drawerInactiveTintColor: 'blue',
            drawerLabelStyle: {
              color: 'white',
            },
            drawerLabel: 'Chat',
            drawerStyle: {
              backgroundColor: '#191a20',
            },
          }}
        />

        <Drawer.Screen name="ChatDetails" component={ChatDetails} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Stack;
