import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchCommentsData} from '../../actions/CommentsActions';
import {openModal} from '../../actions/ModalActions';
import Spinner from '../shared/Spinner';

import CommentsList from './CommentsList';

class Comments extends Component {
    
    constructor() {
        super();
        this.openModal = this.openModal.bind(this);
    }

    componentWillMount() {
        this.props.fetchCommentsData(true);
        this.interval = window.setInterval(this.props.fetchCommentsData, 10000);
    }

    componentWillUnMount() {
      if (this.interval) {
        window.clearInterval(this.interval);
      }
    }

    openModal(data) {
        this.props.openModal(data);
    }

    render() {
        return (
            <section className="app__comments">
              <header className="app__comments__header"><h2>Comments</h2></header>
              {
                this.props.isWaiting ? 
                <Spinner></Spinner> :
                <CommentsList data={this.props.data} openModal={this.openModal}/>       
              }
            </section>
        );
    }
}

Comments.propTypes = {
  data: React.PropTypes.array,
  isRender: React.PropTypes.bool,
  title: React.PropTypes.string,
  isWaiting: React.PropTypes.bool,
  isError: React.PropTypes.bool ,
  errorMessage: React.PropTypes.string,
  fetchCommentsData: React.PropTypes.func
}

function mapStateToProps(state) {
    const {isRender, data, title, isWaiting, isError, errorMessage} = state.commentsData;
    return  {
        isRender, data, title, isWaiting, isError, errorMessage
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchCommentsData, openModal}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);