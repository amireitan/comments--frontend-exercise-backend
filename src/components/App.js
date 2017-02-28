import React, {Component, PropTypes} from 'react';
import CommentsComponent from './Comments/Comments'; 
import Modal from './Modals/Modal';

class App extends Component {
    constructor() {
        super();
    }
    render (){
        return (
            <section className="app">
                <CommentsComponent/>
                <Modal/> 
            </section>
        );
    }
}

export default App;