import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import Login from '../src/pages/Login/index';
import ListarAluno from '../src/pages/ListarAluno';
import ListarEmpresa from '../src/pages/ListarEmpresa/index';


export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator 
        screenOptions={{ 
          headerShown: false, 
          cardStyle: { backgroundColor: '#F2F3F5' }
        }}>

        <Screen
        name="Login"
        component={Login}
        />

        <Screen
        name="ListarAluno"
        component={ListarAluno}
        />
        
        <Screen
        name="ListarEmpresa"
        component={ListarEmpresa}
        />
      </Navigator>
    </NavigationContainer>
  );
}