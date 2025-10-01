/**************************************************************************************
 * Objetivo: API responsável em criar end-points referente estados e cidades
 * Data: 15/09/2025
 * Autor: Carlos Eduardo 
 * Versão: 1.0
 *************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//Import do arquivo de funções  
const dados = require('./modulo/funcoes.js')

//Define a porta padrão da API, se for em um servidor de nuvem não temos acesso a porta
//em execução local podemos falar definir uma porta livre
const PORT = process.PORT || 8090

//Instancia na classe do express
const app = express()

app.use((request, response, next)=>{
    response.header('Acess-Control-Allow-Origin', '*')//IP de Origem
    response.header('Acess-Control-Allow-Methods', 'GET')//Métodos (Vebos) do protocolo HTTP

    app.use(cors())
    next()//Proximo
})

//EndPoints
app.get('v1/whatsapp/documento', function(request, response){
    let documento = dados.getAllDados()

    response.status(documento.statuscode)
    response.json(documento)
})

app.get('v1/whatsapp/usuario/:number', function(request, response){
    let numero = request.params.number
    let usuarioDados = dados.getDadosByNumber(numero)

    response.status(usuarioDados.statuscode)
    response.json(usuarioDados)
})

app.get('v1/whatsapp/usuario/contatos/:number', function(request, response){
    let numero = request.params.number
    let usuarioContatos = dados.getDadosContactsByNumber(numero)

    response.status(usuarioContatos.statuscode)
    response.json(usuarioContatos)
})

app.get('v1/whatsapp/usuario/mensagens/:number', function(request, response){
    let numero = request.params.number
    let usuarioMensagens = dados.getAllMessagesByNumber(numero)

    response.status(usuarioMensagens.statuscode)
    response.json(usuarioMensagens)
})

app.get('v1/whatsapp/usuario/conversa/', function(request, response){
    let numero = request.query.number
    let numeroRecebedor = request.query.numberRecebedor
    let usuariosConversa = dados.getDadosByNumber(numero, numeroRecebedor)

    response.status(usuariosConversa.statuscode)
    response.json(usuariosConversa)
})

app.get('v1/whatsapp/usuario/conversa/filtro/', function(request, response){
    let numero = request.query.number
    let numeroRecebedor = request.query.numberRecebedor
    let palavraChave = request.query.keyWord
    let filtroConversa = dados.getFilterByKeyWord(numero, numeroRecebedor, palavraChave)

    response.status(filtroConversa.statuscode)
    response.json(filtroConversa)
})

app.listen(PORT, function(){
    console.log('api aguardando...')
})