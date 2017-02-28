import {combineReducers} from 'redux';

import commentsData from './CommentsReducer';
import modalData from './ModalReducer';

const rootReducer = combineReducers({
	commentsData,
	modalData
});

export default rootReducer;