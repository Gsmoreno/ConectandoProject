import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Login from './pages/login/index';

import CadastroEmpresa from './pages/Lucas/CadastroEmpresa/index';
import PerfilEmpresa from './pages/Lucas/PerfilEmpresa';

import DetalhesVagaEmpresa from './pages/Lucas/DetalhesVagaEmpresa';
import VagasEmpresa from './pages/Lucas/VagasEmpresa';
import DetalhesVaga from './pages/Moreno/detalhesVaga';

import CadastroVagas from './pages/Matheus/CadastrarVagas';
import CadastrarTags from './pages/Matheus/CadastrarTags';

import PerfilAluno from './pages/Felipe/perfil';
import CadastroAluno from './pages/Felipe/cadastroAluno';
import ConfirmacaoAluno from './pages/Matheus/ConfirmacaoAluno/Index';
import ConfirmacaoEmpresa from './pages/Matheus/ConfirmacaoEmpresa';
import TelaPrincipalEmpresa from './pages/Matheus/TelaPrincipalEmpresa';
import DetalhesAluno from './pages/Matheus/DetalhesAluno';
import ListaAluno from './pages/Moreno/listaAluno';
import ListaEmpresa from './pages/Moreno/listaEmpresa';
import ListaVagas from './pages/Moreno/listaVaga';
import CadastroAdm from './pages/Moreno/cadastroAdm';
import VagasAluno from './pages/Felipe/VagasAluno';
import VagasInscrito from './pages/Felipe/VagasInscrito';


function Routers() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Login} />

            <Route path="/CadastroEmpresa" component={CadastroEmpresa} />
            <Route path="/PerfilEmpresa" component={PerfilEmpresa} />
            <Route path="/VagasEmpresa" component={VagasEmpresa} />
            <Route path="/DetalhesVagaEmpresa" component={DetalhesVagaEmpresa} />
            <Route path="/TelaPrincipalEmpresa" exact component={TelaPrincipalEmpresa} />

            <Route path="/detalhesVaga" component={DetalhesVaga} />
            <Route path="/cadastroAluno" component={CadastroAluno} />
            <Route path="/perfilAluno" component={PerfilAluno} />

            <AnimatePresence exitBeforeEnter>
                <Route path="/vagasAluno" component={VagasAluno} />
                <Route path="/vagasInscrito" component={VagasInscrito} />
            </AnimatePresence>

            <Route path="/DetalhesAluno" exact component={DetalhesAluno} />

            <Route path="/CadastroVaga" component={CadastroVagas} />
            <Route path="/confirmacaoAluno" exact component={ConfirmacaoAluno} />
            <Route path="/confirmacaoEmpresa" exact component={ConfirmacaoEmpresa} />
            <Route path="/CadastroTags" exact component={CadastrarTags} />

            <AnimatePresence exitBeforeEnter>
                        
                        <Route path="/listaAluno"  component={ListaAluno}/>
                        <Route path="/listaEmpresa"  component={ListaEmpresa}/>
                        <Route path="/listaVaga"  component={ListaVagas}/>
                        <Route path="/cadastroAdm"  component={CadastroAdm}/>
                        
            </AnimatePresence>

        </BrowserRouter>
    );
}
export default Routers;