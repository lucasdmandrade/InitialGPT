import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Alert,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';
import WelcomeAnimation from '../Chat/components/WelcomeAnimation';
import Google from '../../assets/icons/Google';
import Apple from '../../assets/icons/Apple';
import Mail from '../../assets/icons/Mail';
import {
  appleAuth,
  appleAuthAndroid,
  AppleRequestOperation,
} from '@invertase/react-native-apple-authentication';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../services/navigation';

const SingnIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  GoogleSignin.configure({
    webClientId: process.env.WEB_CLIENT_ID,
    offlineAccess: false,
  });

  const handleLogin = async () => {
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      // Se o login for bem-sucedido, você pode redirecionar o usuário para outra tela aqui.
      console.log('Usuário logado com sucesso', response);
    } catch (error) {
      console.error('Erro ao fazer login', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Inicie o processo de login com o Google
      const {idToken} = await GoogleSignin.signIn();

      console.log(idToken);

      // Crie uma credencial do Google a partir do token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Faça o login com a credencial do Google no Firebase
      await auth().signInWithCredential(googleCredential);

      // Se o login for bem-sucedido, você pode redirecionar o usuário para outra tela aqui.
      console.log('Usuário logado com sucesso com o Google', idToken);

      navigation.navigate('Chat');
    } catch (error) {
      console.error('Erro ao fazer login com o Google', error);
    }
  };

  const signInWithApple = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest();

      // Crie um token de ID de usuário
      const {identityToken} = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(identityToken);

      // Faça login no Firebase com as credenciais da Apple
      await auth().signInWithCredential(appleCredential);
    } catch (error) {
      console.log(error);
      if (error.code === 'ERR_CANCELED') {
        // O usuário cancelou a operação de login da Apple
      } else {
        Alert.alert('Erro', 'Não foi possível fazer login com a Apple.');
      }
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
          onPress={() => appleAuthAndroid.signIn()}
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
