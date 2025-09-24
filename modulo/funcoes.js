/*************************************************************************
 * Objetivo: Arquivo responsável pelas funções.
 * Data: 24/09/2025
 * Autor: Carlos Eduardo
 * Versão: 1.0
 **************************************************************************************/

//import do arquivo
const dados = require('./contatos.js')

//Mensagem de erro
const MESSAGE_ERROR = {status:false, statuscode: 500, development:'Carlos Eduardo'}

const getAllDados = function(){
    //Mensagem padrão do retorno da função
    let message = {status: true, statuscode:200, development: 'Carlos Eduardo', contatos: []}

    dados.contatos['whats-users'].forEach(function(item){
        message.contatos.push(item.id)
        message.contatos.push(item.account)
        message.contatos.push(item.nickname)
        message.contatos.push(item['created-since'])
        message.contatos.push(item['profile-image'])
        message.contatos.push(item.number)
        message.contatos.push(item.background)
        item.contacts.forEach(function(contacts){
            message.contatos.push(contacts.name)
            message.contatos.push(contacts.number)
            message.contatos.push(contacts.description)
            message.contatos.push(contacts.image)

        //looping para entrar no contacts e pegar o array messages, usando if e spreab para ficar mais limpo
        if(contacts.messages && Array.isArray){
            message.contatos.push(...contacts.messages)
        }
        }
        
    )})

    //tratativa para retorno da função
    if(message.contatos.length > 0)
        return message
    else
        return MESSAGE_ERROR
}

const getDadosById = function(id){
    let message = {status: true, statuscode:200, development: 'Carlos Eduardo', nome_do_usuario:[], informacoes:[], contatos: []}

    dados.contatos['whats-users'].forEach(function(item){
        if(item.id == id)
        {message.nome_do_usuario.push(item.nickname)

        message.informacoes.push(item['profile-image'])
        message.informacoes.push(item.number)
        message.informacoes.push(item.background)
        message.informacoes.push(item['created-since']) 

        item.contacts.forEach(function(contacts){
            message.contatos.push(contacts.name)
        })    
    }})
    if(id !== '')
    return message
    else
    return MESSAGE_ERROR
}



console.log(getAllDados())