/************************************************************************************************
* Objetivo: Arquivo responsavel pela interação entre o APP e a model, que teremos todas         * 
* as tratativas e regra de negocio para o CRUD de filmes                                        *                                                                     *
* Data: 30/01/24                                                                                *
* Autor: Giovana Vieira                                                                         *
* Versão: 1.0                                                                                   * 
*************************************************************************************************/

// IMport das mensagens de erro e configuração do projeto
const message = require ('../modulo/config.js');



// Import do arquivo DAO que fará a comuicação do banco de dados 
const filmeDAO = require('../model/DAO/filme.js');
const { application } = require('express');




//função para validar e inserir um novo filme
const setInserirNovoFilme = async function (dadosFilme, contentType){

try {

    if(String(contentType).toLowerCase()== 'application/json'){

  
    // cria o objeto JSON para devolver os dados criados na requisição
    let novoFilmeJSON = {};
    
    // validação de campos obrigatorios ou com digitação inválida
    if(dadosFilme.nome == ''                      || dadosFilme.nome == undefined               ||  dadosFilme.nome == null               || dadosFilme.nome.length > 80             || 
        dadosFilme.sinopse == ''                  || dadosFilme.sinopse == undefined            ||  dadosFilme.sinopse == null            || dadosFilme.sinopse.length > 65000       ||
        dadosFilme.duracao == ''                  || dadosFilme.duracao == undefined            ||  dadosFilme.duracao ==  null           || dadosFilme.duracao.length > 8           ||
        dadosFilme.data_lancamento == ''          || dadosFilme.data_lancamento == undefined    ||  dadosFilme.data_lancamento == null    || dadosFilme.data_lancamento.length != 10 ||
        dadosFilme.foto_capa == ''                || dadosFilme.foto_capa == undefined          ||  dadosFilme.foto_capa ==  null         || dadosFilme.foto_capa.length > 200       ||
        dadosFilme.valor_unitario.length > 6      
    ){
        // return do status code 400
        return message.ERROR_REQUIRED_FIELDS
    
    } else {

        let validateStatus = false;

        // validação da data de relancamento ja que ela não é obrigatória
        if(dadosFilme.data_relancamento != null &&
            dadosFilme.data_relancamento != '' &&
            dadosFilme.data_relancamento != undefined){

            // validação para verificar se a data está com a quantidade de digitos corretos 
            if (dadosFilme.data_relancamento.length != 10) {
                

                return message.ERROR_REQUIRED_FIELDS; //400
            }else{
                validateStatus = true;
            }
        }else{
            validateStatus = true
        }

     // validação para verificar se podemos encaminhar os dados para o DA0
     if(validateStatus){

        // Encaminha os dados do filme para o DAO inserir dados
        let novoFilme = await filmeDAO.insertFilme(dadosFilme);

        // validação para verificar se o DAO inseriu os dados do BD
        if (novoFilme)
        {

            let ultimoId = await filmeDAO.selectIdFilme()
            dadosFilme.id = Number(ultimoId[0].id)
        
            // se inseriu cria o JSON dos dados (201)
            novoFilmeJSON.filme  = dadosFilme
            novoFilmeJSON.status = message.SUCCESS_CREATED_ITEM.status
            novoFilmeJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
            novoFilmeJSON.message = message.SUCCESS_CREATED_ITEM.message 

            return novoFilmeJSON; // 201
        }else{
            return message.ERROR_INTERNAL_SERVER_DB // 500
            }
        }   
      }

    }else{
    return message.ERROR_CONTENT_TYPE // 415
    }
 } catch(error){
return message.ERROR_INTERNAL_SERVER // 500  
 }
  }
        

//função para validar e atualizar um filme
const setAtualizarFilme = async function(id, dadosFilme, contentType){
}
//função para excluir um filme
const setExcluirFilme = async function(id){

    try {

        let idFilme = id;

        if(idFilme == ''  || idFilme == undefined || isNaN (idFilme)){
            return message.ERROR_INVALID_ID //400
        } else {
            let deleteFilme = await filmeDAO.deleteFilme(id)
            if (deleteFilme)
            return message.SUCCESS_DELETED_ITEM
        } 
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

//função para retornar todos os filmes
const getListarFilmes = async function(){

    // Cria o objeto JSON
    let filmesJSON = {};

    //Chama a funcão do DAO para retornar os dados da tabela de filmes
    let dadosFilmes = await filmeDAO.selectAllFilmes();

    // Validação para verificar se existem dados 
    if (dadosFilmes){

        if(dadosFilmes.length > 0){
            // Cria o JSON para devolver para o APP
        filmesJSON.filmes = dadosFilmes;
        filmesJSON.quantidade = dadosFilmes.length;
        filmesJSON.status_code = 200;
        return filmesJSON;
        } else {
            return message.ERROR_NOT_FOUND
        } 
    }else{
        return message.ERROR_INTERNAL_SERVER_DB; 
    }
}

const getBuscarFilmeNome = async(nome) => {
     // Cri o objeto JSON

     let nomeFilme = nome
     let filmesJSON = {};

    if (nomeFilme == '' || nomeFilme == undefined){
        return message.ERROR_INVALID_ID
    } else {
         //Chama a funcão do DAO para retornar os dados da tabela de filmes
     let dadosFilmes = await filmeDAO.selectByNome(nome)


     if(dadosFilmes){
        if(dadosFilmes.length > 0){
                filmesJSON.filme = dadosFilmes;
                filmesJSON.status_code = 200;

                // console.log(filmesJSON)

                return filmesJSON;
        } else {
            return message.ERROR_NOT_FOUND;
        }
     } else {
        return message.ERROR_INTERNAL_SERVER_DB
     }

    }
}

//função para buscar filme pelo ID
const getBuscarFilme = async function (id){

    // Recebe o id do filme
    let idFilme = id;
    //Cria o objeto JSON
    let filmesJSON = {};

    //tratamento do ID para verificar se o ID é válido(vazio, indefinido ou não numerico)
    if(idFilme == '' || idFilme == undefined || isNaN(idFilme)){
        return message.ERROR_INVALID_ID //400
    } else {

        // encaminha o id para o DAO buscar no banco de dados 
        let dadosFilme = await filmeDAO.selectByIdFilme(id)

        // verifca se o DAO retornou dados 
        if(dadosFilme){

            // Validação para verificar a quantidade de itens retornados
            if(dadosFilme.length > 0){
                 // Cria o JSON para retorno 
            filmesJSON.filme = dadosFilme;
            filmesJSON.status_code = 200;

            return filmesJSON;
            } else{
                return message.ERROR_NOT_FOUND
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }
}


module.exports = {
    setAtualizarFilme,
    setInserirNovoFilme,
    setExcluirFilme,
    getBuscarFilme,
    getListarFilmes,
    getBuscarFilmeNome
}