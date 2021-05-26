
module.exports = {
    //função que calcula os restante de dias para finalizar o job
    remainingDays(item) {

        //número de dias restantes
        const remainingDays = (item["total-hours"] / item["daily-hours"]).toFixed()

        // transformando a data contida em jobs.created_at (ques está em ms) e transformando em um objeto no formato de data
        const createdDate = new Date(item.created_at)


        //dueDay (dia de vencimento) recebeerá o dia da criação do job + o número de dias restantes
        const dueDay = createdDate.getDate() + Number(remainingDays)

        //dueDate será o dia de vencimento em ms
        const dueDateInMs = createdDate.setDate(dueDay)

        //calcula a diferença em ms
        const timeDiffInMs = dueDateInMs - Date.now()

        //transformar ms em dias
        const dayInMs = 1000 * 60 * 60 * 24

        //calcula a diferença em dias
        const dayDiff = Math.floor(timeDiffInMs / dayInMs)

        return dayDiff
    },

    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}