import React from "react";
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

class Board extends React.Component {
    constructor() {
        super();
        this.state = {
            tickets: [],
            length:null
        };
        this.onDragOver = this.onDragOver.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({ tickets: this.props.data, length: this.props.data.length});
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
            if (ticket.id === parseInt(id)) {
                ticket.lane = laneId;
            }
            return ticket;
        });

        this.setState({
            ...this.state,
            tickets
        });
    };

    render() {
        const {tables, loading, error} = this.props;
        console.log(this.state.length)
        return (
            <div>
            <BoardWrapper>
                {
                    tables.map(item => (
                        <Table
                            key={item.id}
                            tableId={item.id}
                            title={item.title}
                            loading={loading}
                            onDragStart={this.onDragStart}
                            onDragOver={this.onDragOver}
                            onDrop={this.onDrop}
                            error={error}
                            tickets={this.state.tickets.filter(ticket => ticket.lane === item.id)}
                        />
                    ))
                }
            </BoardWrapper>
                <NewTicket id={this.state.length}/>
            </div>
        );
    }
}

export default withDataFetching(Board);