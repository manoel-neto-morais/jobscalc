//importação do banco de dados
const Database = require('../db/config')


module.exports = {

    async get() {
        //iniciando o banco de dados
        const db = await Database()

        //captura de todos os dados da tabela jobs
        const jobs = await db.all(`SELECT * FROM jobs`)
        
        //fechando o banco de dados
        await db.close()
        
        return jobs.map(job => {
            return{
                id: job.id,
                name: job.name,
                "daily-hours": job.daily_hours,
                "total-hours": job.total_hours,
                created_at: job.created_at

            }
        })
    },


    async update(updatedJob, jobId) {
        const db = await Database()
        console.log("Até aqui, Deus nos ajudou e vai ajudar até o fim!")

        await db.run(`UPDATE jobs SET 
            name = "${updatedJob.name}",
            daily_hours = ${updatedJob["daily-hours"]},
            total_hours = ${updatedJob["total-hours"]}
            WHERE id = ${jobId}
        `)
        
        await db.close()
    },

    async delete(id) {
        
        //abrindo o banco de dados
        const db = await Database()

        //utilizando o sql para deletar o campo de id igual o recebido por parâmetro
        await db.run(`DELETE FROM jobs WHERE id = ${id}`)

        //fechando o banco de dados
        db.close() 

    }, 

    async create(newJob){
       
        //iniciando o banco de dados
        const db = await Database()

        await db.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "${newJob.name}",
            ${newJob["daily-hours"]},
            ${newJob["total-hours"]},
            ${newJob.created_at}
        )
        `)


        //fechamento do banco de dados
        await db.close()

    }
}
