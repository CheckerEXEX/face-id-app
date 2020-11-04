import { AsyncStorage } from 'react-native';

export async function getAuthAsyncStorage() {
  const token = await AsyncStorage.getItem('employeeToken');
  const employee = await AsyncStorage.getItem('employeeData');
  return {
    token,
    employee: JSON.parse(employee),
  };
  console.log('%c%s', 'color: #1d5673', employee);
}

export async function setAuthAsyncStorage(data) {
  await AsyncStorage.setItem('employeeToken', data.token);
  await AsyncStorage.setItem('employeeData', JSON.stringify(data.employee));
}

export async function resetAuthAsyncStorage() {
  await AsyncStorage.removeItem('employeeToken');
  await AsyncStorage.removeItem('employeeData');
}
