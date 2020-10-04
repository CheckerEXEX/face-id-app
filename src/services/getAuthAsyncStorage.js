import { AsyncStorage } from 'react-native';

export async function getAuthAsyncStorage() {
  const token = await AsyncStorage.getItem('userToken');
  const user = await AsyncStorage.getItem('userData');
  return {
    token,
    user: JSON.parse(user),
  };
}

export async function setAuthAsyncStorage(data) {
  await AsyncStorage.setItem('userToken', data.token);
  await AsyncStorage.setItem('userData', JSON.stringify(data.user));
}

export async function resetAuthAsyncStorage() {
  await AsyncStorage.removeItem('userData');
  await AsyncStorage.removeItem('userToken');
}
