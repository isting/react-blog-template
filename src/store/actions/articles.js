import axios from 'axios';
import * as types from '../types.js';

/**
 * action type
 */

export function saveArticlesList(data) {
	return {
		type: types.SAVE_ARTICLES_LIST,
		payload: data,
	};
}

/**
 * aysnc function
 */

export function getArticlesList({ keyword, likes, state, pageNum, pageSize }) {
	return dispatch => {
			axios.get("http://localhost:3001/mock/getArticleList.json", {}).then(res => {
				if (res.status === 200 && res.data.code === 0) {
					dispatch(saveArticlesList(res.data));
				}
			})
	};
}


