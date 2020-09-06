import React, {Component} from 'react';
import styled from "styled-components";
import '../index.css'

const TicketWrapper=styled.div`
    // opacity:0;
    // transition: 1s;
    // animation: show 3s 1;
    // animation-fill-mode: forwards;
    // @keyframes show{
    //     0%{
    //         opacity:0;
    //     }
    //     100% {
    //         opacity:1;
    //     }
    // }
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
        alert(`${this.state.title} добавлено!`);
        event.preventDefault();
        this.props.postTicket(this.state)
        this.props.onShowForm()
        this.setState({
            title:'',
            body:'',
        })

    }

    onChangeBody(event){
        this.setState({body: event.target.value});
    }

    onChangeTitle(event) {
        this.setState({title: event.target.value});
    }

    render() {
        return (
            <TicketWrapper>
                <form id="summid" onSubmit={this.onSubmit}>
                    <p><label> Title: <input type="text" name="title" value={this.state.title}
                                             onChange={this.onChangeTitle}/></label></p>
                    <p><label> Text: <textarea name="body" value={this.state.body}
                                               onChange={this.onChangeBody}/></label></p>
                    <p><input type="submit" value="Submit"/></p>
                </form>
            </TicketWrapper>
        )
    }
}

export default NewTicket;