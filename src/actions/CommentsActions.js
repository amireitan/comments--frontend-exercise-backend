import axios from 'axios';

export const PRE_FETCH_COMMENTS      = 'PRE_FETCH_COMMENTS';
export const PRE_PUTDEL_COMMENTS     = 'PRE_PUTDEL_COMMENTS';
export const FETCH_COMMENTS_SUCCESS  = 'FETCH_COMMENTS_SUCCESS'; 
export const FETCH_COMMENTS_FAIL     = 'FETCH_COMMENTS_FAIL'; 
export const DELETE_COMMENT_SUCCESS  = 'DELETE_COMMENT';
export const DELETE_COMMENT_FAIL     = 'DELETE_COMMENT_FAIL';
export const UPDATE_COMMENT_SUCCESS  = 'UPDATE_COMMENT';
export const UPDATE_COMMENT_FAIL     = 'UPDATE_COMMENT_FAIL';

import {closeModal} from './ModalActions';

//////// Action Creators
export function prefetchComments () {
    return {type: PRE_FETCH_COMMENTS}
}

export function prePutDelComments() {
    return {type: PRE_PUTDEL_COMMENTS}
}

export function fetchCommentsSuccess(data, text) {
    return {type: FETCH_COMMENTS_SUCCESS, payload: data}
}

export function fetchCommentsFail(error) {
    return {type: FETCH_COMMENTS_FAIL, payload: error}
}

export function updateCommentSucces(data, text) {
    return {type: UPDATE_COMMENT_SUCCESS, payload: data, text}
}

export function updateCommentFail() {
    return {type: UPDATE_COMMENT_FAIL}
}

export function deleteCommentSucces(id) {
    return {type: DELETE_COMMENT_SUCCESS, payload: id}
}

export function deleteCommentFail(data, id) {
    return {type: DELETE_COMMENT_SUCCESS, payload: id}
}


///// CRUD - functions

const headers = {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
}

export function fetchCommentsData(isFirst) {
    const url  = 'http://localhost:3000/comments';

    return dispatch => {
        if (isFirst) dispatch(prefetchComments());

        return axios.get(url, headers)
            .then(function(response){
                if (response.status >= 400) {
                    dispatch(fetchCommentsFail('Error - fetching data'));
                }
                console.log('---Fetching data---');
                dispatch(fetchCommentsSuccess(response.data));
            })  
            .catch(function(error){
                dispatch(fetchCommentsFail('Error - fetching data'));
            });
    }
}

export function putComment(id, text) {
    const url  = `http://localhost:3000/comments/${id}`;
    const data = {comment: text};

    return dispatch => {
        return axios.put(url, data, headers)
            .then(function(response){
                if (response.status >= 400) {
                    dispatch(fetchCommentsFail('Error - fetching data'));
                }
                dispatch(updateCommentSucces(response.data, text));
                dispatch(closeModal());
            })  
            .catch(function(error){
                dispatch(updateCommentFail('Error - while trying to update comment'));
            });
    }
}

export function deleteComment(id, text) {
    const url = `http://localhost:3000/comments/${id}`;

    return dispatch => {
        return axios.delete(url, headers)
            .then(function(response){
                if (response.status >= 400) {
                    dispatch(fetchCommentsFail('Error - fetching data'));
                }
                if (response.status === 200) {
                    dispatch(deleteCommentSucces(id));
                    dispatch(closeModal());
                }
            })  
            .catch(function(error){
                dispatch(deleteCommentFail('Error - while trying to delete'));
            });
    }
}
