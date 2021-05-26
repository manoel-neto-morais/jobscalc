const Database = require('./config')


const initDb = {
    
    
    async init() {

        //inicia a conexão com o banco através do open() debtro de config
        const db = await Database()

        //criação da tabela profile
        await db.exec(`CREATE TABLE profile ( 
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT, 
            avatar TEXT, 
            monthly_budget INT, 
            days_per_week INT, 
            hours_per_day INT, 
            vacation_per_year INT, 
            value_hour INT
            )`
        )

        //criação da tabala jobs
        await db.exec(`CREATE TABLE jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            daily_hours INT, 
            total_hours INT,
            created_at DATETIME
            )`
        )

        //inserindo dados na tabala profile
        await db.run(` INSERT INTO profile (
            name, 
            avatar, 
            monthly_budget,
            days_per_week,
            hours_per_day,
            vacation_per_year,
            value_hour
            ) VALUES (
            "Manoel Neto",
            "https://avatars.githubusercontent.com/u/64874593?v=4",
            3000,
            5,
            5,
            4,
            75
        ) 
`)

        //inserindo dados na tabela jobs
        await db.run(` INSERT INTO jobs (
            name, 
            daily_hours,
            total_hours,
            created_at
            ) VALUES (
                "Pizzaria Guloso",
                2,
                1,
                1617514376018
            )
`)

        await db.run(` INSERT INTO jobs (
            name, 
            daily_hours,
            total_hours,
            created_at
            ) VALUES (
                "OneTwo Projects",
                3,
                47,
                1617514376018
            )
`)


        //fecha a conexão com o banco de dados
        await db.close()
    }
}

initDb.init()