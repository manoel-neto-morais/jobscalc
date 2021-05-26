//carregando o express
const express = require('express')
//load routes.js
const routes = require('./routes')
//executando o express
const server = express()
//importa o módulo path
const path = require('path')

//Usar o request.body
server.use(express.urlencoded( { extended: true} ))


server.use(express.json())

//setando a minha view engine - nesse caso usaremos a ejs
server.set('view engine', 'ejs')


//mudar a localização da pasta views
//o uso do __dirname me da a possibilidade de pegar o caminho absoluto do servidor até o diretório local para então concatenar com o restante do caminho absoluto para arquivo de retorno 
server.set('views', path.join(__dirname, 'views'))


//o método use atua como middleware - nesse caso, está utilizando o diretório "public" como fonte para os arquivs estáticos
server.use(express.static("public"))

//utilizando o middleware para mediar as rotas, ele inicia a rota e depois chama o arquivo objeto routes.
server.use('/', routes)




server.listen(3000, ()=>{ console.log("Run server in port 3000") } )

