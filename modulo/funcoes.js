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

const getDadosByNumber = function(number){
    let message = {status: true, statuscode:200, development: 'Carlos Eduardo', nome_do_usuario:[], informacoes:[], contatos: []}

    dados.contatos['whats-users'].forEach(function(item){
        if(item.number == number)
        {message.nome_do_usuario.push(item.nickname)

        message.informacoes.push(item['profile-image'])
        message.informacoes.push(item.number)
        message.informacoes.push(item.background)
        message.informacoes.push(item['created-since']) 

        item.contacts.forEach(function(contacts){
            message.contatos.push(contacts.name)
        })    
    }})
    if(number !== '')
    return message
    else
    return MESSAGE_ERROR
}

const getDadosContactsByNumber = function(number){
    let message = {status: true, statuscode:200, development: 'Carlos Eduardo', nome_do_contato:[]}

    dados.contatos['whats-users'].forEach(function(item){
        if(item.number == number){
            message.nome_do_contato = item.account
            contatos = item.contacts.map(function(contacts){
               seu_contato = contacts.name
               foto = contacts.image
               descricao = contacts.description

                return{seu_contato, foto, descricao}
            })
        message.contatos = contatos
        } 
    })
    if(number !== '')
    return message
    else
    return MESSAGE_ERROR
}

const getAllMessagesByNumber = function(number){
    let message = {status: true, statuscode:200, development: 'Carlos Eduardo', nome_do_contato:[], conversas: []}

    dados.contatos['whats-users'].forEach(function(item){
        if(item.number == number){
            message.nome_do_contato = item.account

            item.contacts.forEach(function(contacts){
                contacts.messages.forEach(function(mensagens){
                    const conversa = { enviado_para: mensagens.sender,
                        conteudo: mensagens.content,
                        horario: mensagens.time}
                    message.conversas.push(conversa)
                })
            })
        } 
    })
    if(number !== '')
    return message
    else
    return MESSAGE_ERROR
}

const getConversaByNumberAndName = function(number, numberRecebedor){
    let message = {status: true, statuscode:200, development: 'Carlos Eduardo', nome_do_contato:[], nome_do_recebedor:[], conversas: []}

    dados.contatos['whats-users'].forEach(function(item){
        item.contacts.forEach(function(contacts){
            if(item.number == number && contacts.number == numberRecebedor){
                message.nome_do_contato = item.account
                message.nome_do_recebedor = contacts.name

                let nome_do_recebedor = contacts.name

                contacts.messages.forEach(function(mensagens){
                    if(mensagens.sender == nome_do_recebedor || mensagens.sender == "me"){
                       let conversa = {enviado_para: mensagens.sender,
                            conteudo: mensagens.content,
                            horario: mensagens.time
                        }
                        message.conversas.push(conversa)
                    }
                })
            } 
        })
    })
    if(number !== '' || numberRecebedor !== "")
    return message
    else
    return MESSAGE_ERROR
}

const getFilterByKeyWord = function (number, numberRecebedor, keyWord) {
    let message = {status: true, statuscode:200, development: 'Carlos Eduardo', nome_do_contato:[], nome_do_recebedor:[], conversas: []}

    dados.contatos['whats-users'].forEach(function (item) {
        item.contacts.forEach(function (contacts) {
        if (item.number === number && contacts.number === numberRecebedor) {
            message.nome_do_contato = item.account
            message.nome_do_recebedor = contacts.name
                    contacts.messages.forEach(function (mensagens) {
                        if(mensagens.content.toUpperCase().includes(keyWord.toUpperCase())){
                            let conversa = { enviado_para: mensagens.sender,
                                conteudo: mensagens.content,
                                horario: mensagens.time
                            }
                        message.conversas.push(conversa)
                        }
                    })
                }
            })
        })

        if(number !== "" || numberRecebedor !== "" || keyWord !== "")
            return message
         else 
            return MESSAGE_ERROR
    }


module.exports = {
    getAllDados,
    getAllMessagesByNumber,
    getConversaByNumberAndName,
    getDadosByNumber,
    getDadosContactsByNumber,
    getFilterByKeyWord
}