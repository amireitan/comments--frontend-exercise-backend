import React, {PropTypes} from 'react';

const ModalFooter = ({modalDetails, closeModal, onBtnActionClick, type, content, data}) => {
    return (
        <footer className="app_modal__content__footer u-clearFix">
            <div className="app_modal__content__footer__buttons u-clearFix">
                <button className="app_modal__content__footer__first"  onClick={closeModal}>{modalDetails.buttons[0].name}</button>
                <button className="app_modal__content__footer__second" 
                    onClick={() => onBtnActionClick(modalDetails.buttons[1].action, type, content, data)}>
                    {modalDetails.buttons[1].name}
                </button>
            </div>
        </footer>
    )
};

ModalFooter.propTypes = {
    modalDetails: React.PropTypes.object.isRequired,
    closeModal: React.PropTypes.func.isRequired
}

export default ModalFooter;