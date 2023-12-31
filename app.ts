import 'colors'
import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'

import postRoutes from './app/post/post.routes'
import adminRoutes from './app/admin/admin.routes'

import { prisma } from './app/prisma'
import { errorHandler, notFound } from './app/middleware/error.middleware'

dotenv.config()

const app = express()

async function main() {
	if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

	app.use(cors())
	app.use(express.json())

	app.use('/api/manage', adminRoutes)
	app.use('/api/post', postRoutes)

	app.use(notFound) // ???
	app.use(errorHandler) // связка с AsyncHandler

	const PORT = 7000

	app.listen(PORT, () => {
		console.log(
			`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green
				.bold
		)
	})
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async error => {
		console.error(error)
		await prisma.$disconnect()
		process.exit(1)
	})
