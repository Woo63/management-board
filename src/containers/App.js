import React, {Component} from 'react';
import './App.css';
import Board from "./Board";
import Header from "../components/Header/Header";

class App extends Component {
    render() {
        const tables = [
            {id: 1, title: 'TO DO'},
            {id: 2, title: 'ACTIVE'},
            {id: 3, title: 'REVIEW'},
            {id: 4, title: 'DONE'}
        ]
        return (
            <div className="App">
                <Header title={'Project Management Board'}/>
                <Board tables={tables}/>
            </div>
        )
    };
}

export default App;
