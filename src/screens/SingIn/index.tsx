import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';
import WelcomeAnimation from '../Chat/components/WelcomeAnimation';
import Google from '../../assets/icons/Google';
import Apple from '../../assets/icons/Apple';
import Mail from '../../assets/icons/Mail';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../services/navigation';
import {setUserToken} from '../../services/storages/auth';
import initAppEmittter, {EVENTS} from '../../services/events/InitApp';

const SingnIn = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  GoogleSignin.configure({
    webClientId: process.env.WEB_CLIENT_ID,
    offlineAccess: false,
  });

  const handleGoogleLogin = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn();

      const googleCredential = await auth.GoogleAuthProvider.credential(
        idToken,
      );

      await auth().signInWithCredential(googleCredential);

      const token = await auth().currentUser?.getIdToken();

      if (token) {
        await setUserToken(token);

        initAppEmittter.emit(EVENTS.initApp);

        navigation.navigate('Chat');
      }
    } catch (error) {
      console.error('Erro ao fazer login com o Google', error);
    }
  };

  const signInWithApple = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    // This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
    }
  };

  const openLink = async () => {
    try {
      await InAppBrowser.openAuth(
        'https://platform.openai.com/login?launch?redirect_uri=${https://google.com}',
        'meuapp://Chat',
        {
          browserPackage: 'com.android.chrome',
        },
      ).then(response => console.log('teste', response));
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'flex-end', backgroundColor: 'red'}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <WelcomeAnimation text={['Snack Prompt ', 'Join us', 'teste']} />
      </View>

      <View
        style={{
          backgroundColor: '#dedede',
          borderTopEndRadius: 25,
          borderTopLeftRadius: 25,
          padding: 15,
          marginTop: -25,
        }}>
        <TouchableOpacity
          onPress={handleGoogleLogin}
          style={{
            flexDirection: 'row',
            backgroundColor: 'black',
            padding: 15,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Google height={20} width={20} color="white" />
          <Text style={{color: 'white', fontSize: 16, marginLeft: 10}}>
            Continue with Google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={signInWithApple}
          style={{
            flexDirection: 'row',
            backgroundColor: '#c4c6ca',
            padding: 15,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Apple height={20} width={20} color="black" />
          <Text style={{color: 'black', fontSize: 16, marginLeft: 10}}>
            Continue with Apple
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            backgroundColor: '#c4c6ca',
            padding: 15,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Mail height={20} width={20} color="black" />
          <Text style={{color: 'black', fontSize: 16, marginLeft: 10}}>
            Sign up with email
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={openLink}
          style={{
            backgroundColor: 'transparent',
            padding: 15,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
            borderWidth: 1,
            borderColor: 'black',
          }}>
          <Text style={{color: 'black', fontSize: 16}}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SingnIn;
