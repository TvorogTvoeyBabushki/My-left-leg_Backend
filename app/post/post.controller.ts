import { Request, Response } from 'express'
import { prisma } from '../prisma'
import { postFields } from '../utils/post.utils'
import AsyncHandler from 'express-async-handler'

interface IPostContent {
	heading: string
	mainText: string
}

interface IPostRequest {
	body: {
		title: string
		description: string
		img: string
		categorysIds: string[]
		postContent: IPostContent[]
		countVisits: string
	}
	params?: {
		id: string
	}
}

export const getPost = AsyncHandler(
	async (req: IPostRequest, res: Response) => {
		const reqId = req.params.id

		const post = await prisma.post.findUnique({
			where: {
				id: +reqId
			}
		})

		if (!post) {
			res.status(404)
			throw new Error('No post found!')
		}

		res.json(post)
	}
)

export const getPosts = AsyncHandler(
	async (req: IPostRequest, res: Response) => {
		const posts = await prisma.post.findMany({
			orderBy: {
				createdAt: 'desc'
			}
		})

		res.json(posts)
	}
)

export const createNewPost = AsyncHandler(
	async (req: Request, res: Response) => {
		const { title, description, img, categorysIds } = req.body

		const post = await prisma.post.create({
			data: {
				title,
				description,
				img,
				categorysIds
			},
			select: postFields // ???
		})

		res.json(post)
	}
)

export const updatePost = AsyncHandler(async (req: Request, res: Response) => {
	const { title, description, img, categorysIds, postContent, countVisits } =
		req.body
	const postId = req.params.id

	try {
		const post = await prisma.post.update({
			where: {
				id: +postId
			},
			data: {
				title,
				description,
				img,
				categorysIds,
				postContent,
				countVisits
			}
		})

		res.json(post)
	} catch (error) {
		res.status(404)
		throw new Error('No post found!')
	}
})

export const deletePost = AsyncHandler(
	async (req: IPostRequest, res: Response) => {
		const postId = req.params.id

		try {
			const post = await prisma.post.delete({
				where: {
					id: +postId
				}
			})

			res.json({ message: 'Post deleted' })
		} catch (error) {
			res.status(404)
			throw new Error('No post found!')
		}
	}
)
