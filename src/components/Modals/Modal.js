import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import ModalContent from './ModalContent';
import {openModal, closeModal} from '../../actions/ModalActions';
import {putComment, deleteComment} from '../../actions/CommentsActions';

class Modal extends Component {
	constructor() {
		super();
		this.onCloseModal     = this.closeModal.bind(this);
		this.onBtnActionClick = this.onBtnActionClick.bind(this);
	}

	closeModal() {
		this.props.closeModal();
	}

	onBtnActionClick(action, type, content, data) {
		switch(type) {
			case 'comments':
				(action === 'save') ?
					this.props.putComment(data.id, content) :
					this.props.deleteComment(data.id);
		}
	}

	render() {
		if (!this.props.isModal) return null;

		document.onkeydown = (evt) => {
		    evt = evt || window.event;
		    if (evt.keyCode == 27 && this.props.isModal) {
		        this.closeModal();
		    }
		};

		return (
			<div className="app_modal">
				<ModalContent 
					data={this.props.data} 
					modalDetails={this.props.modalDetails}
					closeModal={this.props.closeModal}
					onBtnActionClick={this.onBtnActionClick}
					type={this.props.type}
					isWaiting={this.props.isWaiting} />
			</div>
		);
	}
}

function mapStateToProps ({modalData}) {
	const {isModal, data, modalType, modalDetails, type, isWaiting} = modalData;
	return {
		isModal, data, modalType, modalDetails, type, isWaiting
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ openModal, closeModal, putComment, deleteComment}, dispatch)
}

Modal.propTypes = {
	openModal: PropTypes.func.isRequired,
	closeModal: PropTypes.func.isRequired,
	modalType: PropTypes.string,
	isModal: PropTypes.bool.isRequired,
	modalDetails: PropTypes.object,
	type: PropTypes.string,
	putComment: PropTypes.func.isRequired,
	deleteComment: PropTypes.func.isRequired
};


export default connect(mapStateToProps, mapDispatchToProps)(Modal);

