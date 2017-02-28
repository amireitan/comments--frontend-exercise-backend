import React, {PropTypes} from 'react';

const Comment = ({item, openModal}) => {
    return (
        <li className="app_comments_item u-clearFix">
            <div className="app_comments_item_content">
                <h3 className="app_comments_item_content__mail">{item.email}</h3>
                <p title={item.comment} className="app_comments_item_content__comment">{item.comment}</p>
            </div>
            <div className="app_comments_item_buttons">
                <button className="app_comments_item_buttons_edit" onClick={ () => openModal({data:{text: item.comment, id:item.id}, modalType: 'edit', type:'comments'})}><i></i></button>
                <button className="app_comments_item_buttons_delete" onClick={ () => openModal({data:{id:item.id}, modalType: 'delete', type:'comments'})}><i></i></button>
            </div>    
        </li>    
    )
};

Comment.propTypes = {
    item: React.PropTypes.object.isRequired
}

export default Comment;