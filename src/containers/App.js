import React, {Component} from 'react';
import './App.css';
import Board from "./Board";
import Header from "../components/Header/Header";

class App extends Component {
    constructor() {
        super();
        this.state = {
            showForm: JSON.parse(sessionStorage.getItem('showForm'))||false
        };
        this.onShowForm=this.onShowForm.bind(this);
    }
    onShowForm(){
        sessionStorage.setItem('showForm', !this.state.showForm)
        this.setState({showForm:!this.state.showForm})
    }

    render() {
        const tables = [
            {id: 1, title: 'TO DO'},
            {id: 2, title: 'ACTIVE'},
            {id: 3, title: 'REVIEW'},
            {id: 4, title: 'DONE'}
        ]
        return (
            <div className="App">
                <Header title={'Project Management Board'} onShowForm={this.onShowForm}/>
                <Board tables={tables} onShowForm={this.onShowForm} showForm={this.state.showForm}/>
            </div>
        )
    };
}

export default App;
