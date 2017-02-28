import React, {PropTypes} from 'react';

const ModalHeader = ({modalDetails, closeModal}) => {
    return (
        <header className="app_modal__content__header u-clearFix">
            <div className="app_modal__content__header__icon">
                <button className={`app_modal__content__header__icon-${modalDetails.type}`}></button>
            </div>
            <h3 className="app_modal__content__header__title">{modalDetails.title}</h3>
            <button className="app_modal__content__header__close" onClick={closeModal}></button>
        </header>  
    )
};

ModalHeader.propTypes = {
    modalDetails: React.PropTypes.object.isRequired,
    closeModal: React.PropTypes.func.isRequired
}

export default ModalHeader;