import React, {useCallback, useEffect, useState} from 'react';
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
import {getUserToken} from '../storages/auth';
import Loading from '../../screens/Loading';
import SelectText from '../../screens/SelectText';
import initAppEmittter, {EVENTS} from '../events/InitApp';

interface SelectTextProps {
  text: string;
}

export type RootStackParamList = {
  SingIn: undefined;
  Chat: undefined;
  ChatDetails: undefined;
  SelectText: SelectTextProps;
  WebView: undefined;
};

const Drawer = createDrawerNavigator<RootStackParamList>();

const Stack = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  const initApp = useCallback(async () => {
    setIsLoading(true);

    await getUserToken()
      .then(token => {
        if (token) {
          setIsLogged(true);
        }
        setIsLogged(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    initApp();
  }, [initApp]);

  useEffect(() => {
    initAppEmittter.on(EVENTS.initApp, initApp);

    return () => {
      initAppEmittter.off(EVENTS.initApp);
    };
  }, [initApp]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer linking={linking}>
      <Drawer.Navigator drawerContent={DrawerComponent}>
        {!isLogged && (
          <Drawer.Screen
            name="SingIn"
            component={SingIn}
            options={{
              header: () => undefined,
            }}
          />
        )}

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

        <Drawer.Screen name="SelectText" component={SelectText} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Stack;
