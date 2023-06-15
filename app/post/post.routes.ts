import express from 'express'
import {
	createNewPost,
	deletePost,
	getPost,
	getPosts,
	updatePost
} from './post.controller'

const router = express.Router()

router.route('/').get(getPosts).post(createNewPost)

router.route('/:id').get(getPost).put(updatePost).delete(deletePost)

export default router
