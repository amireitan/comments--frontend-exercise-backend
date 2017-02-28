import React, { Component, PropTypes } from 'react';
import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';

class ModalContent extends Component {
    constructor(props) {
        super(props);
        this.createBodyConent = this.createBodyConent.bind(this);
        this.onChangeText     = this.onChangeText.bind(this);

        this.state = {
            text: this.props.modalDetails.body || ''
        }
    }
    onChangeText(e) {
        this.setState({text: e.target.value.trim()});
    }

    createBodyConent(type, body) {
        switch(type) {
            case 'edit':
                return(
                    <textarea placeholder="Text" onChange={this.onChangeText} rows="5" cols="50">{this.state.text}</textarea>
                );
            default:
                return null;
        }
    }

    render(){
        return (
            <section className={`app_modal__content app_modal__content--${this.props.modalDetails.type}`}>
                <ModalHeader modalDetails={this.props.modalDetails} closeModal={this.props.closeModal}/>
                {
                    this.props.modalDetails.isBody &&
                    <section  className="app_modal__content__main">
                        {
                            !this.props.isWaiting && this.createBodyConent(this.props.modalDetails.type, this.props.modalDetails.body)
                        }
                        {
                            this.props.isWaiting && 
                            <div className="app_modal__content__main__message">
                                <span>In Process...</span>
                            </div>
                        }
                    </section>
                }
                <ModalFooter 
                    closeModal={this.props.closeModal} 
                    modalDetails={this.props.modalDetails}
                    onBtnActionClick={this.props.onBtnActionClick}
                    type={this.props.type}
                    data={this.props.data}
                    content={this.state.text}/>
            </section>    
        )
    }
};

ModalContent.propTypes = {
    modalDetails: React.PropTypes.object.isRequired,
    closeModal: React.PropTypes.func.isRequired,
    type: React.PropTypes.string.isRequired,
    content: React.PropTypes.string.isRequired,
    data: React.PropTypes.object.isRequired,
}

export default ModalContent;