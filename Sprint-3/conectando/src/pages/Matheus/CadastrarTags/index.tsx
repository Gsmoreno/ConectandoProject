import React, { useEffect, useState } from 'react';

import HeaderAluno from '../../../components/headerAluno/index';
import Footer from '../../../components/footer/index';

import './style.css';
import Axios from 'axios';
import ReactDOM from 'react-dom';

function CadastrarTags(){

    const api = Axios.create({
        baseURL: "http://localhost:5000/api",
        headers: {
            'content-type': 'application/json',
            authorization: 'Bearer ' + localStorage.getItem("conectando-key-auth")
        }
    })

    const [tag, setTag] = useState("")

    useEffect(() =>{
        BuscarTags()
    }, [])

    const BuscarTags = () =>{
        api.get("/Tags")
        .then(response => {
            console.log(response.data)
            ReactDOM.render(ModeloTags(response.data),document.getElementById("tagsBuscadas"))
        })
    }

    const CadastrarTags = () =>{
        console.log(tag)
        const tagsVaga = {nome : tag}
        console.log(tagsVaga)
        api.post("/Tags",JSON.stringify(tagsVaga))
        .then(res => {
            BuscarTags()
        })
    }

    const ModeloTags = (tags:any) => {
        let cont = 0
        let a:any
        return (
            <div id="div_Tags_">
                {tags.map((t:any) => (
                    <>
                        <p className="TagsEstilo">{t.nome}</p>
                    </>
                ))}
            </div>
        )
    }

    // const AvisoTag = (id:any , nome:any) => {
    //     console.log(id)

    //     const ModeloOpcao = () => {
    //         return (
    //             <div>
    //                 <p>O que deseja fazer com a Tag:"{nome}"</p>
    //                 <div>
    //                     <button id="Op_Deletar">Deletar</button>
    //                     <button id="Op_Atualizar">Atualizar</button>
    //                     <button onClick={() => BCancelar()} id="Op_Cancelar">Cancelar</button>
    //                 </div>
    //             </div>
    //         )
    //     }

    //     let divEscondida = document.getElementById("Div_OpcaoE")

    //     const BCancelar = () => {
    //         if(divEscondida !== null)
    //         {
    //             divEscondida.style.display= "none"
    //         }
    //     }

    //     if(divEscondida !== null)
    //     {
    //         divEscondida.style.display= "block"
    //     }

    //     ReactDOM.render(ModeloOpcao(),document.getElementById("Div_OpcaoE"))
    // }


    return(
        <div>
            <HeaderAluno/>
            <div>
                <div className="div-menu">
                    <h1 onClick={() => window.location.href = "/confirmacaoEmpresa"}>Confirmação</h1>
                    <h1 className="sublinhar">Cadastro</h1>
                </div>

                <div id="tagsBuscadas">

                </div>

                {/* <div id="Div_OpcaoE"></div> */}

                <div id="CadastroTag_tags">
                    <p>Cadastre novas Tags</p>
                    <input onChange={(e) => setTag(e.target.value)} id="input_CadastroTag" type="text"/>
                    <button onClick={() => CadastrarTags()} id="button_CadastroTag">Cadastrar Tag</button>
                </div>
            </div>

            <Footer/>
        </div>
    );
}

export default CadastrarTags;