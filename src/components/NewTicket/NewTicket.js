import React, {Component} from 'react';
import styled from "styled-components";
import CloseButton from "../CloseButton/CloseButton";

const Container=styled.form`
    background: linear-gradient(to top left, powderblue, pink);      
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    padding: 10px 20px 20px;
    width:30%;
    min-width:250px;
    margin: 2% auto;
    
`;

class NewTicket extends Component{
    constructor() {
        super();
        this.state={
            title:'',
            body:'',
            lane:1
        }
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeBody = this.onChangeBody.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event){
        if(this.state.title.trim().length&&this.state.body.trim().length){
            event.preventDefault();
            this.props.postTicket(this.state)
            this.props.onShowForm()
            this.setState({
                title:'',
                body:'',
            })
            alert(`${this.state.title} added!`);
        } else {
            alert(`Error added!`);
        }

    }

    onChangeBody(event){
        this.setState({body: event.target.value});
    }

    onChangeTitle(event) {
        this.setState({title: event.target.value});
    }

    render() {
        return (
            <Container onSubmit={this.onSubmit}>
                <CloseButton onHandler={()=>this.props.onShowForm()}/>
                <div className="form-group">
                    <input className="form-control" type="text" name="title" value={this.state.title}
                           onChange={this.onChangeTitle} placeholder="Title"/>
                </div>

                <div className="form-group">
                    <textarea className="form-control" name="body" value={this.state.body}
                              onChange={this.onChangeBody} placeholder="Comment"/>
                </div>
                <input className="btn btn-outline-secondary" type="submit" value="Submit"/>
            </Container>
        )
    }
}

export default NewTicket;