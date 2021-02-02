import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import {FiChevronsRight, FiHome, FiMap, FiTag, FiTerminal, FiTrendingUp} from 'react-icons/fi';

import HeaderEmpresa from '../../../components/headerEmpresa/index';
import Footer from '../../../components/footer/index';

import imgExemplo from '../../../assets/images/empresa.png'

import './style.css';
import Axios from 'axios';
import { convertCompilerOptionsFromJson } from 'typescript';
import ListaEmpresa from '../../Moreno/listaEmpresa';

function TelaPrincipalEmpresa(){

    var alunos: any[] = []
    var mostrarTodosAlunos = "false"
    var vaga:any

    var semestres = [{semestre: 1, value: "false"},
    {semestre: 2, value: "false"},
    {semestre: 3, value: "false"}]

    var cursos = [{curso: 1, value: "false"},
    {curso: 2, value: "false"},
    {curso: 3, value: "false"}]

    const api = Axios.create({
        baseURL: "http://localhost:5000/api",
        headers: {
            'content-type': 'application/json',
            authorization: 'Bearer ' + localStorage.getItem("conectando-key-auth")
        }
    })
    
    useEffect(() =>{
        BuscarVaga()
        BuscarAlunosVaga()
    }, [])

    // const BuscarAlunos = () =>{
    //     let div = document.getElementById("div-Alunos")
    //     api.get("/Aluno")
    //     .then(response =>{
    //         response.data.map(((aluno:any) =>{
    //             alunos.push(aluno)
    //         }))
    //         console.log(alunos)
    //         ReactDOM.render(ModeloAluno(response.data),document.getElementById("div-Alunos"))
    //     })
    // }

    const BuscarAlunosVaga = () => {
        alunos = []
        let token = localStorage.getItem("conectando-key-auth")
        let id
        if(token !== null)
        {
            id = JSON.parse(window.atob(token.split('.')[1])).jti
        }
        api.get('/Aluno/Alunos/'+id)
        .then(res => {
            res.data.map(((aluno:any) =>{
            alunos.push(aluno)
            }))
            let view = document.getElementById('div-Alunos')
            if(view !== null)
            Filtro()
        })

    }
    
    const BuscarVaga = () => {
        let token = localStorage.getItem("conectando-key-auth")
        let id
        if(token !== null)
        {
            id = JSON.parse(window.atob(token.split('.')[1])).jti
        }
        api.get('/Vaga/Vagas/'+ id,{
        })
        .then(res => {
            let view = document.getElementById('vagasEmpresaFiltro')
            if(view !== null)
            vaga = "listar"
            console.log(vaga)
            ReactDOM.render(ModeloVaga(res.data), view)
        })
    }

    const CarregarVaga = (x:any) => {
        vaga = x

        Filtro()
    }

    const ModeloVaga = (vaga:any) => {
    return (
        <>
        <form>
            <p>Inscritos em minhas vagas</p>
            <select name="vagaSelecionadaEmpresa" id="vagaSelecionadaEmpresa" onChange={(e) => CarregarVaga(e.target.value)}>
                <option value='listar'> Todos Alunos inscritos</option> 
            {vaga.map((v:any) => (
                <option key={v.idVaga} value={v.nomeVaga}>{v.nomeVaga}</option>
            ))}
            </select>
        </form>
        <div>
            <button onClick={() => TodosAlunos()} id="TodosAluno">Mostrar Todos Alunos</button>
        </div>
        </>
    )
    }

    const TodosAlunos = () => {
        let botao = document.getElementById("TodosAluno")
        if(botao !== null)
        {
            if(mostrarTodosAlunos === "false")
            {
                mostrarTodosAlunos = "true"
                botao.style.backgroundColor='#3496c7'
            }
            else
            {
                mostrarTodosAlunos = "false"
                botao.style.backgroundColor='#F1EDEE'
            }
            Filtro()
        }
    }

    const MaisDetalhes = (id:any) =>{
        localStorage.setItem('idAluno', id)
        window.location.href = "/DetalhesAluno"
    }

    const Filtro = () =>{
        let alunosFiltrados: any[] = []
        let alunosFiltrados2: any[] = []
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
        if(mostrarTodosAlunos === "true")
        {
            alunosFiltrados2 = alunosFiltrados
        }
        else{
            if(vaga === "listar")
            {
                alunosFiltrados.forEach((element:any) => {
                    if(element.vagasCadastradas.length !== 0)
                    alunosFiltrados2.push(element)
                })
            }
            else if(vaga !== undefined)
            {
                alunosFiltrados.forEach((element:any) => {
                    element.vagasCadastradas.forEach((e:any) =>{
                        if(e === vaga)
                        {
                            alunosFiltrados2.push(element)
                        }
                    })
                })
            }
        }

        ReactDOM.render(ModeloAluno(alunosFiltrados2),document.getElementById("div-Alunos"))
    }

    const FiltroCurso = (n:any, id:string) =>{
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
            let botao = document.getElementById("semeste" + element.semestre)
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
    
    const ModeloAluno = (e: any) =>{
        return(
            <div>
                {e.map((aluno:any) => (
                    <><div className="modelo">
                    <div className="comecoModelo">
                        <p>porcentagem</p>
                        <p onClick={() => MaisDetalhes(aluno.idAluno)}>Mais detalhes <FiChevronsRight /></p>
                    </div><div className="meioModelo">
                            <div className="divFoto">
                                <img src={imgExemplo} alt="" />
                                <div>
                                    <p>{aluno.nome}</p>
                                    <p><FiTerminal />Foco: {aluno.focoArea}</p>
                                </div>
                            </div>
                            <p><FiTag /> {aluno.curso}</p>
                        </div>
                        <div className="fimModelo">
                            <p><FiMap /> {aluno.uf}/ {aluno.cidade} </p>
                            <p><FiTrendingUp /> {aluno.exp}</p>
                            <p><FiHome />Remoto: {aluno.remoto}</p>
                        </div>
                        {ModeloVagaCadastrada(aluno.vagasCadastradas)}
                        </div>
                        </>
                ))}
                
            </div>
        );
    }

    const ModeloVagaCadastrada = (e:any) => {
        if(e.length !== 0 && vaga === "listar" || e.length !== 0 && mostrarTodosAlunos === "true"){
            return (
                <>
                <p id="VagasInscritasP">Vagas inscritas:</p>
                {e.map((v:any) => (<p id="Vagas_Inscritas_" key={v}>{v}</p>))}
                </>
            );
        }
    }

    return(
        <div>
            <HeaderEmpresa/>
            
            <div className="menu">
                <h1 className="aluno">Alunos</h1>
                <h1 id="suasVagash1">Suas Vagas</h1>
            </div>

            <div className="bodyEmpresa">
                <div className="filtros">
                    <p>Filtro</p>
                    <p>Semestre</p>
                    <div className="filtro">
                        <button onClick={() => FiltroSemestre(1)} id="semeste1">1ºS</button>
                        <button onClick={() => FiltroSemestre(2)} id="semeste2">2ºS</button>
                        <button onClick={() => FiltroSemestre(3)} id="semeste3">3ºS</button>
                    </div>
                    <p>Foco de carreira</p>
                    <div className="filtro">
                        <button onClick={() => FiltroCurso(1, "dev")} id="dev">DEV</button>
                        <button onClick={() => FiltroCurso(2, "redes")} id="redes">Redes</button>
                        <button onClick={() => FiltroCurso(3, "multimidia")} id="multimidia">Multimídia</button>
                    </div>

                    <div id="vagasEmpresaFiltro">

                    </div>
                </div>
                <div className="scroll" id="div-Alunos">
                </div>

            </div>

            <Footer/>
        </div>
    );
}

export default TelaPrincipalEmpresa;