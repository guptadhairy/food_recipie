import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import Welcome from './screens/Welcome';
import RecipiScreen from './screens/RecipiScreen';

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='welcome' >
            <Stack.Screen name='home' component={Home} options={{headerShown: false}}/>
            <Stack.Screen name='welcome' component={Welcome} options={{headerShown: false}} />
            <Stack.Screen name='recipi' component={RecipiScreen} options={{headerShown: false}} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Main