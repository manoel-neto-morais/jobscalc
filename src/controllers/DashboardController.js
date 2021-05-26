const Job = require('../models/Job')
const Profile = require('../models/Profile')
const JobUtils = require('../utils/JobUtils')


module.exports = {

    async index(request, response) {

        //capiturando os models
        const jobs = await Job.get()
        const profile = await Profile.get()

        const statusCount = {
            done: 0,
            progress: 0,
            total: jobs.length
        }

        let jobTotalHours = 0
        const updateJobs = jobs.map((item) => {

            const remaining = JobUtils.remainingDays(item)

            const status = remaining <= 0 ? 'done' : 'progress'

            //calculando o total de horas/dia dos jobs in progress
            jobTotalHours = status === 'progress' ? jobTotalHours += Number(item['daily-hours']) : jobTotalHours

            //calculando a quantidade de status done ou progress
            statusCount.done = status === 'done' ? statusCount.done += 1 : statusCount.done 
            statusCount.progress = status === 'progress' ? statusCount.progress += 1 : statusCount.progress 

            
            //versão alternativa para o calculo do status
            //statusCount[status] += 1
            
            
            // o módulo retorna o spread do item e adiciona os atributos, remaining, status e budget
            return {
                ...item,
                remaining,
                status,
                budget: JobUtils.calculateBudget(item, profile["value-hour"])
            }
            
        })

        //qtd de horas/dia que quero trabalhar menos quantidades de horas/dia de cada job in progress
        const freeHours = profile['hours-per-day'] - jobTotalHours

        return response.render('index', { jobs: updateJobs, profile, statusCount, freeHours })
    },
}
