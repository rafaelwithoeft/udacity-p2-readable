const api = "http://localhost:3001"

let token = localStorage.token
if (!token) {
	token = localStorage.token = Math.random().toString(36).substr(-8)
}

const headers = {
	'Authorization': token
}

/** 
 *  Get all categorties.
 */
export const getCategories = () => fetch(`${api}/categories`, { method: 'GET', headers });

/** 
 *  Get all posts.
 */
export const getAllPosts = () => fetch(`${api}/posts`, { method: 'GET', headers });

/**
 * Get all posts of category.
 * 
 * @param {string} category 
 */
export const getPosts = (category) => fetch(`${api}/${category}/posts`, { method: 'GET', headers });

/**
 * Get detailed post.
 * 
 * @param {string} post 
 */
export const getPost = (post) => fetch(`${api}/posts/${post}`, { method: 'GET', headers });

/**
 * Register new post.
 * 
 * @param {object} post 
 */
export const createPost = (post) =>
	fetch(`${api}/posts`, {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(post)
	}
);

/**
 * Update single post.
 * 
 * @param {object} post 
 */
export const updatePost = (post) =>
	fetch(`${api}/posts/${post.id}`, {
		method: 'PUT',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(post)
	}
);

/**
 * Set deleted's flag of a post to true.
 * 
 * @param {object} post 
 */
export const deletePost = (post) =>
	fetch(`${api}/posts/${post.id}`, {
		method: 'DELETE',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		}
	}
);

/**
 * Vote in post. Vote can be "upVote" or "downVote".
 * 
 * @param {object} post 
 * @param {string} vote upVote/downVote
 */
export const votePost = (post, vote) =>
	fetch(`${api}/posts/${post.id}`, {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({option: vote})
	}
);


/**
 * Get all comments of a single post.
 * 
 * @param {object} post 
 */
export const getPostComments = (post) => fetch(`${api}/posts/${post.id}/comments`, { method: 'GET', headers });

/**
 * Get details of a single comment.
 * 
 * @param {object} comment 
 */
export const getComment = (comment) => fetch(`${api}/comments/${comment}`, { method: 'GET', headers });

/**
 * Vote in single comment, vote can be "upVote" or "downVote".
 * 
 * @param {object} comment 
 * @param {string} vote 
 */
export const voteComment = (comment, vote) =>
	fetch(`${api}/comments/${comment.id}`, {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ option: vote })
	}
);

/**
 * Set flag "deleted" to true.
 * 
 * @param {object} comment
 */
export const deleteComment = (comment) =>
	fetch(`${api}/comments/${comment.id}`, {
		method: 'DELETE',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		}
	}
);

/**
 * Register new comment.
 * 
 * @param {object} comment 
 */
export const createComment = (comment) =>
	fetch(`${api}/comments`, {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(comment)
	}
);

/**
 * Update single comment.
 * 
 * @param {object} comment 
 */
export const updateComment = (comment) =>
	fetch(`${api}/comments/${comment.id}`, {
		method: 'PUT',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(comment)
	}
);