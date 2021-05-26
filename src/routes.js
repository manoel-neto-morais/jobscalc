const express = require('express');

//importação dos controllers
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')
const DashboardController = require('./controllers/DashboardController')

//utilização do método Router() do express
const routes = express.Router()

// redirect to /index
routes.get('/', (request, response) => response.redirect('/index'))

routes.get('/index', DashboardController.index)

routes.get('/job', JobController.createJob)
routes.post('/job', JobController.saveJob)

routes.get('/job/:id', JobController.show)
routes.post('/job/:id', JobController.update)

routes.post('/job/delete/:id', JobController.delete)

routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)

//exportando o múdlo routes
module.exports = routes