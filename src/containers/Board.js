import React from "react";
import styled from 'styled-components';
import Table from "../components/Table/Table";
import withDataFetching from "../withDataFetching";
import NewTicket from "./NewTicket";
import '../index.css'
import {CSSTransition} from "react-transition-group";


const BoardWrapper=styled.div`
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    margin:20px 0px 30px;
    flex-wrap:wrap;
    padding:0 15px;
`;
const ImgWrapper=styled.img`
    display: block;
    margin: auto;
    width: 100%;
    height: auto;
`;
const AddButton = styled.div`
    cursor: pointer;
    padding: 30px;
    margin: auto;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: rgba(217, 158, 187, 0.89);
    overflow: hidden;
    opacity: 0.4;
    box-shadow: 10px 10px 30px #000;
`;

const url = process.env.REACT_APP_DB_URL

class Board extends React.Component {
    constructor() {
        super();
        this.state = {
            tickets: [],
            showForm:false,
            showButton:true
        };
        this.onDragOver = this.onDragOver.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.postTicket = this.postTicket.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onShowForm=this.onShowForm.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({ tickets: this.props.data});
        }
    }

    onShowForm(){
        this.setState({showForm:!this.state.showForm})
    }

    onDragStart = (e, id) => {
        e.dataTransfer.setData('id', id);
    };
    onDragOver = e => {
        e.preventDefault();
    };
    onDrop = async (e, laneId) => {
        const id = e.dataTransfer.getData('id');
        let indexId=this.state.tickets.findIndex(item=> item.id===id);
        const ticket={
            title:this.state.tickets[indexId].title,
            body:this.state.tickets[indexId].body,
            lane:laneId
        }
        let res = await fetch(`${url}/tickets.json`,{method:'POST',body: JSON.stringify(ticket)})
        const dataJSON = await res.json();
        ticket.id=dataJSON.name;
        let arr=this.state.tickets;
        const index=arr.findIndex(item=> item.id===id);
        arr.splice(index,1);
        arr.push(ticket)
        this.setState({tickets:arr})
        fetch(`${url}/tickets/${id}.json`, {
            method: 'delete'
        }).then(res=>res.json());
    };
    async postTicket(ticket){
        try {
            let res = await fetch(`${url}/tickets.json`,{method:'POST',body: JSON.stringify(ticket)});
            const dataJSON = await res.json();
            const payload={
                ...ticket,
                id:dataJSON.name
            }

            let data=this.state.tickets;
            data.push(payload)
            if (dataJSON) {
                this.setState({tickets:data})
            }
        } catch (e) {
            throw new Error(e.message)
        }

    };
    async onRemove(id) {
        await fetch(`${url}/tickets/${id}.json`, {
            method: 'delete'
        })
        let arr=this.state.tickets;
        const index=arr.findIndex(item=> item.id===id);
        arr.splice(index,1)
        this.setState({tickets:arr})

    }


    render() {
        const {tables, loading, error} = this.props;
        return (
            <>
                <AddButton onClick={this.onShowForm}>
                    <ImgWrapper src={"../../assets/plus.png"} alt={"not found"}/>
                </AddButton>
                <CSSTransition
                    in={this.state.showForm}
                    classNames='form'
                    timeout={500}
                    unmountOnExit
                >
                    <NewTicket className="item" postTicket={this.postTicket} onShowForm={this.onShowForm}/>
                </CSSTransition>
                <BoardWrapper>
                    {
                        tables.map(item => (
                            <Table
                                key={item.id}
                                tableId={item.id}
                                title={item.title}
                                loading={loading}
                                error={error}
                                onDragStart={this.onDragStart}
                                onDragOver={this.onDragOver}
                                onDrop={this.onDrop}
                                tickets={this.state.tickets.filter(ticket => ticket.lane === item.id)}
                                onRemove={this.onRemove}
                            />
                        ))
                    }
                </BoardWrapper>
            </>
        );
    }
}

export default withDataFetching(Board);