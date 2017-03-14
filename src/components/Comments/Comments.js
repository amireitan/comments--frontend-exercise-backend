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
        this.fetchComments(30000);
    }

    fetchComments(time) {
      this.props.fetchCommentsData().then(() => {
        if (this.timeOut) clearTimeout(this.timeOut);
        this.timeOut = window.setTimeout(this.fetchComments.bind(this), time)
      });
    }

    componentWillUnMount() {
      if (this.timeOut) {
        window.clearTimeout(this.timeOut);
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