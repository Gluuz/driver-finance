import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './homeScreen';
import CalculadoraKM from './AppDriverCalculator';
import NetEarningsCalculator from './netEarnings';

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CalculadoraKM" component={CalculadoraKM} />
          <Stack.Screen
            name="NetEarningsCalculator"
            component={NetEarningsCalculator}
            options={{ title: 'Calculadora de Ganhos Líquidos' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
