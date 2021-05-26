
//importação do model Profile
const Profile = require('../models/Profile')

module.exports =  {
    
    async index(request, response) {

        return response.render('profile', { profile: await Profile.get() })
    },


    
    async update(request, response) {
        //request.body para pegar os dados
        const data = request.body

        //quantas semanas tem no ano
        const weeksPerYear = 52

        //remover as semanas de férias para pegar quantas semans tem em 1 mêS
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12

        //quantas horas por semana estou trabalhadas
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

        // total de horas trabalhas no mês
        const monthlyTotalHours = (weeksPerMonth * weekTotalHours).toFixed()

        //valor da hora
        data["value-hour"] = data["monthly-budget"] / monthlyTotalHours


        const profile = await Profile.get()

        //chamando o método update do módulo Profile. Nele passamos por parâmetro o objeto atualizado.
        await Profile.update({
            ...await profile,
            ...data,
        })

        return response.redirect('/profile')

    }
}