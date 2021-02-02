import { AppLoading } from 'expo';
import { Montserrat_400Regular, Montserrat_700Bold, useFonts } from '@expo-google-fonts/montserrat';
import { NotoSans_400Regular, NotoSans_700Bold } from '@expo-google-fonts/noto-sans';
import Routes from './src/routes';

<<<<<<< HEAD


import React from 'react';
import {StatusBar} from 'expo-status-bar'

=======
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import React from 'react';
import {StatusBar} from 'expo-status-bar'
>>>>>>> fcd888da5bccbf5ac88bae5bdff43f38b75a1c21

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
    NotoSans_400Regular,
    NotoSans_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <>
        <Routes />
        <StatusBar style="dark"/>
      </>
    );
  }
}
