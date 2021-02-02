import express from 'express';

import routes from './routes'; 

import cors from 'cors'; 

const app = express(); //transformar o express() em uma variável manipulvel
app.use(cors()); //falar para express usar o cors
app.use(express.json()); //falar para express usar json
app.use(routes); //caso de erro n início, comente tbm //falar