import React, {PropTypes} from 'react';
import CommentItem from './CommentItem';

const CommentsList = ({data, openModal}) => {
    return (
        <ul className='app_comments_list'>
            {data.map(item => <CommentItem key={item.id} item={item} openModal={openModal}/>)}
        </ul>    
    )
};

CommentsList.propTypes = {
    data: React.PropTypes.array.isRequired
}

export default CommentsList;