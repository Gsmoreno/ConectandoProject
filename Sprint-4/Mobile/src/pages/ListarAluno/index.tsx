import React, { ReactNode, useEffect, useState } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
import {  BorderlessButton  } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import jwt_decode from 'jwt-decode';
import moment from 'moment';

import logo from '../../../assets/logoBranco.png';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import api from '../../service/api';
import AsyncStorage from '@react-native-community/async-storage';
import { response } from 'express';

export interface Token {
    aud: string,
    email: string,
    exp: number,
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string,
    iss: string,
    jti: string,
}

interface Inscricao{
    idInscricao: number,
    dataInscricao: Date,
    idVagaNavigation: {
        nome: string,
        idEmpresaNavigation: {
            nomeFantasia: string,
        },
    },
}

export default function ListarAluno() {
    const { navigate } = useNavigation();

    async function getData() {
        try {
            let value = await AsyncStorage.getItem('conectando-key-auth')
            if(value !== null && value !== undefined) {
                return value;
            }
        } catch(e) {
            console.log(e);
        }
    }

    
    var token:any = "";
    getData().then((data) => token = `Bearer ${data}`);
    var id= "";
    var array:any = [];

    const [inscricao, setInscricao] = useState<Inscricao[]>([]);

    function handleDecode (){
        try {
            const authDec:Token = jwt_decode(token);
            id = authDec.jti;

            return id;
        } catch (error) {
            console.log("Erro no decode")
        }
    }
    
    function handleLogout() {
        AsyncStorage.clear();
        navigate('Login');
    }

    useEffect(() => {
        handleDecode();
        console.log("Id do aluno: " + id);
        api.get('/Inscricao', {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                authorization: token
            }
        }).then(response => {
            response.data.forEach((element:any) => {
                if (handleDecode() === (element.idAluno).toString()) {
                    console.log("Id do aluno na vaga: " + element.idAluno)
                    array.push(element);
                }
            });
            setInscricao(array)
        })
    },[])

    return (
        <>
        <View style={styles.container}>
            <View style={styles.topBar}>

                <Image source={logo} resizeMode="contain" style={styles.logo}/>
                <BorderlessButton onPress={handleLogout}>
                    <Text style={styles.logout}>Logout</Text>
                </BorderlessButton>
            </View>
        </View>
        
        <View style={styles.containerVagas}>
            <ScrollView style={styles.scroll}>
                {inscricao.map(inscricao => (
                    <View style={styles.modeloVaga} key={String(inscricao.idInscricao)}>
                        <View style={styles.order}>
                            <Feather name="check-circle" size={18} color="#4E4E4E"/>
                            <Text style={styles.titulo}>{inscricao.idVagaNavigation.nome}</Text>
                        </View>
                        <View>
                            <View style={styles.order}>
                                <Feather name="globe" size={18} color="#4E4E4E"/>
                                <Text style={styles.textSpace}>Empresa: {inscricao.idVagaNavigation.idEmpresaNavigation.nomeFantasia}</Text>
                            </View>
                            <View style={styles.order}>
                                <Feather name="calendar" size={18} color="#4E4E4E"/>
                                <Text style={styles.textSpace}>Data de inscrição: {moment(inscricao.dataInscricao).format('DD-MM-YYYY')}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
        </>
    )
}