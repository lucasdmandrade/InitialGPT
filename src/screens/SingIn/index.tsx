import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button, Text, TextInput, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {TouchableOpacity} from 'react-native-gesture-handler';
import WelcomeAnimation from '../Chat/components/WelcomeAnimation';
import Google from '../../assets/icons/Google';
import Apple from '../../assets/icons/Apple';
import Mail from '../../assets/icons/Mail';

const SingnIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      // Se o login for bem-sucedido, você pode redirecionar o usuário para outra tela aqui.
      console.log('Usuário logado com sucesso', response);
    } catch (error) {
      console.error('Erro ao fazer login', error);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'flex-end', backgroundColor: 'red'}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <WelcomeAnimation />
      </View>

      <View
        style={{
          backgroundColor: '#dedede',
          marginTop: 25,
          borderTopEndRadius: 25,
          borderTopLeftRadius: 25,
          padding: 15,
        }}>
        <TouchableOpacity
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
            Continue with email
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
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
