const Job = require('../models/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../models/Profile')

module.exports = {

    async saveJob(request, response) {
          
        await Job.create({
            name: request.body.name,
            "daily-hours": request.body["daily-hours"],
            "total-hours": request.body["total-hours"],
            created_at: Date.now(),
        })

        return response.redirect('/')
        },

    createJob(request, response) {
        return response.render("job")
    },

    async show(request, response) {
        
        //capiturando o id passando via paramêtro na url
        const jobId = request.params.id
        const jobs = await Job.get()

        //a função find() vai buscar no Job.data (através do método get() criado no model Job) o id e comparar o id passado por parâmetro na url, caso ele encontre a função retornará o objeto em questão
        const job = await jobs.find(job => Number(job.id) === Number(jobId))

        if (!job) {
            return response.send("job is not fund! show")
        }

        const profile = await Profile.get()

        job.budget = JobUtils.calculateBudget(job, profile["value-hour"])

        return response.render("job-edit", { job })
    },
    
    async update(request, response) {
        //capiturando o id passando via paramêtro na url
        const jobId = request.params.id
        
        const updatedJob = {
            name: request.body.name,
            "total-hours": request.body["total-hours"],
            "daily-hours": request.body["daily-hours"]
        }
        console.log(updatedJob)

        await Job.update(updatedJob, jobId)

        return response.redirect("/job/" + jobId)
    },

    async delete(request, response) {
        const jobId = request.params.id
       
        //Passando o jobId para o módel executar a remoção
        await Job.delete(jobId)

        return response.redirect("/index")
    }
}