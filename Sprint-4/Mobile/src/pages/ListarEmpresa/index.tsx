import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';
import { useNavigation } from '@react-navigation/native';

import api from '../../service/api';
import styles from './styles'
import ReactDOM, { render } from 'react-dom';
import { Token } from '../ListarAluno';

export default function ListarEmpresa() {

  const { navigate } = useNavigation();

  var alunos: any[] = []

    var semestres = [{semestre: 1, value: "false"},
    {semestre: 2, value: "false"},
    {semestre: 3, value: "false"}]

    var cursos = [{curso: 1, value: "false"},
    {curso: 2, value: "false"},
    {curso: 3, value: "false"}]

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


  useEffect(() => {
    BuscarEmpresa()
    BuscarVaga()
  }, [])

  const BuscarEmpresa = () =>{
    getData().then((data) => {
      if(data != null){
        let auth:Token = jwt_decode(data);
        let id = auth.jti
        api.get('/Empresa/'+ id,{
          headers: {
          'content-type': 'application/json',
          authorization: "Bearer "+data
          }
        })
        .then(res => {
          console.log(res.data)
          let nome = document.getElementById('NomeEmpresa')
          if(nome !== null)
            nome.innerText = `${res.data.nomeFantasia}`
        })
      }
    });
  }

  const ModeloAluno = (a:any) => {
    return(
      <>
        {
          a.map((aluno:any) => (
          <View style={styles.Modelo} key={aluno.idAluno}>
            <View style={styles.ModeloInicio}>
              <Text>Porcentagem</Text>
            </View>
            <View style={styles.ModeloMeio}>
              <View style={styles.Foto}>
                <View style={styles.Img}></View>
                <View>
                  <Text>{aluno.nome}</Text>
                  <Text><Feather name="terminal" size={15} color="black" />{aluno.focoArea}</Text>
                </View>
              </View>
            </View>

            <Text><Feather name="tag" size={15} color="black" />{aluno.curso}</Text>
            <Text>Data Inscrição: {aluno.dataInscricao}</Text>

            <View style={styles.ModeloFim}>
              <Text><Feather name="menu" size={15} color="black" /> {aluno.semestre} Semestre</Text>
              <Text style={styles.espaco}><Feather name="home" size={15} color="black" /> Remoto : {aluno.remoto}</Text>
            </View>
          </View>
          ))
        }
      </>
    )
  }

  const Filtro = () =>{
    let alunosFiltrados: any[] = []
    let e = 0

    if(semestres[0].value === "false" && semestres[1].value === "false" && semestres[2].value === "false" && cursos[0].value === "false" && cursos[1].value === "false" && cursos[2].value === "false")
        alunosFiltrados = alunos

    if(semestres.every(function(s) { return s.value === "false"}))
        e+= 2
    if(cursos.every(function(c) { return c.value === "false"}))
        e+= 1

    switch (e) {

        case 0:
            semestres.forEach(elementSemestre =>{
                if(elementSemestre.value === "true")
                {
                    cursos.forEach(elementCurso =>{
                        if(elementCurso.value === "true")
                        {
                            alunos.filter(aluno => aluno.semestre === elementSemestre.semestre && aluno.idCurso === elementCurso.curso).map((a) => alunosFiltrados.push(a))
                        }
                    })
                }
            })
            break;

        case 1:
            semestres.forEach(element =>{
                if(element.value === "true")
                {
                    alunos.filter(aluno => aluno.semestre === element.semestre).map((a)=>{alunosFiltrados.push(a)})
                }
            })
            break;

        case 2:
            cursos.forEach(element =>{
                if(element.value === "true")
                {
                    alunos.filter(aluno => aluno.idCurso === element.curso).map((a)=>{alunosFiltrados.push(a)})
                }
            })
            break;

        
    }
    ReactDOM.render(ModeloAluno(alunosFiltrados),document.getElementById("modelosId"))
}

  const FiltroCurso = (n:number ,id:any) =>{
    cursos.forEach(element => {
      let botao = document.getElementById(id)
      if(botao !== null)
      {
          if(element.curso === n)
          {
              switch (element.value) {
                  case "false":
                      element.value = "true"
                      botao.style.backgroundColor='#3496c7'
                      break;
                  case "true":
                      element.value = "false"
                      botao.style.backgroundColor='#F1EDEE'
                      break;
              }
          }
      }
    });
    Filtro()
  }

  const FiltroSemestre = (n:any) =>{
    semestres.forEach(element => {
      let botao = document.getElementById("semestre" + n)
      if(botao !== null)
      {
          if(element.semestre === n)
          {
              switch (element.value) {
                  case "false":
                      element.value = "true"
                      botao.style.backgroundColor='#3496c7'
                      break;
                  case "true":
                      element.value = "false"
                      botao.style.backgroundColor='#F1EDEE'
                      break;
              }
          }
      }
    });
    Filtro()
  }

  const AbrirFiltro = () => {
    console.log('aqui')
    let view = document.getElementById('Filtro')
    let botao = document.getElementById('BFiltro')
    if(view !== null){
      if(view.style.display === 'block' && botao !== null)
      {
        view.style.display = 'none'
        botao.style.backgroundColor = '#3496c7'
      }
      else{
        view.style.display = 'block'
        if(botao !== null)
          botao.style.backgroundColor = '#F1EDEE'
      }
    }
  }

  const MostrarMenu = () =>{
    let menu = document.getElementById('Menu')
    if(menu !== null)
    {
      if(menu.style.display === 'none')
        menu.style.display= 'block'
      else
        menu.style.display= 'none'
    }
  }

  const BuscarAlunosVaga = (id:any) => {
    alunos = []
    console.log(id)
    getData().then((data:any) => {
      api.get('/Inscricao/Alunos/'+id,{
        headers: {
        'content-type': 'application/json',
        authorization: "Bearer "+data
        }
      })
      .then(res => {
        console.log(res.data)
        res.data.map(((aluno:any) =>{
          alunos.push(aluno)
        }))
        let view = document.getElementById('modelosId')
        if(view !== null)
          ReactDOM.render(ModeloAluno(res.data), view)
      })
      .then(Filtro)
    })
  }

  const BuscarVaga = () => {
    getData().then((data:any) => {
      let auth:Token = jwt_decode(data);
      let id = auth.jti
      api.get('/Vaga/Vagas/'+id,{
        headers: {
        'content-type': 'application/json',
        authorization: "Bearer "+data
        }
      })
      .then(res => {
        let view = document.getElementById('VagaSelecionada')
        if(view !== null)
          ReactDOM.render(ModeloVaga(res.data), view)

        BuscarAlunosVaga(res.data[0].idVaga)
      })
      
    })
  }

  const ModeloVaga = (vaga:any) => {
    return (
      <>
      <form>
          <select name="vagaSelecionada" id="vagaSelecionada" onChange={x => BuscarAlunosVaga(x.target.value)}>
            {vaga.map((v:any) => (
                <option key={v.idVaga} value={v.idVaga}>{v.nomeVaga}</option>
            ))}
          </select>
      </form>
        </>
    )
  }

  const Logout = () => {
    AsyncStorage.removeItem('conectando-key-auth')
    navigate('Login')
  }

  return (
    <View>
      <View style={styles.HeaderE}>
        <View style={styles.EmpresaI}>
          <View style={styles.ImgN}></View>
          <View>
            <View style={styles.MenuEmpresa}>
              <Text onPress={() => MostrarMenu()} nativeID="NomeEmpresa"></Text>
              <AntDesign onPress={() => MostrarMenu()} name="caretdown" size={15} color="black" />
            </View>
            <Text nativeID="Menu" style={styles.Logout} onPress={() => Logout()}>Logout</Text>
          </View>
        </View>
      </View>
      <View style={styles.filtro}>
        <Text nativeID="BFiltro" style={styles.BotaoF} onPress={() => AbrirFiltro()}>Filtro</Text>
        <View nativeID="Filtro" style={styles.ButtonFiltro}>
          <View style={styles.buttons}>
            <Text nativeID="dev" style={styles.button} onPress={() => FiltroCurso(1 , 'dev')}>Dev</Text>
            <Text nativeID="redes" style={styles.button} onPress={() => FiltroCurso(2 , 'redes')}>Redes</Text>
            <Text nativeID="multimidia" style={styles.button} onPress={() => FiltroCurso(3 , 'multimidia')}>Multimidia</Text>
          </View>
          <View style={styles.buttons}>
            <Text nativeID="semestre1" style={styles.button} onPress={() => FiltroSemestre(1)}>1ºSemestre</Text>
            <Text nativeID="semestre2" style={styles.button} onPress={() => FiltroSemestre(2)}>2ºSemestre</Text>
            <Text nativeID="semestre3" style={styles.button} onPress={() => FiltroSemestre(3)}>3ºSemestre</Text>
          </View>
        </View>
        <View style={styles.SelectVagas}>
          <Text>Escolha uma de suas Vagas para ver os alunos Inscritos</Text>
          <View nativeID="VagaSelecionada"></View>
        </View>
      </View>
      <View style={styles.ListaAlunos} nativeID='modelosId'>
      </View>
    </View>
  );
}