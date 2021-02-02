import React from 'react';
import { Text, View, StyleSheet, TextInput, ImageBackground, Button, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { Formik } from 'formik';
import jwt_decode from 'jwt-decode';

import LogoConectando from '../../../assets/LogoSemFundo.svg';
import LogoSenai from '../../../assets/logoVermelho.svg';

import api from '../../service/api';
import { Token } from '../ListarAluno';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

export default function Login() {
  const { navigate } = useNavigation();

  const storeData = async (value:any) => {
    try {
        await AsyncStorage.setItem('conectando-key-auth', value)
    } catch (e) {
        console.log(e);
    }
  }
  
  return (
    <KeyboardAvoidingView 
      style={{flex: 1}} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
    <Formik
      initialValues={{
        entrada: '',
        senha: ''
      }}
      onSubmit={(data) => {
        api.post('/login', data)
          .then(res => {
            if (res.data.token != undefined) {
              storeData(res.data.token);
              const authDec:Token = jwt_decode(`Bearer ${res.data.token}`);
              const role = authDec["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
              if (role === "Aluno") {
                navigate('ListarAluno')
              }else if(role === "Empresa"){
                navigate('ListarEmpresa')
              }
            } else {
              alert("Senha ou email incorretos!")
            }
          }).then()
          .catch(error => console.log(error));
      }}
    >
      {({ handleSubmit, values, handleBlur, handleChange }) => (
        <ImageBackground source={require('../../../assets/linhas.png')} style={styles.conteiner}>
          <View style={styles.top}>
            {/* <LogoConectando width={120} height={120} />
            <LogoSenai width={120} height={120} /> */}

            <Image source={require('../../../assets/Logo_SENAI_PRINCIPAL_VERMELHO.png')} style={styles.images}/>
            <Image source={require('../../../assets/logo.png')} style={styles.images}/>

          </View>

          <View style={styles.login}>
            <Text style={styles.h1}>Login</Text>
            <View>
              <Text>E-mail / CPF / CNPJ </Text>
              <TextInput style={styles.input}
                onChangeText={handleChange('entrada')}
                onBlur={handleBlur('entrada')}
                value={values.entrada} />
            </View>
            <View>
              <Text>Senha</Text>
              <TextInput secureTextEntry={true} style={styles.input}
                onChangeText={handleChange('senha')}
                onBlur={handleBlur('senha')}
                value={values.senha} />
            </View>
            <Button title='Entrar' onPress={handleSubmit as any} color='#FF0000' />
          </View>
        </ImageBackground>
      )}
    </Formik>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
  conteiner: {
    width:'100%',
    height:'100%',
    backgroundColor: '#FFF',
  },
  top: {
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  login: {
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    height: 40,
    width: 350,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 15,
  },
  button: {
    width: 100,
    height: 40,
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  label: {
    color: 'white'
  },
  h1: {
    fontSize: 20,
    paddingBottom: 30,
    fontFamily: 'Montserrat_700Bold',
  },
  images:{
    resizeMode:'contain',
    width:150,
    height:150
  },

});
