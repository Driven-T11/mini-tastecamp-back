import express from "express"
import cors from "cors"
import { MongoClient } from "mongodb"
import dotenv from "dotenv"

// Criação do app
const app = express()

// Configurações
app.use(cors())
app.use(express.json())
dotenv.config()

// Conexão com o Banco
const mongoClient = new MongoClient(process.env.DATABASE_URL)

try {
	await mongoClient.connect()
	console.log("MongoDB conectado!")
} catch (err) {
	(err) => console.log(err.message)
}

const db = mongoClient.db()

// Funções (endpoints)
app.get("/receitas", async (req, res) => {
	try {
		const receitas = await db.collection("batata").deleteOne({titulo: "oi"})
		res.send(receitas)
	} catch (err) {
		res.status(500).send(err.message)
	}
})

// Ligar a aplicação do servidor para ouvir requisições
const PORT = 5000
app.listen(PORT, () => console.log(`Servidor está rodando na porta ${PORT}`))