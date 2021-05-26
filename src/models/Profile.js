//importação do banco de dados
const Database = require('../db/config')


module.exports ={
    
    async get(){
        //iniciando o banco de dados
        const db = await Database()
        
        //o método get retorna apenas um elemento da tabela
        const data = await db.get(`SELECT * FROM profile`)
        
        //fechando o banco de dados
        db.close()

        return  {
            name: data.name,
            avatar: data.avatar,
            "monthly-budget": data.monthly_budget,
            "days-per-week": data.days_per_week,
            "hours-per-day": data.hours_per_day,
            "vacation-per-year": data.vacation_per_year,
            "value-hour": data.value_hour
        }
    }, 

    //método que receberá o objeto atualizado que vem do ProfileController
    async update(newData){
        
        const db = await Database()
        
        //alterando os campos do banco via sql
        db.run(`UPDATE profile SET 
        name = "${newData.name}",
        avatar = "${newData.avatar}",
        monthly_budget = ${newData["monthly-budget"]},
        days_per_week = ${newData["days-per-week"]},
        hours_per_day = ${newData["hours-per-day"]},
        vacation_per_year = ${newData["vacation-per-year"]},
        value_hour = ${newData["value-hour"]}
        `)
        
        await db.close()
    }
}
