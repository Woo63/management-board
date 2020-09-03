import React, {Component} from 'react';
import WithDataFetching from '../withDataFetching'

class NewTicket extends Component{
    constructor({id}) {
        super();
        console.log('constructor',id)
        this.state={
            title:'',
            body:'',
            lane:1,
            id:id
        }
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeBody = this.onChangeBody.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event){
        alert(`${this.state.title} добавлено!`);
        event.preventDefault();
        console.log(this.state)
    }

    onChangeBody(event){
        this.setState({body: event.target.value});
    }

    onChangeTitle(event) {
        this.setState({title: event.target.value});
    }
    render(){
        console.log('id',this.state.id)
        return(
            <form onSubmit={this.onSubmit}>
                <p><label> Title: <input type="text" name="title" value={this.state.title}
                                         onChange={this.onChangeTitle}/></label></p>
                <p><label> Text: <textarea name="body" value={this.state.body}
                                          onChange={this.onChangeBody}/></label></p>
                <p><input type="submit" value="Submit" /></p>
            </form>
        )
    }
}

export default WithDataFetching(NewTicket);