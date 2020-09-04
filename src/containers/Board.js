import React, {Fragment} from "react";
import styled from 'styled-components';
import Table from "../components/Table/Table";
import withDataFetching from "../withDataFetching";
import NewTicket from "./NewTicket";


const BoardWrapper=styled.div`
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    margin:20px 0px 30px;
    flex-wrap:wrap;
    padding:0 15px;
`;

const url = process.env.REACT_APP_DB_URL

class Board extends React.Component {
    constructor() {
        super();
        this.state = {
            tickets: []
        };
        this.onDragOver = this.onDragOver.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.postTicket = this.postTicket.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({ tickets: this.props.data});
        }
    }

    onDragStart = (e, id) => {
        e.dataTransfer.setData('id', id);
    };
    onDragOver = e => {
        e.preventDefault();
    };
    onDrop = (e, laneId) => {
        const id = e.dataTransfer.getData('id');

        const tickets = this.state.tickets.filter(ticket => {
            if (ticket.id === id) {
                ticket.lane = laneId;
            }
            return ticket;
        });

        this.setState({
            ...this.state,
            tickets
        });
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
        const res= await fetch(`${url}/tickets/${id}.json`, {
            method: 'delete'
        })
        await res.json();
        let arr=this.state.tickets;
        const index=arr.findIndex(item=> item.id===id);
        arr.splice(index,1)
        this.setState({tickets:arr})
    }


    render() {
        const {tables, loading, error} = this.props;
        return (
            <Fragment>
                {/*eslint-disable-next-line*/}
                <NewTicket postTicket={this.postTicket}/>
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
            </Fragment>
        );
    }
}

export default withDataFetching(Board);