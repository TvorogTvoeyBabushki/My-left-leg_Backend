import AsyncHandler from 'express-async-handler'
import { prisma } from '../prisma'
import { verify, hash } from 'argon2'

export const authAdmin = AsyncHandler(async (req, res) => {
	const { email, password } = req.body

	const admin = await prisma.admin.findUnique({
		where: {
			email
		}
	})

	const isValidPassword = admin ? await verify(admin.password, password) : null

	if (admin && isValidPassword) {
		res.json(admin)
	} else {
		res.status(401)
		throw new Error('Email and password are not correct')
	}
})

export const registerAdmin = AsyncHandler(async (req, res) => {
	const { email, password } = req.body

	const existingAdmin = await prisma.admin.findFirst({
		where: {
			id: 1
		}
	})

	if (existingAdmin) {
		res.status(403)

		throw new Error('Admin already exists')
	}

	const admin = await prisma.admin.create({
		data: {
			email,
			password: await hash(password),
			name: 'Egor'
		},
		select: {
			id: true,
			name: true,
			email: true,
			createdAt: true,
			updatedAt: true
		}
	})

	res.json(admin)
})
