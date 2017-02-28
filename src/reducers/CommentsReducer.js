import {assign} from 'lodash';
import {
    PRE_FETCH_COMMENTS,
    FETCH_COMMENTS_SUCCESS,
    FETCH_COMMENTS_FAIL,
    DELETE_COMMENT,
	UPDATE_COMMENT_SUCCESS,
	UPDATE_COMMENT_FAIL,
	DELETE_COMMENT_SUCCESS,
	DELETE_COMMENT_FAIL
} from '../actions/CommentsActions.js';

const InitialState = {
	isRender: true,
	data: [],
	title: 'Comments',
	isWaiting: false,
	isError: false,
	errorMessage:''
}

function sortComments(data) {
	return data.sort((a, b) => b.updatedAt - a.updatedAt);
}

function updateComment(data, text, state) {
	return state.map(obj => {
		if (obj.id === data.id) {
			return assign({}, 
				obj, 
				{id: data.id, updatedAt: data.updatedAt, comment: text});
		}
		return obj;
	})
}

function deleteComment(id, state) {
	return state.filter(obj => obj.id !== id);
}

export default function (state = InitialState, action) {
	const {type, payload, text} = action;
	switch (type) {
		case PRE_FETCH_COMMENTS:
			return assign({}, state, {
				isRender: true,
				isWaiting: true,
				isError: false
			});
		case FETCH_COMMENTS_SUCCESS:
			return assign({}, state, {
				data: payload || [],
				isWaiting: false,
				isError: false,
				errorMessage:''
			});
		case FETCH_COMMENTS_FAIL:
			return assign({}, state, {
				data: [],
				errorMessage: payload,
				isWaiting: false,
				isError: true
			});
		case UPDATE_COMMENT_SUCCESS:
			let newData = updateComment(payload, text, state.data);
			return assign({}, state, {
				data: sortComments(updateComment(payload, text, state.data)),
				errorMessage: '',
				isWaiting: false,
				isError: true
			});
		case DELETE_COMMENT_SUCCESS:
			return assign({}, state, {
				data: sortComments(deleteComment(payload, state.data)),
				errorMessage: '',
				isWaiting: false,
				isError: true				
			});
		default:
			return state
	}
}