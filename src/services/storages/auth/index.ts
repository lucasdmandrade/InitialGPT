import AsyncStorage from '@react-native-async-storage/async-storage';

export const setUserToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('@AUTH_TOKEN', token);

    console.log('Usuário logado com sucesso com o Google', token);
  } catch (e) {
    // saving error
  }
};

export const getUserToken = async () => {
  try {
    const token = await AsyncStorage.getItem('@AUTH_TOKEN');

    return token;
  } catch (e) {
    // saving error
  }
};
